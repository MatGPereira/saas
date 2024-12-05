import { readFile } from 'node:fs/promises';

import type { JwtPayload } from 'jsonwebtoken';

import { genSalt, hash, compare } from 'bcrypt';
import { sign, verify } from 'jsonwebtoken';

import type { ICryptoService } from "./abstractions/crypto-service";

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
    const privateTokenKey: Buffer = await readFile('./private_key.pem');
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
    const publicTokenKey: Buffer = await readFile('./public_key.pem');
    return verify(
      token,
      publicTokenKey
    );
  }
}

export { CryptoService };
