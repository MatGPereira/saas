import { describe, it, expect, beforeEach } from 'vitest';

import { faker } from '@faker-js/faker';

import { Password, TPasswordCreate } from './password';

describe(`#${Password.name}`, _ => {
  let validPasswordProps: TPasswordCreate | undefined = undefined;

  // Arrange
  beforeEach(_ => {
    validPasswordProps = {
      password: '$2b$08$.338oUjStQvZxIHyDHLXs..9v29HcbOlmhk/GNxTGaJPiT2DqeXPm',
    };
  });

  it(`should be able to create an (#${Password.name}) value object`, _ => {
    // Act
    const sut: Password = Password.create(validPasswordProps!);

    // Assert
    expect(sut).toEqual(
      expect.objectContaining({
        _value: validPasswordProps!.password,
      })
    );
  });

  it(
    `should not be able to create an (#${Password.name}) value object when props are invalid`,
    _ => {
      // Arrange
      const passwordPropsWithEmptyHash: TPasswordCreate = {
        ...validPasswordProps!,
        password: '',
      };
      const passwordPropsWithInvalidFormat: TPasswordCreate = {
        ...validPasswordProps!,
        password: faker.internet.password(),
      };
      const passwordPropsWithNullValue: TPasswordCreate = {
        ...validPasswordProps!,
        password: null! as string,
      };
      const passwordPropsWithFalsyValue: TPasswordCreate = {
        ...validPasswordProps!,
        password: '   ',
      };

      // Act | Assert
      expect(() => Password.create(passwordPropsWithEmptyHash)).toThrow();
      expect(() => Password.create(passwordPropsWithInvalidFormat)).toThrow();
      expect(() => Password.create(passwordPropsWithFalsyValue)).toThrow();
      expect(() => Password.create(passwordPropsWithNullValue)).toThrow();
    }
  );
});
