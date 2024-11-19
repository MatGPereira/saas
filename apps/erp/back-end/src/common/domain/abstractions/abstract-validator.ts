import { DomainError } from "../errors/domain-error";

interface IAbstractValidator<T> {
  validate(props: T): void;
  addDomainError(domainError: DomainError): void;
  cleanDomainError(): void;
  isValid(): boolean;
  isInvalid(): boolean;
}

export type { IAbstractValidator };
