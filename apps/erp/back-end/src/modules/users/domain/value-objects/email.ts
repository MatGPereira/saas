import type { IValueObject } from '../abstractions/value-object';
import { EmailValidator } from './validators/email-validator';

type TEmailCreate = { email: string }

class Email implements IValueObject {

  public constructor(private readonly _value: string) { }

  public get value(): string {
    return this._value;
  }

  public static create({ email }: TEmailCreate): Email {
    const emailValidator: EmailValidator = new EmailValidator();
    emailValidator.validate({ email });

    if (emailValidator.isInvalid()) {
      throw new Error('Invalid email value object props');
    }

    return new Email(email);
  }
}

export { Email };
export type { TEmailCreate };
