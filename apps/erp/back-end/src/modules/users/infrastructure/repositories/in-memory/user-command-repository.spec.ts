import { describe, it, beforeEach, expect } from 'vitest';

import type { TCreateUser } from '@/modules/users/domain/entities/user/user';

import { InMemoryUserCommandRepository } from './user-command-repository';
import { User } from '@/modules/users/domain/entities/user/user';
import { generateValidUserProps } from '@/common/tests/helpers/generate-valid-user-props';

describe(`#${InMemoryUserCommandRepository.name}`, _ => {
  let inMemoryUserRepository: InMemoryUserCommandRepository | undefined = undefined;
  let validUserProps: TCreateUser | undefined = undefined;

  // Arrange
  beforeEach(_ => {
    inMemoryUserRepository = new InMemoryUserCommandRepository();
    validUserProps = generateValidUserProps();
  });

  it('should be able to create a user', async () => {
    // Arrange
    const user: User = User.create(validUserProps!);

    // Act
    const createdUserId = await inMemoryUserRepository!.createUser(user);

    // Assert
    expect(createdUserId).toBeDefined();
    expect(inMemoryUserRepository!.db).toHaveLength(1);
    expect(inMemoryUserRepository!.db[0].id.toString()).toBeDefined();
  });

  it('should be able to return if an specific user exists', async () => {
    // Arrange
    const user: User = User.create(validUserProps!);
    await inMemoryUserRepository!.createUser(user);

    // Act
    const hasUserWithEmail: boolean = await inMemoryUserRepository!.existUserByEmail(
      user.email.value
    );

    // Assert
    expect(hasUserWithEmail).toBe(true);
  });
});
