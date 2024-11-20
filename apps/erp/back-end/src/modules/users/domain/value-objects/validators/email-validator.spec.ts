import { describe, it, expect, beforeEach } from 'vitest';

import { EmailValidator } from './email-validator';
import { DomainError } from '@/common/domain/errors/domain-error';

describe(`$${EmailValidator.name}`, () => {
  let validator: EmailValidator | undefined = undefined;

  beforeEach(() => {
    validator = new EmailValidator();
  });

  it('should not add errors for a valid email', () => {
    // Arrange
    const validEmail = 'user@example.com';

    // Act
    validator!.validate({ email: validEmail });

    // Assert
    expect(validator!.isValid()).toBe(true);
  });

  it('should add an error if email is empty', () => {
    // Arrange
    const emptyEmail = '';

    // Act
    validator!.validate({ email: emptyEmail });

    // Assert
    expect(validator!.isInvalid()).toBe(true);
    expect(validator!.domainErrors).toContainEqual(
      new DomainError('Email is required!')
    );
  });

  it('should add an error for an invalid email format', () => {
    // Arrange
    const invalidEmail = 'invalid-email';

    // Act
    validator!.validate({ email: invalidEmail });

    // Assert
    expect(validator!.isInvalid()).toBe(true);
    expect(validator!.domainErrors).toContainEqual(
      new DomainError('Invalid email format!')
    );
  });

  it('should add an error if email account is too long', () => {
    // Arrange
    const longAccount = 'a'.repeat(65);
    const email = `${longAccount}@example.com`;

    // Act
    validator!.validate({ email });

    // Assert
    expect(validator!.isInvalid()).toBe(true);
    expect(validator!.domainErrors).toContainEqual(
      new DomainError('Email account is too long!')
    );
  });

  it('should add an error if email address is too long', () => {
    // Arrange
    const longAddress = 'a'.repeat(256);
    const email = `user@${longAddress}`;

    // Act
    validator!.validate({ email });

    // Assert
    expect(validator!.isInvalid()).toBe(true);
    expect(validator!.domainErrors).toContainEqual(
      new DomainError('Email address is too long!')
    );
  });

  it('should add an error if some domain part is too long', () => {
    // Arrange
    const longDomainPart = 'a'.repeat(64);
    const email = `user@${longDomainPart}.com`;

    // Act
    validator!.validate({ email });

    // Assert
    expect(validator!.isInvalid()).toBe(true);
    expect(validator!.domainErrors).toContainEqual(
      new DomainError('Some email domain is too long!')
    );
  });

  it('should add multiple errors for an email violating multiple rules', () => {
    // Arrange
    const invalidEmail = 'a'.repeat(70) + '@' + 'b'.repeat(300);

    // Act
    validator!.validate({ email: invalidEmail });

    // Assert
    expect(validator!.isInvalid()).toBe(true);
    expect(validator!.domainErrors).toEqual([
      new DomainError('Invalid email format!'),
      new DomainError('Email account is too long!'),
      new DomainError('Email address is too long!'),
      new DomainError('Some email domain is too long!'),
    ]);
  });

  it('should add an error if email has no account or domain', () => {
    // Arrange
    const emailWithNoAccountOrDomain = 'invalid@';

    // Act
    validator!.validate({ email: emailWithNoAccountOrDomain });

    // Assert
    expect(validator!.isInvalid()).toBe(true);
    expect(validator!.domainErrors).toContainEqual(
      new DomainError('Invalid email format!')
    );
  });
});
