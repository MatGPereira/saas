import { describe, it, expect, beforeEach } from 'vitest';

import { faker } from '@faker-js/faker';

import type { TEmailCreate } from './email';
import { Email } from './email';

describe(`#${Email.name}`, _ => {
  let validEmailProps: TEmailCreate | undefined = undefined;

  // Arrange
  beforeEach(_ => {
    validEmailProps = {
      email: faker.internet.email(),
    };
  });

  it(`should be able to create an (#${Email.name}) value object`, _ => {
    // Act
    const user: Email = Email.create(validEmailProps!);

    // Assert
    expect(user).toEqual(
      expect.objectContaining({
        _value: expect.any(String),
      })
    );
  });

  it(
    `should not be able to create an (#${Email.name})  value object when props is invalid`,
    _ => {
      // Arrange
      const emailPropsWithoutAddress: TEmailCreate = {
        ...validEmailProps!,
        email: 'email.com'
      };
      const emailPropsWithoutDomain: TEmailCreate = {
        ...validEmailProps!,
        email: 'email@jorge.'
      };

      // Act | Assert
      expect(() => Email.create(emailPropsWithoutAddress)).toThrow()
      expect(() => Email.create(emailPropsWithoutDomain)).toThrow();
    }
  );
});
