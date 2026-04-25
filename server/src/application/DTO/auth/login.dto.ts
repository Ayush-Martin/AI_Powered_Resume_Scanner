import z from "zod";
import userValidationRules from "../../../shared/validation/validationRules/userValidationRules";


export class ForwardLoginDTO {
  public email: string;
  public password: string;
  constructor(data: any) {
    const schema = z.object({
      email: userValidationRules.Email,
      password: userValidationRules.Password,
    });
    const parsed = schema.parse(data);
    this.email = parsed.email;
    this.password = parsed.password;
  }
}

export class ReverseLoginDTO {
  public accessToken: string;

  constructor(accessToken: string) {
    this.accessToken = accessToken;
  }
}