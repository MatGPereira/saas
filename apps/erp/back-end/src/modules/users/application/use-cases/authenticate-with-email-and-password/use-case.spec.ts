import { describe, it, beforeEach } from 'vitest';

import type { IAuthenticateUserWithEmailAndPassword } from './use-case-abstraction';
import type { ICryptoService } from '../../services/abstractions/crypto-service';

import { InMemoryUserRepository } from '@/modules/users/infrastructure/repositories/in-memory/user-repository';
import { AuthenticateUserWithEmailAndPasswordUseCase } from './use-case';
import { CryptoService } from '../../services/crypto-service';

describe.todo(`#${AuthenticateUserWithEmailAndPasswordUseCase.name}`, _ => {
  let sut: IAuthenticateUserWithEmailAndPassword | undefined = undefined;
  let cryptoService: ICryptoService | undefined = undefined;
  let inMemoryReadOnlyUserRepository: InMemoryUserRepository | undefined = undefined;

  // Arrange
  beforeEach(_ => {
    cryptoService = new CryptoService();
    inMemoryReadOnlyUserRepository = new InMemoryUserRepository();
    sut = new AuthenticateUserWithEmailAndPasswordUseCase(
      cryptoService,
      inMemoryReadOnlyUserRepository
    );
  });

  it('should be able to return an access token for valid user', async () => {
    // Arrange
    // const validUserProps: TCreateUser = generateValidUserProps();
    // const user: User = User.create(validUserProps);

    // await inMemoryReadOnlyUserRepository!.createUser(user);

    // // Act
    // const authenticateWithEmailAndPasswordCommand: IAuthenticateUserWithEmailAndPasswordCommand = {
    //   email: user.email.value,
    //   password: validUserProps.password.value,
    // };
    // const { accessToken } = await sut!.execute(authenticateWithEmailAndPasswordCommand);

    // // Assert
    // expect(accessToken).toBeDefined();
  });
});
