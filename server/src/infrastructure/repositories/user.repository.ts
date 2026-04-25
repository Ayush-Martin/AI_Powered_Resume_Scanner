import { injectable } from "inversify";
import { IUserRepository } from "../interface/repositories/IUser.repository";
import {User} from "../database/mysql/models";
import UserEntity from "../../domain/entities/user.entity";
import Email from "../../domain/valueObjects/user/email.vo";
import Password from "../../domain/valueObjects/user/password.vo";
import Username from "../../domain/valueObjects/user/username.vo";


@injectable()
class UserRepository implements IUserRepository {
  /**
   * MAPPER: SQL Model -> Domain Entity
   */
  private _toUserEntity(userRow: User): UserEntity {
    return new UserEntity(
      userRow.id,
      new Username(userRow.username),
      new Email(userRow.email),
      new Password(userRow.password),
    );
  }

  /**
   * MAPPER: Domain Entity -> SQL Object
   */
  private _toPersistence(userEntity: UserEntity) {
    return {
      username: userEntity.username.value,
      email: userEntity.email.value,
      password: userEntity.password.value,
    };
  }

  public async create(userEntity: UserEntity): Promise<UserEntity> {
    const data = this._toPersistence(userEntity);

    const savedUser = await User.create(data);
    return this._toUserEntity(savedUser);
  }

  public async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await User.findOne({
      where: { email: email },
    });
    return user ? this._toUserEntity(user) : null;
  }

  public async findById(id: number): Promise<UserEntity | null> {
    const user = await User.findByPk(id);

    return user ? this._toUserEntity(user) : null;
  }
}

export default UserRepository;
