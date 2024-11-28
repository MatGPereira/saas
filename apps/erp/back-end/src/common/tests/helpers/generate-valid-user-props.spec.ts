import { expect, it, describe } from 'vitest';

import type { TCreateUser } from '@/modules/users/domain/entities/user/user';

import { generateValidUserProps } from './generate-valid-user-props';

describe(`#${generateValidUserProps.name}`, _ => {
  it('should be able to generate valid user props', _ => {
    // Arrange | Act
    const validUserProps: TCreateUser = generateValidUserProps();

    // Assert
    expect(validUserProps).toEqual(
      expect.objectContaining({
        name: expect.any(String),
        lastName: expect.any(String),
        email: expect.objectContaining({
          _value: expect.any(String)
        }),
        password: expect.objectContaining({
          _value: expect.any(String)
        }),
        username: expect.any(String),
        cpf: expect.objectContaining({}),
        telephones: expect.objectContaining({}),
        addresses: expect.objectContaining({}),
      })
    );
  });
});
