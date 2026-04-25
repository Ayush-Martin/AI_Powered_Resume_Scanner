import { injectable } from "inversify";
import UserEntity from "../../domain/entities/user.entity";
import { sign, verify } from "jsonwebtoken";
import { envConfig } from "../../shared/config/env";
import { IJWTService } from "../interface/services/IJWT.service";
import UnauthorizedError from "../../shared/errors/unauthorized.error";
import { AuthResponseMessages } from "../../shared/constants/responseMessages";

@injectable()
class JWTService implements IJWTService {
  /**
   * method to generate access token
   * @param userEntity
   * @returns
   */
  generateAccessToken(userEntity: UserEntity): string {
    return sign(
      {
        sub: userEntity.id,
        id: userEntity.id,
        email: userEntity.email.value,
      },
      envConfig.ACCESS_TOKEN_SECRET,
      { expiresIn: `${envConfig.ACCESS_TOKEN_EXPIRY_MIN}m` as any },
    );
  }

  /**
   * method to generate refresh token
   * @param userEntity
   * @returns
   */
  generateRefreshToken(userEntity: UserEntity): string {
    return sign(
      {
        sub: userEntity.id,
        id: userEntity.id,
        email: userEntity.email.value,
      },
      envConfig.REFRESH_TOKEN_SECRET,
      { expiresIn: `${envConfig.REFRESH_TOKEN_EXPIRY_DAY}d` as any },
    );
  }

  /**
   * method to extract token from auth header
   * @param authHeader
   * @returns
   */
  extractTokenFromAuthHeader(authHeader: string | undefined): string | null {
    if (!authHeader) return null;
    const parts = authHeader.split(" ");
    if (parts.length !== 2) return null;
    if (parts[0] !== "Bearer") return null;
    return parts[1];
  }

  /**
   * method to verify access token
   * @param token
   * @returns
   */
  public async verifyAccessToken(token: string): Promise<any> {
    return new Promise((resolve, reject) => {
      verify(token, envConfig.ACCESS_TOKEN_SECRET, (err, payload) => {
        if (err) {
          return reject(
            new UnauthorizedError(AuthResponseMessages.INVALID_ACCESS_TOKEN),
          );
        }

        resolve(payload);
      });
    });
  }
}

export default JWTService;