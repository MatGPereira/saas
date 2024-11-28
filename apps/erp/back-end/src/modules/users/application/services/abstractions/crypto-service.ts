interface ICryptoService {
  encrypt(value: string): Promise<[string, string]>;
  compare(value: string, hashedValue: string, salt?: string): Promise<boolean>;
}

export type { ICryptoService };
