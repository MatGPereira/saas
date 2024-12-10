import type { JwtPayload } from 'jsonwebtoken';
import { sign, verify } from 'jsonwebtoken';

import { genSalt, hash, compare } from 'bcrypt';

import type { ICryptoService } from "./abstractions/crypto-service";

import { env } from '@/common/env';

class CryptoService implements ICryptoService {

  public async encrypt(value: string): Promise<[string, string]> {
    const salt: string = await genSalt(8);
    const passwordHash: string = await hash(value, salt);

    return [passwordHash, salt];
  }

  public async compare(value: string, hashedValue: string): Promise<boolean> {
    return compare(value, hashedValue);
  }

  public async generateToken(payload: Record<string, unknown>): Promise<string> {
    const privateTokenKey: string = env.PRIVATE_RSA_KEY;
    return sign(
      payload,
      privateTokenKey,
      {
        algorithm: 'RS512',
        expiresIn: '15min',
      }
    );
  }

  public async verifyToken(token: string): Promise<string | JwtPayload> {
    const publicTokenKey: string = env.PUBLIC_RSA_KEY;
    return verify(
      token,
      publicTokenKey
    );
  }
}

export { CryptoService };
