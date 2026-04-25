import { injectable, inject } from "inversify";
import RefreshTokenEntity from "../../../domain/entities/refreshToken.entity";
import { TYPES } from "../../../infrastructure/container/types";

import { IJWTService } from "../../../infrastructure/interface/services/IJWT.service";
import { AuthResponseMessages } from "../../../shared/constants/responseMessages";
import NotFoundError from "../../../shared/errors/not-found.error";
import { IRefreshUseCase } from "../../interface/useCases/auth/IRefresh.useCase";
import { IUserRepository } from "../../../infrastructure/interface/repositories/IUser.repository";
import { IRefreshTokenRepository } from "../../../infrastructure/interface/repositories/IRefreshToken.repository";

injectable();
class RefreshUseCase implements IRefreshUseCase {
  constructor(
    @inject(TYPES.UserRepository)
    private readonly _userRepository: IUserRepository,
    @inject(TYPES.JWTService) private readonly _jwtService: IJWTService,
    @inject(TYPES.RefreshTokenRepository)
    private readonly _refreshTokenRepository: IRefreshTokenRepository,
  ) {}

  /**
   *
   * @param userId
   * @returns
   * Function to handle token refresh
   * - Checks if the user exists
   * - Generates access and refresh tokens
   */
  public async execute(
    userId: number,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const user = await this._userRepository.findById(userId);

    if (!user) {
      throw new NotFoundError(AuthResponseMessages.USER_NOT_FOUND);
    }

    const accessToken = this._jwtService.generateAccessToken(user);
    const refreshToken = this._jwtService.generateRefreshToken(user);

    await this._refreshTokenRepository.createRefreshToken(
      new RefreshTokenEntity(refreshToken),
    );

    return { accessToken, refreshToken };
  }
}

export default RefreshUseCase;
