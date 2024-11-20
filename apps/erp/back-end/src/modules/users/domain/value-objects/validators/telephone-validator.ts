import type { TTelephoneCreate } from '../telephone';
import { AbstractValidator } from "@/common/domain/validators/abstract-validator";
import { EBrazilDdd } from './telephone-validator-constants';
import { DomainError } from '@/common/domain/errors/domain-error';

class TelephoneValidator extends AbstractValidator<TTelephoneCreate> {

  private static readonly validNumberRegex: RegExp = /^[6-9]\d{7,8}$/;

  public override validate({ ddd, number }: TTelephoneCreate): void {
    this.validateNumber(number);
    this.validateDdd(ddd);
  }

  private validateNumber(number: string): void {
    const isInvalidTelephoneNumber: boolean = !TelephoneValidator.validNumberRegex.test(number);
    if (isInvalidTelephoneNumber) {
      this.addDomainError(
        new DomainError('Invalid telephone number format!')
      )
    }
  }

  private validateDdd(ddd: number): void {
    const isInvalidDdd: boolean = !Object.keys(EBrazilDdd).includes(`${ddd}`);
    if (isInvalidDdd) {
      this.addDomainError(
        new DomainError('Invalid DDD for Brazil country!')
      )
    }
  }
}

export { TelephoneValidator };
