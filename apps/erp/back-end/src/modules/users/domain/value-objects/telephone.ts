import type { IValueObject } from '../abstractions/value-object';
import { TelephoneValidator } from './validators/telephone-validator';

type TTelephoneCreate = {
  ddd: number;
  number: string;
};
class Telephone implements IValueObject {

  public constructor(private readonly _value: TTelephoneCreate) { }

  public get value(): TTelephoneCreate {
    return this._value;
  }

  public static create({ ddd, number }: TTelephoneCreate): Telephone {
    const telephoneValidator: TelephoneValidator = new TelephoneValidator();
    telephoneValidator.validate({ ddd, number });

    if (telephoneValidator.isInvalid()) {
      throw new Error('Invalid password value object props');
    }

    return new Telephone({ ddd, number });
  }

  public toString(): string {
    return `${this._value.ddd}${this._value.number}`;
  }
}

export { Telephone };
export type { TTelephoneCreate };
