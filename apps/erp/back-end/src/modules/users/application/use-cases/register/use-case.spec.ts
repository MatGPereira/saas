import { describe, it, beforeEach, expect } from 'vitest';

import { faker } from '@faker-js/faker';
import generator from 'cpf_and_cnpj-generator';

import type { IAddressCommand, IRegisterUserUseCaseCommand, ITelephoneCommand } from './use-case-command';
import type { TCreateUser } from '@/modules/users/domain/entities/user/user';

import { RegisterUserUseCase } from './use-case';
import { CryptoService } from '../../services/crypto-service';
import { InMemoryUserRepository } from '@/modules/users/infrastructure/repositories/in-memory/user-command-repository';
import { EBrazilStates } from '@/modules/users/domain/enums/brazil-states';
import { generateValidDdds } from '@/common/tests/helpers/generate-valid-ddds';
import { UniqueEntityId } from '@/common/domain/entities/unique-entity-id';
import { IRegisterUserUseCase } from './use-case-abstraction';
import { User } from '@/modules/users/domain/entities/user/user';
import { generateValidUserProps } from '@/common/tests/helpers/generate-valid-user-props';

describe(`#${RegisterUserUseCase.name}`, _ => {
  let sut: IRegisterUserUseCase | undefined = undefined;
  let cryptoService: CryptoService | undefined = undefined;
  let inMemoryCommandUserRepository: InMemoryUserRepository | undefined = undefined;
  let inMemoryReadOnlyUserRepository: InMemoryUserRepository | undefined = undefined;

  let registerUserUseCaseCommand: IRegisterUserUseCaseCommand | undefined = undefined;

  // Arrange
  beforeEach(_ => {
    cryptoService = new CryptoService();
    inMemoryCommandUserRepository = new InMemoryUserRepository();
    inMemoryReadOnlyUserRepository = inMemoryCommandUserRepository;
    sut = new RegisterUserUseCase(
      cryptoService,
      inMemoryCommandUserRepository,
      inMemoryReadOnlyUserRepository
    );

    const address: IAddressCommand = {
      cep: '01001000',
      city: faker.location.city(),
      neighborhood: faker.string.alpha(),
      number: faker.location.buildingNumber(),
      state: EBrazilStates.AC,
      street: faker.location.street(),
      coordinates: {
        latitude: faker.location.latitude({ precision: 10 }),
        longitude: faker.location.longitude({ precision: 10 })
      }
    }
    const telephone: ITelephoneCommand = {
      ddd: +faker.helpers.arrayElement(generateValidDdds()),
      number: `${faker.number.bigInt({ min: 61111111, max: 99999999 })}`
    }
    registerUserUseCaseCommand = {
      addresses: [address],
      cpf: generator.generateCpf(),
      email: faker.internet.email(),
      lastName: faker.person.lastName(),
      name: faker.person.firstName(),
      password: faker.string.alpha({ length: 9 }),
      telephones: [telephone],
      tenantId: new UniqueEntityId(),
    }
  });

  it('should be able to create an user in the database', async () => {
    // Act
    const { createdUserId } = await sut!.execute(registerUserUseCaseCommand!);

    //  Assert
    expect(createdUserId).toBeDefined();
  });

  it('should not be able to create an user with existing e-mail', async () => {
    // Arrange
    const userProps: TCreateUser = generateValidUserProps();
    const user: User = User.create(userProps);

    await inMemoryCommandUserRepository!.createUser(user);

    const registerUserUseCaseCommandWithExistingEmail: IRegisterUserUseCaseCommand = {
      ...registerUserUseCaseCommand!,
      email: user.email.value,
    };

    // Act | Assert
    await expect(() => sut!.execute(
      registerUserUseCaseCommandWithExistingEmail
    )).rejects.toThrow('User with same e-mail already exists');
  });
});
