import userValidationRules from "../../../shared/validation/validationRules/userValidationRules";

class Username {
  public value: string;

  constructor(username: string) {
    console.log(username);
    this.value = userValidationRules.Username.parse(username);
  }
}

export default Username;
