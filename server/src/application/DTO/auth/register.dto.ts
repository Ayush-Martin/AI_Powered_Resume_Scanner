import z from "zod";
import userValidationRules from "../../../shared/validation/validationRules/userValidationRules";

export class ForwardRegisterDTO {
  public username: string;
  public email: string;
  public password: string;

  constructor(data: unknown) {
    const schema = z.object({
      username: userValidationRules.Username,
      email: userValidationRules.Email,
      password: userValidationRules.Password,
    });

    const parsed = schema.parse(data);
    this.username = parsed.username;
    this.email = parsed.email;
    this.password = parsed.password;
  }
}


