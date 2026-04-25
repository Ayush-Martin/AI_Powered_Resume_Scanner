import bcrypt from "bcryptjs";
import { IHashingService } from "../interface/services/IHashing.service";
import { envConfig } from "../../shared/config/env";
import { injectable } from "inversify";

@injectable()
class BcryptService implements IHashingService {
  public async hash(password: string): Promise<string> {
    return await bcrypt.hash(password, envConfig.PASSWORD_SALT_ROUNDS);
  }
  public async compare(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }
}

export default BcryptService;