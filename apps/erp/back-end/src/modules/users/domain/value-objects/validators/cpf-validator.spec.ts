import { describe, it, expect, beforeEach } from 'vitest';

import { CpfValidator } from './cpf-validator';
import { DomainError } from '@/common/domain/errors/domain-error';

describe(`$${CpfValidator.name}`, () => {
  let validator: CpfValidator | undefined = undefined;

  beforeEach(() => {
    validator = new CpfValidator();
  });

  it('should not add errors for a valid CPF', () => {
    // Arrange
    const validCpf = '12345678909';

    // Act
    validator!.validate({ cpf: validCpf });

    // Assert
    expect(validator!.isValid()).toBe(true);
  });

  it('should add an error if CPF is badly formatted', () => {
    // Arrange
    const invalidCpfFormat = '123.456.789-09';

    // Act
    validator!.validate({ cpf: invalidCpfFormat });

    // Assert
    expect(validator!.isInvalid()).toBe(true);
    expect(validator!.domainErrors).toContainEqual(
      new DomainError('Cpf is badly formatted!')
    );
  });

  it('should add an error if first identifier digit is invalid', () => {
    // Arrange
    const invalidFirstDigitCpf = '12345678900';

    // Act
    validator!.validate({ cpf: invalidFirstDigitCpf });

    // Assert
    expect(validator!.isInvalid()).toBe(true);
    expect(validator!.domainErrors).toContainEqual(
      new DomainError('Invalid second identifier digit!')
    );
  });

  it('should add an error if second identifier digit is invalid', () => {
    // Arrange
    const invalidSecondDigitCpf = '12345678901';

    // Act
    validator!.validate({ cpf: invalidSecondDigitCpf });

    // Assert
    expect(validator!.isInvalid()).toBe(true);
    expect(validator!.domainErrors).toContainEqual(
      new DomainError('Invalid second identifier digit!')
    );
  });

  it('should add multiple errors if CPF has multiple issues', () => {
    // Arrange
    const invalidCpf = '123.456.78900';

    // Act
    validator!.validate({ cpf: invalidCpf });

    // Assert
    expect(validator!.isInvalid()).toBe(true);
    expect(validator!.domainErrors).toEqual([
      new DomainError('Cpf is badly formatted!'),
      new DomainError('Invalid first identifier digit!'),
      new DomainError('Invalid second identifier digit!')
    ]);
  });

  it('should add all errors for an invalid CPF', () => {
    // Arrange
    const invalidCpf = '12345678900';

    // Act
    validator!.validate({ cpf: invalidCpf });

    // Assert
    expect(validator!.isInvalid()).toBe(true);
    expect(validator!.domainErrors).toContainEqual(
      new DomainError('Invalid second identifier digit!')
    );
  });
});
