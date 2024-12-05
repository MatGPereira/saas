import { describe, it, beforeEach, expect } from 'vitest';

import type { IAuthenticateUserWithEmailAndPassword } from './use-case-abstraction';
import type { IAuthenticateUserWithEmailAndPasswordCommand } from './use-case-command';
import type { ICryptoService } from '../../../../../common/application/services/abstractions/crypto-service';
import type { TCreateUser } from '@/modules/users/domain/entities/user/user';

import { InMemoryUserRepository } from '@/modules/users/infrastructure/repositories/in-memory/user-repository';
import { AuthenticateUserWithEmailAndPasswordUseCase } from './use-case';
import { CryptoService } from '../../../../../common/application/services/crypto-service';
import { User } from '@/modules/users/domain/entities/user/user';
import { generateValidUserProps } from '@/helpers/generate-valid-user-props';
import { Password } from '@/modules/users/domain/value-objects';

describe(`#${AuthenticateUserWithEmailAndPasswordUseCase.name}`, _ => {
  let sut: IAuthenticateUserWithEmailAndPassword | undefined = undefined;
  let cryptoService: ICryptoService | undefined = undefined;
  let inMemoryUserRepository: InMemoryUserRepository | undefined = undefined;

  // Arrange
  beforeEach(_ => {
    cryptoService = new CryptoService();
    inMemoryUserRepository = new InMemoryUserRepository();
    sut = new AuthenticateUserWithEmailAndPasswordUseCase(
      cryptoService,
      inMemoryUserRepository
    );
  });

  it('should be able to return an access token for valid user', async () => {
    // Arrange
    const validUserProps: TCreateUser = generateValidUserProps();
    const [passwordHash]: [string, string] = await cryptoService!.encrypt(
      validUserProps.password.value
    );
    const userPropsWithPasswordHash: TCreateUser = {
      ...validUserProps,
      password: Password.create({ password: passwordHash })
    }
    const user: User = User.create(userPropsWithPasswordHash);

    await inMemoryUserRepository!.createUser(user);

    // Act
    const authenticateWithEmailAndPasswordCommand: IAuthenticateUserWithEmailAndPasswordCommand = {
      email: user.email.value,
      password: validUserProps.password.value,
    };
    const { accessToken } = await sut!.execute(authenticateWithEmailAndPasswordCommand);

    // Assert
    expect(accessToken).toBeDefined();
  });

  it(
    'should not be able to return an access token for invalid user password',
    async () => {
      // Arrange
      const validUserProps: TCreateUser = generateValidUserProps();
      const user: User = User.create(validUserProps);

      await inMemoryUserRepository!.createUser(user);

      // Act | Assert
      const authenticateWithEmailAndPasswordCommand: IAuthenticateUserWithEmailAndPasswordCommand = {
        email: user.email.value,
        password: validUserProps.password.value,
      };
      await expect(
        () => sut!.execute(authenticateWithEmailAndPasswordCommand)
      ).rejects.toThrow('Invalid credentials!');
    }
  );

  it(
    'should not be able to return an access token for invalid user email',
    async () => {
      // Arrange
      const validUserProps: TCreateUser = generateValidUserProps();
      const user: User = User.create(validUserProps);

      await inMemoryUserRepository!.createUser(user);

      // Act | Assert
      const authenticateWithEmailAndPasswordCommand: IAuthenticateUserWithEmailAndPasswordCommand = {
        email: "invalid@email.com",
        password: validUserProps.password.value,
      };
      await expect(
        () => sut!.execute(authenticateWithEmailAndPasswordCommand)
      ).rejects.toThrow('Invalid credentials!');
    }
  );
});
