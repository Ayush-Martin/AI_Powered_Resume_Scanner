import { inject, injectable } from "inversify";
import { ILoginUseCase } from "../../interface/useCases/auth/ILogin.useCase";
import { TYPES } from "../../../infrastructure/container/types";

import { IHashingService } from "../../../infrastructure/interface/services/IHashing.service";
import { ForwardLoginDTO } from "../../DTO/auth/login.dto";
import UnauthorizedError from "../../../shared/errors/unauthorized.error";
import { AuthResponseMessages } from "../../../shared/constants/responseMessages";
import { IJWTService } from "../../../infrastructure/interface/services/IJWT.service";

import RefreshTokenEntity from "../../../domain/entities/refreshToken.entity";
import { IUserRepository } from "../../../infrastructure/interface/repositories/IUser.repository";
import { IRefreshTokenRepository } from "../../../infrastructure/interface/repositories/IRefreshToken.repository";

@injectable()
class LoginUseCase implements ILoginUseCase {
  constructor(
    @inject(TYPES.UserRepository)
    private readonly _userRepository: IUserRepository,
    @inject(TYPES.HashingService)
    private readonly _hashingService: IHashingService,
    @inject(TYPES.JWTService)
    private readonly _jwtService: IJWTService,
    @inject(TYPES.RefreshTokenRepository)
    private readonly _refreshTokenRepository: IRefreshTokenRepository,
  ) {}

  /**
   *
   * @param dto
   * @returns
   * Function to handle user login
   * - Checks if the user exists
   * - Checks if the password is correct
   * - Generates access and refresh tokens
   */
  public async execute(
    dto: ForwardLoginDTO,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const user = await this._userRepository.findByEmail(dto.email);

    if (!user)
      throw new UnauthorizedError(AuthResponseMessages.EMAIL_DONT_EXIST);

    const isValidPassword = await this._hashingService.compare(
      dto.password,
      user.password.value,
    );

    if (!isValidPassword)
      throw new UnauthorizedError(AuthResponseMessages.CREDENTIALS_DONT_MATCH);

    const accessToken = this._jwtService.generateAccessToken(user);
    const refreshToken = this._jwtService.generateRefreshToken(user);

    await this._refreshTokenRepository.createRefreshToken(
      new RefreshTokenEntity(refreshToken),
    );

    return { accessToken, refreshToken };
  }
}

export default LoginUseCase;
