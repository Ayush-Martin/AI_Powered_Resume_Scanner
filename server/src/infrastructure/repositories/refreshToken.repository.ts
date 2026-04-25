import { injectable } from "inversify";
import RefreshToken from "../database/mysql/models/refreshToken.model";
import RefreshTokenEntity from "../../domain/entities/refreshToken.entity";
import { IRefreshTokenRepository } from "../interface/repositories/IRefreshToken.repository";

@injectable()
class RefreshTokenRepository implements IRefreshTokenRepository {
  /**
   * MAPPER: SQL Model -> Domain Entity
   */
  private _toEntity(row: RefreshToken): RefreshTokenEntity {
    // Assuming your Entity constructor takes the token string
    return new RefreshTokenEntity(row.refreshToken);
  }

  /**
   * MAPPER: Domain Entity -> SQL Object
   */
  private _toPersistence(entity: RefreshTokenEntity) {
    return {
      refreshToken: entity.refreshToken,
    };
  }

  /**
   * Create a new refresh token record
   */
  public async createRefreshToken(
    refreshTokenEntity: RefreshTokenEntity,
  ): Promise<void> {
    const data = this._toPersistence(refreshTokenEntity);
    await RefreshToken.create(data);
  }

  /**
   * Delete a specific refresh token
   */
  public async deleteRefreshToken(
    refreshTokenEntity: RefreshTokenEntity,
  ): Promise<void> {
    await RefreshToken.destroy({
      where: {
        refreshToken: refreshTokenEntity.refreshToken,
      },
    });
  }

  /**
   * Retrieve a refresh token from the database
   */
  public async getRefreshToken(
    refreshTokenEntity: RefreshTokenEntity,
  ): Promise<RefreshTokenEntity | null> {
    const tokenRow = await RefreshToken.findOne({
      where: {
        refreshToken: refreshTokenEntity.refreshToken,
      },
    });

    return tokenRow ? this._toEntity(tokenRow) : null;
  }
}

export default RefreshTokenRepository;
