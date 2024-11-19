import type { ICoordinates } from '../abstractions/coordinates';
import type { IValueObject } from '../abstractions/value-object';
import { EBrazilStates } from '../enums/brazil-states';
import { AddressValidator } from './validators/address-validator';

type TAddressCreate = {
  cep: string;
  city: string;
  state: EBrazilStates;
  neighborhood: string;
  street: string;
  number: string;
  coordinates?: ICoordinates
}

class Address implements IValueObject {

  public constructor(private readonly _value: TAddressCreate) { }

  public get value(): TAddressCreate {
    return this._value;
  }

  public static create(address: TAddressCreate): Address {
    const addressValidator: AddressValidator = new AddressValidator();
    addressValidator.validate(address);

    if (addressValidator.isInvalid()) {
      throw new Error('Invalid address value object props');
    }

    return new Address(address);
  }

  public toString(): string {
    const {
      cep,
      city,
      neighborhood,
      number,
      state,
      street,
      coordinates
    } = this._value;
    return `cep: ${cep} - city: ${city} - neighborhood: ${neighborhood} - number: ${number} - state: ${state} - street: ${street} - lat: ${coordinates?.latitude} - lng: ${coordinates?.longitude}`;
  }
}

export { Address };
export type { TAddressCreate };
