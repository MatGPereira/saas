import { describe, it, expect, beforeEach } from 'vitest';

import { PasswordValidator } from './password-validator';
import { DomainError } from '@/common/domain/errors/domain-error';

describe(`$${PasswordValidator.name}`, () => {
  let sut: PasswordValidator | undefined = undefined;

  beforeEach(_ => {
    sut = new PasswordValidator();
  });

  it('should not add errors for a valid bcrypt hash', () => {
    // Arrange
    const validHash = '$2b$08$.338oUjStQvZxIHyDHLXs..9v29HcbOlmhk/GNxTGaJPiT2DqeXPm';

    // Act
    sut!.validate({ password: validHash });

    // Assert
    expect(sut!.isValid()).toBe(true);
  });

  it('should add an error if the hash is empty', () => {
    // Arrange
    const emptyHash = '';

    // Act
    sut!.validate({ password: emptyHash });

    // Assert
    expect(sut!.isInvalid()).toBe(true);
    expect(sut!.domainErrors).toContainEqual(
      new DomainError('Password is required!')
    );
  });

  it('should add an error if the hash has an invalid format', () => {
    // Arrange
    const invalidHash = 'InvalidHash123';

    // Act
    sut!.validate({ password: invalidHash });

    // Assert
    expect(sut!.isInvalid()).toBe(true);
    expect(sut!.domainErrors).toContainEqual(
      new DomainError('Password hash has an invalid format!')
    );
  });

  it('should validate multiple invalid cases for the hash', () => {
    // Arrange
    const invalidHash = '';

    // Act
    sut!.validate({ password: invalidHash });

    // Assert
    expect(sut!.isInvalid()).toBe(true);
    expect(sut!.domainErrors).toEqual([
      new DomainError('Password is required!'),
      new DomainError('Password hash has an invalid format!'),
    ]);
  });
});
