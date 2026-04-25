import { ForwardRegisterDTO } from "../../../DTO/auth/register.dto";


export interface IRegisterUseCase {
  execute(dto: ForwardRegisterDTO): Promise<void>;
}
