import type { TPasswordCreate } from "../password";
import { AbstractValidator } from "@/common/domain/validators/abstract-validator";
import { DomainError } from "@/common/domain/errors/domain-error";

class PasswordValidator extends AbstractValidator<TPasswordCreate> {

  private static readonly validBcryptHashRegex = /^\$2[abxy]\$\d{2}\$[./A-Za-z0-9]{53}$/;

  public override validate({ password }: TPasswordCreate): void {
    this.validateEncryptedPassword(password);
  }

  private validateEncryptedPassword(password: string): void {
    if (!password) {
      this.addDomainError(
        new DomainError('Password is required!')
      );
    }

    const passwordHasInvalidFormat: boolean = !PasswordValidator.validBcryptHashRegex.test(password);
    if (passwordHasInvalidFormat) {
      this.addDomainError(
        new DomainError('Password hash has an invalid format!')
      );
    }
  }
}

export { PasswordValidator };
