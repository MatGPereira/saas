import { describe, it, beforeEach, expect } from 'vitest';

import type { TCreateUser } from '@/modules/users/domain/entities/user/user';

import { InMemoryUserCommandRepository } from './user-command-repository';
import { User } from '@/modules/users/domain/entities/user/user';
import { EBrazilDdd } from '@/modules/users/domain/value-objects/validators/telephone-validator-constants';
import { generateValidUserProps } from '@/common/tests/helpers/generate-valid-user-props';

describe(`#${InMemoryUserCommandRepository.name}`, _ => {
  let inMemoryUserRepository: InMemoryUserCommandRepository | undefined = undefined;

  // Arrange
  beforeEach(_ => {
    inMemoryUserRepository = new InMemoryUserCommandRepository();
  });

  it('should be able to create a user', async () => {
    // Arrange
    const validUserProps: TCreateUser = generateValidUserProps();
    const user: User = User.create(validUserProps);

    // Act
    const createdUserId = await inMemoryUserRepository!.createUser(user);

    // Assert
    expect(createdUserId).toBeDefined();
    expect(inMemoryUserRepository!.db).toHaveLength(1);
    expect(inMemoryUserRepository!.db[0].id.toString()).toBeDefined();
  });
});
