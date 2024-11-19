import { describe, it, expect, beforeEach } from 'vitest';

import { faker } from '@faker-js/faker';

import { Password, TPasswordCreate } from './password';

describe(`#${Password.name}`, _ => {
  let validPasswordProps: TPasswordCreate | undefined = undefined;

  // Arrange
  beforeEach(_ => {
    validPasswordProps = {
      password: 'Aa123!@aX',
    };
  });

  it(`should be able to create an (#${Password.name}) value object`, _ => {
    // Act
    const user: Password = Password.create(validPasswordProps!);

    // Assert
    expect(user).toEqual(
      expect.objectContaining({
        _value: expect.any(String),
      })
    );
  });

  it(
    `should not be able to create an (#${Password.name})  value object when props is invalid`,
    _ => {
      // Arrange
      const passwordPropsWithInvalidMinLength: TPasswordCreate = {
        ...validPasswordProps!,
        password: faker.internet.password({ length: 8 }),
      };
      const passwordPropsWithInvalidMaxLength: TPasswordCreate = {
        ...validPasswordProps!,
        password: faker.internet.password({ length: 21 }),
      };
      const passwordPropsWithNullValue: TPasswordCreate = {
        ...validPasswordProps!,
        password: null! as string,
      };
      const passwordPropsWithFalsyValue: TPasswordCreate = {
        ...validPasswordProps!,
        password: '   ',
      };
      const passwordPropsWithInvalidFormat: TPasswordCreate = {
        ...validPasswordProps!,
        password: faker.string.alpha(),
      };

      // Act | Assert
      expect(() => Password.create(passwordPropsWithInvalidMinLength)).toThrow()
      expect(() => Password.create(passwordPropsWithInvalidMaxLength)).toThrow();
      expect(() => Password.create(passwordPropsWithInvalidFormat)).toThrow();
      expect(() => Password.create(passwordPropsWithFalsyValue)).toThrow();
      expect(() => Password.create(passwordPropsWithNullValue)).toThrow();
    }
  );
});
