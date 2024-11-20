import { describe, it, expect, beforeEach } from 'vitest';

import { TelephoneValidator } from './telephone-validator';
import { DomainError } from '@/common/domain/errors/domain-error';

describe(`$${TelephoneValidator.name}`, () => {
  let validator: TelephoneValidator | undefined = undefined;

  // Arrange
  beforeEach(_ => {
    validator = new TelephoneValidator();
  });

  it('should not add errors for a valid telephone number', () => {
    // Arrange
    const validNumber = '912345678';

    // Act
    validator!.validate({ ddd: 11, number: validNumber });

    // Assert
    expect(validator!.isValid()).toBe(true);
  });

  it('should add an error for an invalid telephone number', () => {
    // Arrange
    const invalidNumber = '123456';

    // Act
    validator!.validate({ ddd: 11, number: invalidNumber });

    // Assert
    expect(validator!.isInvalid()).toBe(true);
    expect(validator!.domainErrors).toContainEqual(
      new DomainError('Invalid telephone number format!')
    );
  });

  it('should not add errors for a valid DDD', () => {
    // Arrange
    const validDDD = 11;

    //Act
    validator!.validate({ ddd: validDDD, number: '912345678' });

    // Assert
    expect(validator!.isValid()).toBe(true);
  });

  it('should add an error for an invalid DDD', () => {
    // Arrange
    const invalidDDD = 10;

    // Act
    validator!.validate({ ddd: invalidDDD, number: '912345678' });

    // Assert
    expect(validator!.isInvalid()).toBe(true);
    expect(validator!.domainErrors).toContainEqual(
      new DomainError('Invalid DDD for Brazil country!')
    );
  });

  it('should validate both DDD and number correctly', () => {
    // Arrange
    const validDdd = 11;
    const validNumber = '912345678';
    const invalidDdd = 10;
    const invalidNumber = '12345';

    // Act | Assert
    validator!.validate({ ddd: validDdd, number: validNumber });
    expect(validator!.isValid()).toBe(true);

    // Act | Assert
    validator!.validate({ ddd: invalidDdd, number: invalidNumber });
    expect(validator!.isInvalid()).toBe(true);
    expect(validator!.domainErrors).toEqual([
      new DomainError('Invalid telephone number format!'),
      new DomainError('Invalid DDD for Brazil country!')
    ]);
  });
});
