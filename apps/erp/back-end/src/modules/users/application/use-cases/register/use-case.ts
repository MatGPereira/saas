import type { ICryptoService } from "../../services/abstractions/crypto-service";
import type { IRegisterUserUseCase } from "./use-case-abstraction";
import type { IAddressCommand, IRegisterUserUseCaseCommand, ITelephoneCommand } from "./use-case-command";
import type { IRegisterUserUseCaseResult } from "./use-case-result";
import type { ICommandUserRepository, IReadOnlyUserRepository } from "@/modules/users/domain/abstractions/repositories/in-memory/user-repository";

import { Address, Cpf, Email, Password, Telephone } from '@/modules/users/domain/value-objects';
import { User } from "@/modules/users/domain/entities/user/user";

class RegisterUserUseCase implements IRegisterUserUseCase {

  public constructor(
    private readonly cryptoService: ICryptoService,
    private readonly userCommandRepository: ICommandUserRepository,
    private readonly userReadOnlyRepository: IReadOnlyUserRepository
  ) { }

  public async execute({
    addresses,
    cpf,
    email,
    lastName,
    name,
    password,
    telephones,
    tenantId,
    username
  }: IRegisterUserUseCaseCommand): Promise<IRegisterUserUseCaseResult> {
    const userAlreadyExists: boolean = await this.userReadOnlyRepository.existUserByEmail(email);
    if (userAlreadyExists) throw new Error('User with same e-mail already exists');

    const [passwordHash, salt]: [string, string] = await this.cryptoService.encrypt(password);
    const user: User = User.create({
      addresses: this.buildAddresses(addresses),
      cpf: Cpf.create({ cpf }),
      email: Email.create({ email }),
      lastName,
      name,
      password: Password.create({ password: passwordHash }),
      salt,
      telephones: this.buildTelephones(telephones),
      tenantId,
      username
    });

    const createdUserId = await this.userCommandRepository.createUser(user);
    return { createdUserId };
  }

  private buildAddresses(addresses: IAddressCommand[]): Address[] {
    return addresses.map(({
      cep,
      city,
      neighborhood,
      number,
      state,
      street,
      coordinates
    }: IAddressCommand) => {
      return Address.create({
        cep,
        city,
        neighborhood,
        number,
        state,
        street,
        coordinates
      });
    });
  }

  private buildTelephones(telephones: ITelephoneCommand[]): Telephone[] {
    return telephones.map(({
      ddd,
      number
    }: ITelephoneCommand) => {
      return Telephone.create({
        ddd,
        number
      });
    });
  }
}

export { RegisterUserUseCase };
