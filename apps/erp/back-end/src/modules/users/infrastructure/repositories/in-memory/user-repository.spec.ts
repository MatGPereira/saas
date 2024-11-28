import { describe, it, beforeEach, expect } from 'vitest';

import type { TCreateUser } from '@/modules/users/domain/entities/user/user';

import { InMemoryUserRepository } from './user-repository';
import { User } from '@/modules/users/domain/entities/user/user';
import { generateValidUserProps } from '@/helpers/generate-valid-user-props';

describe(`#${InMemoryUserRepository.name}`, _ => {
  let sut: InMemoryUserRepository | undefined = undefined;
  let validUserProps: TCreateUser | undefined = undefined;

  // Arrange
  beforeEach(_ => {
    sut = new InMemoryUserRepository();
    validUserProps = generateValidUserProps();
  });

  it('should be able to create a user', async () => {
    // Arrange
    const user: User = User.create(validUserProps!);

    // Act
    const createdUserId = await sut!.createUser(user);

    // Assert
    expect(createdUserId).toBeDefined();
    expect(sut!.db).toHaveLength(1);
    expect(sut!.db[0].id.toString()).toBeDefined();
  });

  it('should be able to return if an specific user exists', async () => {
    // Arrange
    const user: User = User.create(validUserProps!);
    await sut!.createUser(user);

    // Act
    const hasUserWithEmail: boolean = await sut!.existUserByEmail(
      user.email.value
    );

    // Assert
    expect(hasUserWithEmail).toBe(true);
  });

  it(
    'should return false if user cannot exists when existUserByEmail was called',
    async () => {
      // Arrange
      const differentUserEmail: string = "jhon@doe.com";
      const user: User = User.create(validUserProps!);
      await sut!.createUser(user);

      // Act
      const hasUserWithEmail: boolean = await sut!.existUserByEmail(
        differentUserEmail
      );

      // Assert
      expect(hasUserWithEmail).toBe(false);
    }
  );

  it('should be able to find an user with e-mail', async () => {
    // Arrange
    const user: User = User.create(validUserProps!);
    await sut!.createUser(user);

    // Act
    const userWithEmail: User | null = await sut!.findUserByEmail(
      user.email.value
    )!;

    // Assert
    expect(userWithEmail).toBeInstanceOf(User);
  });

  it('should be able to return null when user email no exists', async () => {
    // Arrange
    const user: User = User.create(validUserProps!);
    await sut!.createUser(user);

    // Act
    const userWithEmail: User | null = await sut!.findUserByEmail(
      "invalid@email.com"
    )!;

    // Assert
    expect(userWithEmail).toBe(null);
  });
});
