import { ICoordinates } from '../../abstractions/coordinates';
import { EBrazilStates } from '../../enums/brazil-states';
import type { TAddressCreate } from '../address';
import { AbstractValidator } from "@/common/domain/validators/abstract-validator";

class AddressValidator extends AbstractValidator<TAddressCreate> {

  public override validate({
    cep,
    city,
    neighborhood,
    number,
    state,
    street,
    coordinates
  }: TAddressCreate): void {
    this.validateCep(cep);
    this.validateGenericAddressValues({ city, neighborhood, street, number });

    const hasCoordinates = coordinates?.latitude && coordinates?.longitude;
    if (hasCoordinates) {
      this.validateCoordinates({
        latitude: coordinates?.latitude,
        longitude: coordinates?.longitude
      })
    }

    this.validateState(state);
  }

  private validateCep(cep: string) { }

  private validateGenericAddressValues({
    city,
    neighborhood,
    street
  }: Pick<TAddressCreate, 'city' | 'neighborhood' | 'street' | 'number'>) { }

  private validateCoordinates({ latitude, longitude }: ICoordinates) { }

  private async validateState(state: EBrazilStates) { }
}

export { AddressValidator };
