import type { TCreateUser } from './user';

import { DomainError } from '@/common/domain/errors/domain-error';

import { AbstractValidator } from '@/common/domain/validators/abstract-validator';
import { EUserValidator } from './user-validator-constants';

class UserValidator extends AbstractValidator<TCreateUser> {

  private static readonly usernameValidRegex = /^[a-zA-Z0-9._]+$/;
  private static readonly nameAndLastNameValidRegex = /^[A-Za-zÀ-ú\s]+$/;

  public override validate({
    name,
    lastName,
    username,
  }: Pick<TCreateUser, 'name' | 'lastName' | 'username'>): void {
    this
      .validateName({ name })
      .validateLastName({ lastName })
      .validateUsername({ username });
  }

  private validateName({ name }: Pick<TCreateUser, 'name'>): this {
    if (!name) {
      this.addDomainError(
        new DomainError('Name is required')
      )
    }

    const isInvalidName: boolean = !UserValidator.nameAndLastNameValidRegex.test(name);
    if (isInvalidName) {
      this.addDomainError(
        new DomainError('Name cannot contain special characters')
      )
    }

    const nameHasInvalidMaxLength = name.length > EUserValidator.MAX_NAME_LENGTH;
    if (nameHasInvalidMaxLength) {
      this.addDomainError(
        new DomainError('Name is too long!')
      )
    }

    const nameHasInvalidMinLength = name.length < EUserValidator.MIN_NAME_LENGTH;
    if (nameHasInvalidMinLength) {
      this.addDomainError(
        new DomainError('Name is too short!')
      )
    }

    return this;
  }

  private validateLastName({ lastName }: Pick<TCreateUser, 'lastName'>): this {
    if (!lastName) {
      this.addDomainError(
        new DomainError('Last name is required!')
      )
    }

    const isInvalidLastName: boolean = !UserValidator.nameAndLastNameValidRegex.test(lastName);
    if (isInvalidLastName) {
      this.addDomainError(
        new DomainError('Last name cannot contain special characters')
      )
    }

    const nameHasInvalidMaxLength = lastName.length > EUserValidator.MAX_LAST_NAME_LENGTH;
    if (nameHasInvalidMaxLength) {
      this.addDomainError(
        new DomainError('Last name is too long!')
      )
    }

    const nameHasInvalidMinLength = lastName.length < EUserValidator.MIN_LAST_NAME_LENGTH;
    if (nameHasInvalidMinLength) {
      this.addDomainError(
        new DomainError('Last name is too short!')
      )
    }

    return this;
  }

  private validateUsername({ username }: Pick<TCreateUser, 'username'>): this {
    if (!username) return this;

    const usernameIsTooShort: boolean = username.length < EUserValidator.MIN_USERNAME_LENGTH;
    if (usernameIsTooShort) {
      this.addDomainError(
        new DomainError('Username is too short!')
      )
    }

    const usernameIsTooLong: boolean = username.length > EUserValidator.MAX_USERNAME_LENGTH;
    if (usernameIsTooLong) {
      this.addDomainError(
        new DomainError('Username is too long!')
      )
    }

    const usernameIsInvalidFormat: boolean = !UserValidator.usernameValidRegex.test(username);
    if (usernameIsInvalidFormat) {
      this.addDomainError(
        new DomainError('Username has invalid format!')
      )
    }

    return this;
  }
}

export { UserValidator };
