import type { TPasswordCreate } from "../password";
import { AbstractValidator } from "@/common/domain/validators/abstract-validator";
import { DomainError } from "@/common/domain/errors/domain-error";
import { EPasswordValidatorConstants } from "./password-validator-constants";

class PasswordValidator extends AbstractValidator<TPasswordCreate> {

  private static readonly validPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{9,20}$/;

  public override validate({ password }: TPasswordCreate): void {
    // this.validatePassword(password);
  }

  private validatePassword(password: string): void {
    if (!password) {
      this.addDomainError(
        new DomainError('Password is required!')
      );
    }

    const passwordHasInvalidMinLength: boolean = password.length
      < EPasswordValidatorConstants.PASSWORD_MIN_LENGTH;
    if (passwordHasInvalidMinLength) {
      this.addDomainError(
        new DomainError('Password is too short!')
      );
    }

    const passwordHasInvalidMaxLength: boolean = password.length
      > EPasswordValidatorConstants.PASSWORD_MAX_LENGTH;
    if (passwordHasInvalidMaxLength) {
      this.addDomainError(
        new DomainError('Password is too long!')
      );
    }

    const passwordHasInvalidFormat: boolean = !PasswordValidator.validPasswordRegex.test(password);
    if (passwordHasInvalidFormat) {
      this.addDomainError(
        new DomainError('Password has invalid format')
      );
    }
  }
}

export { PasswordValidator };
