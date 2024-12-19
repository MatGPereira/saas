import type { ICryptoService } from "../../../../../common/application/services/abstractions/crypto-service";
import type { IRegisterUserUseCase } from "./use-case-abstraction";
import type { IAddressCommand, IRegisterUserUseCaseCommand, ITelephoneCommand } from "./use-case-command";
import type { IRegisterUserUseCaseResult } from "./use-case-result";
import type { ICommandUserRepository, IReadOnlyUserRepository } from "@/modules/users/domain/abstractions/repositories/in-memory/user-repository";
import type { ITemplateService } from "@/common/application/services/abstractions/template-service";
import type { IEmailService } from "@/common/infrastructure/services/abstraction/email-service";

import { Address, Cpf, Email, Password, Telephone } from '@/modules/users/domain/value-objects';
import { User } from "@/modules/users/domain/entities/user/user";
import { UniqueEntityId } from "@/common/domain/entities/unique-entity-id";
import { ETemplateReference } from "@/common/application/templates/template-reference";

class RegisterUserUseCase implements IRegisterUserUseCase {

  public constructor(
    private readonly cryptoService: ICryptoService,
    private readonly userCommandRepository: ICommandUserRepository,
    private readonly userReadOnlyRepository: IReadOnlyUserRepository,
    private readonly templateService: ITemplateService,
    private readonly emailService: IEmailService
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

    const createdUserId: UniqueEntityId = await this.userCommandRepository.createUser(user);

    // TODO: add internationalization
    const template: string = await this.templateService.get({
      templateName: ETemplateReference.RegisterWelcomeTemplateName,
    });

    // TODO: insert the e-mail function to a queue
    await this.emailService.send({
      to: {
        name: user.name,
        email,
      },
      from: {
        name: 'no-reply',
        email: 'matheusgp.mto@outlook.com',
      },
      subject: 'Email test',
      body: {
        template,
      }
    });

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
