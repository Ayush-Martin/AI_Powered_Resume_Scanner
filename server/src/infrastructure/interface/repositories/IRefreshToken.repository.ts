import RefreshTokenEntity from "../../../domain/entities/refreshToken.entity";

export interface IRefreshTokenRepository {
  createRefreshToken(refreshTokenEntity: RefreshTokenEntity): Promise<void>;
  getRefreshToken(refreshTokenEntity: RefreshTokenEntity): Promise<RefreshTokenEntity | null>;
  deleteRefreshToken(refreshTokenEntity: RefreshTokenEntity): Promise<void>;
}