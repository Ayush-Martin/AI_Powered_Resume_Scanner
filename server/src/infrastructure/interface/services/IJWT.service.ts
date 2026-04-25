import UserEntity from "../../../domain/entities/user.entity";


export interface IJWTService {
  generateAccessToken(userEntity: UserEntity): string;
  generateRefreshToken(userEntity: UserEntity): string;
  extractTokenFromAuthHeader(authHeader: string | undefined): string | null;
  verifyAccessToken(token: string): Promise<any>;
}
