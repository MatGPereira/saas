import { describe, it, expect, beforeEach } from 'vitest';

import { CpfValidator } from './cpf-validator';
import { DomainError } from '@/common/domain/errors/domain-error';

describe(`$${CpfValidator.name}`, () => {
  let sut: CpfValidator | undefined = undefined;

  beforeEach(() => {
    sut = new CpfValidator();
  });

  it('should not add errors for a valid CPF', () => {
    // Arrange
    const validCpf = '12345678909';

    // Act
    sut!.validate({ cpf: validCpf });

    // Assert
    expect(sut!.isValid()).toBe(true);
  });

  it('should add an error if CPF is badly formatted', () => {
    // Arrange
    const invalidCpfFormat = '123.456.789-09';

    // Act
    sut!.validate({ cpf: invalidCpfFormat });

    // Assert
    expect(sut!.isInvalid()).toBe(true);
    expect(sut!.domainErrors).toContainEqual(
      new DomainError('Cpf is badly formatted!')
    );
  });

  it('should add an error if first identifier digit is invalid', () => {
    // Arrange
    const invalidFirstDigitCpf = '12345678900';

    // Act
    sut!.validate({ cpf: invalidFirstDigitCpf });

    // Assert
    expect(sut!.isInvalid()).toBe(true);
    expect(sut!.domainErrors).toContainEqual(
      new DomainError('Invalid second identifier digit!')
    );
  });

  it('should add an error if second identifier digit is invalid', () => {
    // Arrange
    const invalidSecondDigitCpf = '12345678901';

    // Act
    sut!.validate({ cpf: invalidSecondDigitCpf });

    // Assert
    expect(sut!.isInvalid()).toBe(true);
    expect(sut!.domainErrors).toContainEqual(
      new DomainError('Invalid second identifier digit!')
    );
  });

  it('should add multiple errors if CPF has multiple issues', () => {
    // Arrange
    const invalidCpf = '123.456.78900';

    // Act
    sut!.validate({ cpf: invalidCpf });

    // Assert
    expect(sut!.isInvalid()).toBe(true);
    expect(sut!.domainErrors).toEqual([
      new DomainError('Cpf is badly formatted!'),
      new DomainError('Invalid first identifier digit!'),
      new DomainError('Invalid second identifier digit!')
    ]);
  });

  it('should add all errors for an invalid CPF', () => {
    // Arrange
    const invalidCpf = '12345678900';

    // Act
    sut!.validate({ cpf: invalidCpf });

    // Assert
    expect(sut!.isInvalid()).toBe(true);
    expect(sut!.domainErrors).toContainEqual(
      new DomainError('Invalid second identifier digit!')
    );
  });
});
