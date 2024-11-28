import { describe, it, expect, beforeEach } from 'vitest';

import { TelephoneValidator } from './telephone-validator';
import { DomainError } from '@/common/domain/errors/domain-error';

describe(`$${TelephoneValidator.name}`, () => {
  let sut: TelephoneValidator | undefined = undefined;

  // Arrange
  beforeEach(_ => {
    sut = new TelephoneValidator();
  });

  it('should not add errors for a valid telephone number', () => {
    // Arrange
    const validNumber = '912345678';

    // Act
    sut!.validate({ ddd: 11, number: validNumber });

    // Assert
    expect(sut!.isValid()).toBe(true);
  });

  it('should add an error for an invalid telephone number', () => {
    // Arrange
    const invalidNumber = '123456';

    // Act
    sut!.validate({ ddd: 11, number: invalidNumber });

    // Assert
    expect(sut!.isInvalid()).toBe(true);
    expect(sut!.domainErrors).toContainEqual(
      new DomainError('Invalid telephone number format!')
    );
  });

  it('should not add errors for a valid DDD', () => {
    // Arrange
    const validDDD = 11;

    //Act
    sut!.validate({ ddd: validDDD, number: '912345678' });

    // Assert
    expect(sut!.isValid()).toBe(true);
  });

  it('should add an error for an invalid DDD', () => {
    // Arrange
    const invalidDDD = 10;

    // Act
    sut!.validate({ ddd: invalidDDD, number: '912345678' });

    // Assert
    expect(sut!.isInvalid()).toBe(true);
    expect(sut!.domainErrors).toContainEqual(
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
    sut!.validate({ ddd: validDdd, number: validNumber });
    expect(sut!.isValid()).toBe(true);

    // Act | Assert
    sut!.validate({ ddd: invalidDdd, number: invalidNumber });
    expect(sut!.isInvalid()).toBe(true);
    expect(sut!.domainErrors).toEqual([
      new DomainError('Invalid telephone number format!'),
      new DomainError('Invalid DDD for Brazil country!')
    ]);
  });
});
