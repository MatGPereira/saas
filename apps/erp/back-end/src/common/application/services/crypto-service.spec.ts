import { beforeEach, describe, it, expect } from 'vitest';

import { faker } from '@faker-js/faker';
import { genSalt, hash } from 'bcrypt';

import type { ICryptoService } from './abstractions/crypto-service';

import { CryptoService } from './crypto-service';
import { JwtPayload } from 'jsonwebtoken';

describe(`#${CryptoService.name}`, _ => {
  let sut: ICryptoService | undefined = undefined;
  let valueToEncrypt: string | undefined = undefined;

  // Arrange
  beforeEach(_ => {
    sut = new CryptoService();
    valueToEncrypt = faker.string.hexadecimal({ length: { min: 9, max: 20 } });
  });

  it('should be able to generate a salt', async () => {
    // Act
    const [_, salt] = await sut!.encrypt(valueToEncrypt!);

    // Assert
    expect(salt).toBeTruthy();
    expect(salt).toHaveLength(29);
  });

  it('should be able to hash any value', async () => {
    // Act
    const [hashValue] = await sut!.encrypt(valueToEncrypt!);

    // Assert
    expect(hashValue).toBeTruthy();
    expect(hashValue).toHaveLength(60);
  });

  it(
    'should be able to compare hashed password with plain text password',
    async () => {
      // Arrange
      const [hashedValue] = await sut!.encrypt(valueToEncrypt!);

      // Act
      const compareValuesResult: boolean = await sut!.compare(
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
      const [hashedValue] = await sut!.encrypt(valueToEncrypt!);

      // Act
      const compareInvalidPasswords = await sut!.compare(
        hashedValue!,
        invalidPassword
      );

      // Assert
      expect(compareInvalidPasswords).toBe(false);
    }
  );

  it.only('should be able to generate an access token', async () => {
    // Arrange
    const payload: Record<string, unknown> = {}

    // Act
    const accessToken: string = await sut!.generateToken(payload);

    // Assert
    expect(accessToken).toHaveLength(427);
  });

  it('should be able to verify valid token', async () => {
    // Arrange
    const payload: Record<string, unknown> = {}
    const accessToken: string = await sut!.generateToken(payload);

    // Act
    const verify: string | JwtPayload = await sut!.verifyToken(accessToken);

    // Assert
    expect(verify).toBeDefined();
  });
});
