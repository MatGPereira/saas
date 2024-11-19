import type { IValueObject } from '../abstractions/value-object';
import { PasswordValidator } from './validators/password-validator';

type TPasswordCreate = { password: string; }

class Password implements IValueObject {

  public constructor(private readonly _value: string) { }

  public get value(): string {
    return this._value;
  }

  public static create({ password }: TPasswordCreate): Password {
    const passwordValidator: PasswordValidator = new PasswordValidator();
    passwordValidator.validate({ password });

    if (passwordValidator.isInvalid()) {
      throw new Error('Invalid password value object props');
    }

    return new Password(password);
  }
}

export { Password };
export type { TPasswordCreate };
