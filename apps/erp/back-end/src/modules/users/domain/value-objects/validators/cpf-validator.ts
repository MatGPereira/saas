import { DomainError } from "@/common/domain/errors/domain-error";
import type { TCpfCreate } from "../cpf";
import { AbstractValidator } from "@/common/domain/validators/abstract-validator";

class CpfValidator extends AbstractValidator<TCpfCreate> {

  private static readonly validCpfRegex: RegExp = /^\d{3}\d{3}\d{3}\d{2}$/;

  public override validate({ cpf }: TCpfCreate): void {
    this.validateCpfFormat(cpf);
    this.validateIdentifiersNumbers(cpf);
  }

  private validateCpfFormat(cpf: string): void {
    const cpfIsInvalidFormat: boolean = !CpfValidator.validCpfRegex.test(cpf);
    if (cpfIsInvalidFormat) {
      this.addDomainError(
        new DomainError('Cpf is badly formatted!')
      )
    }
  }

  private validateIdentifiersNumbers(cpf: string): void {
    this.validateFirstIdentifierNumber(cpf);
    this.validateSecondIdentifierNumber(cpf);
  }

  private validateFirstIdentifierNumber(cpf: string): void {
    let soma = 0;

    for (let i = 0; i < 9; i++) {
      soma += parseInt(cpf[i]) * (10 - i);
    }

    const rest = soma % 11;
    const firstCalculatedDigit = rest < 2 ? 0 : 11 - rest;

    const isInvalidFirstDigit: boolean = firstCalculatedDigit !== parseInt(cpf[9]);
    if (isInvalidFirstDigit) {
      this.addDomainError(
        new DomainError('Invalid first identifier digit!')
      )
    }
  }

  private validateSecondIdentifierNumber(cpf: string): void {
    let soma = 0;

    for (let i = 0; i < 10; i++) {
      soma += parseInt(cpf[i]) * (11 - i);
    }

    const rest = soma % 11;
    const secondCalculatedDigit = rest < 2 ? 0 : 11 - rest;

    const isInvalidSecondDigit: boolean = secondCalculatedDigit !== parseInt(cpf[10]);
    if (isInvalidSecondDigit) {
      this.addDomainError(
        new DomainError('Invalid second identifier digit!')
      )
    }
  }
}

export { CpfValidator };
