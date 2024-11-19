import type { IAbstractValidator } from '../abstractions/abstract-validator';
import { DomainError } from '../errors/domain-error';

type TSetValidator<TValidatorProps> = {
  validator: AbstractValidator<TValidatorProps>;
  value: TValidatorProps;
}

abstract class AbstractValidator<T> implements IAbstractValidator<T> {

  protected _domainErrors: DomainError[] = [];

  public get domainErrors(): DomainError[] {
    return this._domainErrors;
  }

  public abstract validate(entityProps: T): void;

  public cleanDomainError(): void {
    this._domainErrors = [];
  }

  public addDomainError(domainError: DomainError): void {
    this.domainErrors.push(domainError);
  }

  public isValid(): boolean {
    return this.domainErrors.length === 0;
  }

  public isInvalid(): boolean {
    return !this.isValid();
  }

  protected setCustomValidator<TValidatorProps>({
    validator,
    value
  }: TSetValidator<TValidatorProps>) {
    validator.validate(value);
  }
}

export { AbstractValidator };
