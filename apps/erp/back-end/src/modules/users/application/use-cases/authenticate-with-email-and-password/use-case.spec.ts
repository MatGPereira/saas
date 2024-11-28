import { describe, it, beforeEach } from 'vitest';

import type { IAuthenticateUserWithEmailAndPassword } from './use-case-abstraction';
import { InMemoryUserRepository } from '@/modules/users/infrastructure/repositories/in-memory/user-repository';
import type { ICryptoService } from '../../services/abstractions/crypto-service';

import { AuthenticateUserWithEmailAndPasswordUseCase } from './use-case';
import { CryptoService } from '../../services/crypto-service';

describe(`#${AuthenticateUserWithEmailAndPasswordUseCase.name}`, _ => {
  let sut: IAuthenticateUserWithEmailAndPassword | undefined = undefined;
  let cryptoService: ICryptoService | undefined = undefined;
  let inMemoryReadOnlyUserRepository: InMemoryUserRepository | undefined = undefined;

  // Assert
  beforeEach(_ => {
    cryptoService = new CryptoService();
    inMemoryReadOnlyUserRepository = new InMemoryUserRepository();
    sut = new AuthenticateUserWithEmailAndPasswordUseCase(
      cryptoService,
      inMemoryReadOnlyUserRepository
    );
  });

  it('should be able to return an access token for valid user', async () => {

  });
});
