import { describe, it, expect, beforeEach } from 'vitest';

import { PasswordValidator } from './password-validator';
import { DomainError } from '@/common/domain/errors/domain-error';

describe(`$${PasswordValidator.name}`, () => {
  let sut: PasswordValidator | undefined = undefined;

  beforeEach(_ => {
    sut = new PasswordValidator();
  });

  it('should not add errors for a valid password', () => {
    // Arrange
    const validPassword = 'Valid@123';

    // Act
    sut!.validate({ password: validPassword });

    // Assert
    expect(sut!.isValid()).toBe(true);
  });

  it('should add an error if password is empty', () => {
    // Arrange
    const emptyPassword = '';

    // Act
    sut!.validate({ password: emptyPassword });

    // Assert
    expect(sut!.isInvalid()).toBe(true);
    expect(sut!.domainErrors).toContainEqual(
      new DomainError('Password is required!')
    );
  });

  it('should add an error if password is too short', () => {
    // Arrange
    const shortPassword = 'S@1';

    // Act
    sut!.validate({ password: shortPassword });

    // Assert
    expect(sut!.isInvalid()).toBe(true);
    expect(sut!.domainErrors).toContainEqual(
      new DomainError('Password is too short!')
    );
  });

  it('should add an error if password is too long', () => {
    // Arrange
    const longPassword = 'A@1'.repeat(10);

    // Act
    sut!.validate({ password: longPassword });

    // Assert
    expect(sut!.isInvalid()).toBe(true);
    expect(sut!.domainErrors).toContainEqual(
      new DomainError('Password is too long!')
    );
  });

  it('should add an error if password has an invalid format', () => {
    // Arrange
    const invalidPassword = 'password123';

    // Act
    sut!.validate({ password: invalidPassword });

    // Assert
    expect(sut!.isInvalid()).toBe(true);
    expect(sut!.domainErrors).toContainEqual(
      new DomainError('Password has invalid format')
    );
  });

  it('should add multiple errors if password violates multiple rules', () => {
    // Arrange
    const invalidPassword = '';

    // Act
    sut!.validate({ password: invalidPassword });

    // Assert
    expect(sut!.isInvalid()).toBe(true);
    expect(sut!.domainErrors).toEqual([
      new DomainError('Password is required!'),
      new DomainError('Password is too short!'),
      new DomainError('Password has invalid format'),
    ]);
  });

  it('should validate a valid password correctly', () => {
    // Arrange
    const validPassword = 'Secure@123';

    // Act
    sut!.validate({ password: validPassword });

    // Assert
    expect(sut!.isValid()).toBe(true);
  });

  it('should validate an invalid password and accumulate errors', () => {
    // Arrange
    const invalidPassword = 'abc';

    // Act
    sut!.validate({ password: invalidPassword });

    // Assert
    expect(sut!.isInvalid()).toBe(true);
    expect(sut!.domainErrors).toEqual([
      new DomainError('Password is too short!'),
      new DomainError('Password has invalid format'),
    ]);
  });
});
