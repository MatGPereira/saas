import type { TEmailCreate } from "../email";
import { AbstractValidator } from "@/common/domain/validators/abstract-validator";
import { DomainError } from "@/common/domain/errors/domain-error";

class EmailValidator extends AbstractValidator<TEmailCreate> {

  private static readonly EMAIL_REGEX = /^[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
  private static readonly MAX_ACCOUNT_LENGTH = 64;
  private static readonly MAX_ADDRESS_LENGTH = 255;
  private static readonly MAX_DOMAIN_LENGTH = 63;

  public override validate({ email }: TEmailCreate): void {
    this.validateEmailFormat(email);
  }

  private validateEmailFormat(email: string): void {
    const emailIsNullOrWhiteSpace: boolean = !email;
    if (emailIsNullOrWhiteSpace) {
      this.addDomainError(
        new DomainError('Email is required!')
      );
    }

    const emailParts: string[] = email.split('@');

    const emailHasNotAccountOrDomain: boolean = emailParts.length !== 2;
    const emailHasInvalidFormat: boolean = !EmailValidator.EMAIL_REGEX.test(email);
    const emailIsNotWellFormatted: boolean = emailHasInvalidFormat || emailHasNotAccountOrDomain;
    if (emailIsNotWellFormatted) {
      this.addDomainError(
        new DomainError('Invalid email format!')
      );
    }

    const account: string = emailParts[0];
    const address: string = emailParts[1];
    if (account.length > EmailValidator.MAX_ACCOUNT_LENGTH) {
      this.addDomainError(
        new DomainError('Email account is too long!')
      );
    }

    if (address.length > EmailValidator.MAX_ADDRESS_LENGTH) {
      this.addDomainError(
        new DomainError('Email address is too long!')
      );
    }

    const domainParts: string[] = address.split('.');
    const hasSomeDomainPartTooLong: boolean = domainParts.some(
      part => part.length > EmailValidator.MAX_DOMAIN_LENGTH
    );
    if (hasSomeDomainPartTooLong) {
      this.addDomainError(
        new DomainError('Some email domain is too long!')
      );
    }
  }
}

export { EmailValidator };
