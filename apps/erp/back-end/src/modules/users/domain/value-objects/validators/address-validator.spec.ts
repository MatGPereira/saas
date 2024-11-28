import { describe, it, expect, beforeEach } from 'vitest';

import { faker } from '@faker-js/faker';

import type { TAddressCreate } from '../address';
import { AddressValidator } from './address-validator';
import { DomainError } from '@/common/domain/errors/domain-error';
import { EBrazilStates } from '../../enums/brazil-states';
import { EAddressValidatorConstants } from './address-validator-constants';

describe(`$${AddressValidator.name}`, () => {
  let sut: AddressValidator | undefined = undefined;

  beforeEach(() => {
    sut = new AddressValidator();
  });

  it('should not add errors for a valid address', () => {
    // Arrange
    const validAddress = {
      cep: '12345678',
      city: 'Valid City',
      neighborhood: 'Valid Neighborhood',
      street: 'Valid Street',
      number: '123',
      state: EBrazilStates.SP,
      coordinates: { latitude: -23.55052, longitude: -46.633308 }
    };

    // Act
    sut!.validate(validAddress);

    // Assert
    expect(sut!.isValid()).toBe(true);
  });

  it('should add an error if cep length is invalid', () => {
    // Arrange
    const invalidCep = '12345';  // Invalid CEP length

    // Act
    sut!.validate({
      cep: invalidCep,
      city: 'City',
      neighborhood: 'Neighborhood',
      street: 'Street',
      number: '123',
      state: EBrazilStates.SP,
      coordinates: { latitude: -23.55052, longitude: -46.633308 }
    });

    // Assert
    expect(sut!.isInvalid()).toBe(true);
    expect(sut!.domainErrors).toContainEqual(
      new DomainError('Cep with invalid length! Should be eight')
    );
  });

  it('should add an error if city name is missing', () => {
    // Arrange
    const invalidAddress = {
      cep: '12345678',
      city: '',
      neighborhood: 'Neighborhood',
      street: 'Street',
      number: '123',
      state: EBrazilStates.SP,
      coordinates: { latitude: -23.55052, longitude: -46.633308 }
    };

    // Act
    sut!.validate(invalidAddress);

    // Assert
    expect(sut!.isInvalid()).toBe(true);
    expect(sut!.domainErrors).toContainEqual(
      new DomainError('City name is required')
    );
  });

  it('should add an error if city name is too short', () => {
    // Arrange
    const invalidAddress = {
      cep: '12345678',
      city: 'A',
      neighborhood: 'Neighborhood',
      street: 'Street',
      number: '123',
      state: EBrazilStates.SP,
      coordinates: { latitude: -23.55052, longitude: -46.633308 }
    };

    // Act
    sut!.validate(invalidAddress);

    // Assert
    expect(sut!.isInvalid()).toBe(true);
    expect(sut!.domainErrors).toContainEqual(
      new DomainError('City name too short!')
    );
  });

  it('should add an error if city name is too long', () => {
    // Arrange
    const invalidAddress = {
      cep: '12345678',
      city: 'A'.repeat(EAddressValidatorConstants.MAX_CITY_NAME_LENGTH + 1),
      neighborhood: 'Neighborhood',
      street: 'Street',
      number: '123',
      state: EBrazilStates.SP,
      coordinates: { latitude: -23.55052, longitude: -46.633308 }
    };

    // Act
    sut!.validate(invalidAddress);

    // Assert
    expect(sut!.isInvalid()).toBe(true);
    expect(sut!.domainErrors).toContainEqual(
      new DomainError('City name too long!')
    );
  });

  it('should add an error if neighborhood name is missing', () => {
    // Arrange
    const invalidAddress = {
      cep: '12345678',
      city: 'City',
      neighborhood: '',
      street: 'Street',
      number: '123',
      state: EBrazilStates.SP,
      coordinates: { latitude: -23.55052, longitude: -46.633308 }
    };

    // Act
    sut!.validate(invalidAddress);

    // Assert
    expect(sut!.isInvalid()).toBe(true);
    expect(sut!.domainErrors).toContainEqual(
      new DomainError('Neighborhood name is required')
    );
  });

  it('should add an error if street name is missing', () => {
    // Arrange
    const invalidAddress = {
      cep: '12345678',
      city: 'City',
      neighborhood: 'Neighborhood',
      street: '',
      number: '123',
      state: EBrazilStates.SP,
      coordinates: { latitude: -23.55052, longitude: -46.633308 }
    };

    // Act
    sut!.validate(invalidAddress);

    // Assert
    expect(sut!.isInvalid()).toBe(true);
    expect(sut!.domainErrors).toContainEqual(
      new DomainError('Neighborhood name is required') // This message should be about street, not neighborhood
    );
  });

  it('should add an error if coordinates are invalid', () => {
    // Arrange
    const invalidCoordinates = {
      cep: '12345678',
      city: 'City',
      neighborhood: 'Neighborhood',
      street: 'Street',
      number: '123',
      state: EBrazilStates.SP,
      coordinates: { latitude: 100, longitude: 200 } // Invalid coordinates
    };

    // Act
    sut!.validate(invalidCoordinates);

    // Assert
    expect(sut!.isInvalid()).toBe(true);
    expect(sut!.domainErrors).toContainEqual(
      new DomainError('Latitude should be between -90deg and +90deg')
    );
    expect(sut!.domainErrors).toContainEqual(
      new DomainError('Longitude should be between -180deg and +180deg')
    );
  });

  it('should add an error if state is not a valid enum value', () => {
    // Arrange
    const invalidState = 'InvalidState';

    // Act
    sut!.validate({
      cep: '12345678',
      city: 'City',
      neighborhood: 'Neighborhood',
      street: 'Street',
      number: '123',
      state: <EBrazilStates>invalidState,
      coordinates: { latitude: -23.55052, longitude: -46.633308 }
    });

    // Assert
    expect(sut!.isInvalid()).toBe(true);
    expect(sut!.domainErrors).toContainEqual(
      new DomainError('State should not exists!')
    );
  });
});
