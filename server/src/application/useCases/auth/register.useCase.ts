import { injectable, inject } from "inversify";
import UserEntity from "../../../domain/entities/user.entity";
import Email from "../../../domain/valueObjects/user/email.vo";
import Password from "../../../domain/valueObjects/user/password.vo";
import Username from "../../../domain/valueObjects/user/username.vo";
import { TYPES } from "../../../infrastructure/container/types";
import { IUserRepository } from "../../../infrastructure/interface/repositories/IUser.repository";
import { IHashingService } from "../../../infrastructure/interface/services/IHashing.service";
import { AuthResponseMessages } from "../../../shared/constants/responseMessages";
import ConflictError from "../../../shared/errors/conflict.error";
import { ForwardRegisterDTO } from "../../DTO/auth/register.dto";
import { IRegisterUseCase } from "../../interface/useCases/auth/IRegister.useCase";


@injectable()
class RegisterUseCase implements IRegisterUseCase {
  constructor(
    @inject(TYPES.UserRepository)
    private readonly _userRepository: IUserRepository,
    @inject(TYPES.HashingService)
    private readonly _hashingService: IHashingService,
  ) {}

  public async execute(dto: ForwardRegisterDTO): Promise<void> {
    const userWithSameEmail = await this._userRepository.findByEmail(dto.email);

    if (userWithSameEmail) {
      throw new ConflictError(AuthResponseMessages.USER_EXISTS);
    }

    const hashedPassword = await this._hashingService.hash(dto.password);

    const userEntity = new UserEntity(
      null,
      new Username(dto.username),
      new Email(dto.email),
      new Password(hashedPassword),
    );

    await this._userRepository.create(userEntity);
  }
}

export default RegisterUseCase;
