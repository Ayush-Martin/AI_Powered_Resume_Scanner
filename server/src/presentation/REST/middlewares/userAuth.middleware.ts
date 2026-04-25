import { Request, Response, NextFunction } from "express";
import { injectable, inject } from "inversify";
import jwt from "jsonwebtoken";
import RefreshTokenEntity from "../../../domain/entities/refreshToken.entity";
import { TYPES } from "../../../infrastructure/container/types";
import { IRefreshTokenRepository } from "../../../infrastructure/interface/repositories/IRefreshToken.repository";
import { IJWTService } from "../../../infrastructure/interface/services/IJWT.service";
import { envConfig } from "../../../shared/config/env";
import { AuthResponseMessages } from "../../../shared/constants/responseMessages";
import UnauthorizedError from "../../../shared/errors/unauthorized.error";
import { binder } from "../../../shared/utils/binder";


injectable();
class UserAuthMiddleware {
  constructor(
    @inject(TYPES.JWTService) private readonly _jwtService: IJWTService,
    @inject(TYPES.RefreshTokenRepository)
    private readonly _refreshTokenRepository: IRefreshTokenRepository,
  ) {
    binder(this);
  }

  /**
   * method to validate access token
   * @param req
   * @param res
   * @param next
   */
  public async accessTokenValidator(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const token = this._jwtService.extractTokenFromAuthHeader(
        req.get("authorization"),
      );

      if (!token) {
        throw new UnauthorizedError(AuthResponseMessages.INVALID_ACCESS_TOKEN);
      }

      const payload = await this._jwtService.verifyAccessToken(token); //getting payload from the access token

      const jwtPayload = payload as { id: string };

      req.userId = Number(jwtPayload.id);

      next();
    } catch (err) {
      next(err);
    }
  }

  /**
   * method to validate refresh token
   * @param req
   * @param res
   * @param next
   */
  public async refreshTokenValidator(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const refreshToken = req.cookies.refreshToken as string | undefined;
      if (!refreshToken) {
        throw new UnauthorizedError(AuthResponseMessages.INVALID_ACCESS_TOKEN);
      }

      const storedToken = await this._refreshTokenRepository.getRefreshToken(
        new RefreshTokenEntity(refreshToken),
      );

      if (!storedToken) {
        throw new UnauthorizedError(AuthResponseMessages.INVALID_ACCESS_TOKEN);
      }

      jwt.verify(
        refreshToken,
        envConfig.REFRESH_TOKEN_SECRET,
        async (err, payload) => {
          try {
            if (err) {
              req.cookies.remove();
              throw new UnauthorizedError(
                AuthResponseMessages.INVALID_ACCESS_TOKEN,
              );
            } else {
              req.userId = Number(payload?.sub);
              next();
            }
          } catch (err) {
            next(err);
          }
        },
      );
    } catch (err) {
      next(err);
    }
  }
}

export default UserAuthMiddleware;