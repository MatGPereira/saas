import type { ICoordinates } from "@/modules/users/domain/abstractions/coordinates";

import { UniqueEntityId } from "@/common/domain/entities/unique-entity-id";
import { EBrazilStates } from "@/modules/users/domain/enums/brazil-states";

interface IRegisterUserUseCaseCommand {
  tenantId: UniqueEntityId;
  name: string;
  lastName: string;
  email: string;
  password: string;
  username?: string;
  cpf: string;
  telephones: ITelephoneCommand[];
  addresses: IAddressCommand[];
}

interface IAddressCommand {
  cep: string;
  city: string;
  state: EBrazilStates;
  neighborhood: string;
  street: string;
  number: string;
  coordinates?: ICoordinates
}

interface ITelephoneCommand {
  ddd: number;
  number: string;
}

export type { IRegisterUserUseCaseCommand, IAddressCommand, ITelephoneCommand };
