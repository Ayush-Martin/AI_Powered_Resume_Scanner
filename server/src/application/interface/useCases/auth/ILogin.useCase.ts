import { ForwardLoginDTO } from "../../../DTO/auth/login.dto";

export interface ILoginUseCase {
  execute(
    dto: ForwardLoginDTO,
  ): Promise<{ accessToken: string; refreshToken: string }>;
}