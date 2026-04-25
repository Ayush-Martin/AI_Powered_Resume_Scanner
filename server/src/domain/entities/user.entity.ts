import Email from "../valueObjects/user/email.vo";
import Password from "../valueObjects/user/password.vo";
import Username from "../valueObjects/user/username.vo";

class UserEntity {
  constructor(
    public readonly id: number | null,
    public username: Username,
    public email: Email,
    public password: Password,
  ) {}
}

export default UserEntity;
