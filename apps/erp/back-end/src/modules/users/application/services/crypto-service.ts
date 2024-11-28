import type { ICryptoService } from "./abstractions/crypto-service";

import { genSalt, hash, compare } from 'bcrypt';


class CryptoService implements ICryptoService {

  public async encrypt(value: string): Promise<[string, string]> {
    const salt: string = await genSalt();
    const passwordHash: string = await hash(value, salt);

    return [passwordHash, salt];
  }

  public async compare(value: string, hashedValue: string, salt?: string): Promise<boolean> {
    return compare(value, hashedValue);
  }
}

export { CryptoService };
