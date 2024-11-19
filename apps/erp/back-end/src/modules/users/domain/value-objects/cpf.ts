import type { IValueObject } from '../abstractions/value-object';
import { CpfValidator } from './validators/cpf-validator';

type TCpfCreate = { cpf: string }

class Cpf implements IValueObject {

  public constructor(private readonly _value: string) { }

  public get value(): string {
    return this.value;
  }

  public static create({ cpf }: TCpfCreate): Cpf {
    const cpfValidator: CpfValidator = new CpfValidator();
    cpfValidator.validate({ cpf });

    if (cpfValidator.isInvalid()) {
      throw new Error('Invalid cpf value object props');
    }

    return new Cpf(cpf);
  }
}

export { Cpf };
export type { TCpfCreate };
