import userValidationRules from "../../../shared/validation/validationRules/userValidationRules";

class Password {
  public value: string;
  constructor(password: string) {
    this.value = userValidationRules.Password.parse(password);
  }
}

export default Password;
