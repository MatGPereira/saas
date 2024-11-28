import { faker } from "@faker-js/faker";
import generator from 'cpf_and_cnpj-generator';

import type { TCreateUser } from "@/modules/users/domain/entities/user/user";

import { Email, Address, Cpf, Password, Telephone } from "@/modules/users/domain/value-objects";
import { generateValidDdds } from "./generate-valid-ddds";
import { EBrazilStates } from "@/modules/users/domain/enums/brazil-states";
import { UniqueEntityId } from "@/common/domain/entities/unique-entity-id";

function generateValidUserProps(): TCreateUser {
  const email: Email = Email.create({ email: faker.internet.email() })
  const password: Password = Password.create({
    password: '$2b$08$.338oUjStQvZxIHyDHLXs..9v29HcbOlmhk/GNxTGaJPiT2DqeXPm'
  });
  const cpf: Cpf = Cpf.create({ cpf: generator.generateCpf() });
  const telephone: Telephone = Telephone.create({
    ddd: +faker.helpers.arrayElement(generateValidDdds()),
    number: `${faker.number.bigInt({ min: 61111111, max: 99999999 })}`
  });
  const address: Address = Address.create({
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
  });

  const validUserProps: TCreateUser = {
    salt: faker.number.hex(),
    tenantId: new UniqueEntityId('1'),
    name: faker.string.alpha({ length: { min: 3, max: 50 } }),
    lastName: faker.string.alpha({ length: { min: 3, max: 50 } }),
    addresses: [address],
    cpf,
    email,
    password,
    telephones: [telephone],
    username: faker.string.alpha({ length: { min: 3, max: 16 } }),
  };

  return validUserProps;
}

export { generateValidUserProps };
