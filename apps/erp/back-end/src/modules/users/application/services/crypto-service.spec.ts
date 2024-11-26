import { beforeEach, describe, it, expect } from 'vitest';

import { faker } from '@faker-js/faker';
import { genSalt, hash } from 'bcrypt';

import type { ICryptoService } from './abstractions/crypto-service';

import { CryptoService } from './crypto-service';

describe(`#${CryptoService.name}`, _ => {
  let cryptoService: ICryptoService | undefined = undefined;
  let valueToEncrypt: string | undefined = undefined;

  // Arrange
  beforeEach(_ => {
    cryptoService = new CryptoService();
    valueToEncrypt = faker.string.hexadecimal({ length: { min: 9, max: 20 } });
  });

  it('should be able to generate a salt', async () => {
    // Act
    const [_, salt] = await cryptoService!.encrypt(valueToEncrypt!);

    // Assert
    expect(salt).toBeTruthy();
    expect(salt).toHaveLength(29);
  });

  it('should be able to hash any value', async () => {
    // Act
    const [hashValue] = await cryptoService!.encrypt(valueToEncrypt!);

    // Assert
    expect(hashValue).toBeTruthy();
    expect(hashValue).toHaveLength(60);
  });

  it(
    'should be able to compare hashed password with plain text password',
    async () => {
      // Arrange
      const [hashedValue] = await cryptoService!.encrypt(valueToEncrypt!);

      // Act
      const compareValuesResult: boolean = await cryptoService!.compare(
        valueToEncrypt!,
        hashedValue
      );

      // Assert
      expect(compareValuesResult).toBe(true);
    }
  );

  it(
    'should not be able to return true when password has another salt',
    async () => {
      // Arrange
      const salt: string = await genSalt();
      const invalidPassword: string = await hash(valueToEncrypt!, salt);
      const [hashedValue] = await cryptoService!.encrypt(valueToEncrypt!);

      // Act
      const compareInvalidPasswords = await cryptoService!.compare(
        hashedValue!,
        invalidPassword
      );

      // Assert
      expect(compareInvalidPasswords).toBe(false);
    }
  );
});
