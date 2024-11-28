import { describe, it, expect } from 'vitest';

import { faker } from '@faker-js/faker';

import type { TAddressCreate } from './address';
import { Address } from './address';
import { EBrazilStates } from '../enums/brazil-states';

const brazilStates: string[] = Object.keys(EBrazilStates);

describe(`#${Address.name}`, _ => {
  it.each([
    ['96501104', faker.helpers.arrayElement(brazilStates)],
    ['58056265', faker.helpers.arrayElement(brazilStates)],
    ['57030-091', faker.helpers.arrayElement(brazilStates)],
    ['69907-824', faker.helpers.arrayElement(brazilStates)]
  ])(
    'should be able to create an address with cep (%s) and state (%s)',
    (cep: string, state: string) => {
      // Arrange
      const validAddressProps: TAddressCreate = {
        cep,
        city: faker.location.city(),
        neighborhood: faker.string.alpha(),
        number: faker.location.buildingNumber(),
        state: <EBrazilStates>state,
        street: faker.location.street(),
        coordinates: {
          latitude: faker.location.latitude({ precision: 10 }),
          longitude: faker.location.longitude({ precision: 10 })
        }
      }

      // Act
      const sut: Address = Address.create(validAddressProps);

      // Assert
      expect(sut).toEqual(
        expect.objectContaining({
          _value: expect.objectContaining({
            cep: expect.any(String),
            city: expect.any(String),
            state: expect.any(String),
            neighborhood: expect.any(String),
            street: expect.any(String),
            number: expect.any(String),
            coordinates: expect.objectContaining({
              latitude: expect.any(Number),
              longitude: expect.any(Number),
            })
          }),
        })
      );
    }
  );

  it.each([
    ['9650110', 'KJ'],
    ['', faker.helpers.arrayElement(brazilStates)],
    ['', 'KJ'],
    ['69907-824', faker.helpers.arrayElement(brazilStates)]
  ])(
    'should not be able to create an address with invalid props',
    (cep: string, state: string) => {
      // Arrange
      const cityWithInvalidMinLength: string = 'c';
      const cityWithInvalidMaxLength: string = faker.string.alpha({ length: { min: 51, max: 70 } })
      const validAddressProps: TAddressCreate = {
        cep,
        city: faker.location.city(),
        neighborhood: faker.string.alpha(),
        number: faker.location.buildingNumber(),
        state: <EBrazilStates>state,
        street: faker.location.street(),
        coordinates: {
          latitude: faker.location.latitude({ precision: 10 }),
          longitude: faker.location.longitude({ precision: 10 })
        }
      }

      const addressPropsWithInvalidCityMinLength: TAddressCreate = {
        ...validAddressProps,
        city: cityWithInvalidMinLength
      }
      const addressPropsWithInvalidCityMaxLength: TAddressCreate = {
        ...validAddressProps,
        city: cityWithInvalidMaxLength
      }

      // Act | Assert
      expect(
        () => Address.create(addressPropsWithInvalidCityMinLength)
      ).toThrow();
      expect(
        () => Address.create(addressPropsWithInvalidCityMaxLength)
      ).toThrow();
    }
  )
});
