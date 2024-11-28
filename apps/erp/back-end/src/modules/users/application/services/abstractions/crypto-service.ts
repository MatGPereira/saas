import { JwtPayload } from "jsonwebtoken";

interface ICryptoService {
  encrypt(value: string): Promise<[string, string]>;
  compare(value: string, hashedValue: string, salt?: string): Promise<boolean>;
  generateToken(payload: Record<string, unknown>): Promise<string>;
  verifyToken(token: string): Promise<string | JwtPayload>;
}

export type { ICryptoService };
