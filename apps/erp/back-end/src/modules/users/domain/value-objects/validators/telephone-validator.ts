import type { TTelephoneCreate } from '../telephone';
import { AbstractValidator } from "@/common/domain/validators/abstract-validator";

class TelephoneValidator extends AbstractValidator<TTelephoneCreate> {

  public override validate({ ddd, number }: TTelephoneCreate): void {
    this.validateNumber(number);
    this.validateDdd(ddd);
  }

  private validateNumber(number: string): void {

  }

  private validateDdd(ddd: number): void { }
}

export { TelephoneValidator };
