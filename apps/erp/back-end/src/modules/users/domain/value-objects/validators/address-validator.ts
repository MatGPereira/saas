import { DomainError } from '@/common/domain/errors/domain-error';
import { ICoordinates } from '../../abstractions/coordinates';
import { EBrazilStates } from '../../enums/brazil-states';
import type { TAddressCreate } from '../address';
import { AbstractValidator } from "@/common/domain/validators/abstract-validator";
import { EAddressValidatorConstants } from './address-validator-constants';

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

  private validateCep(cep: string) {
    const numericCEP = cep.replace(/\D/g, '');

    if (numericCEP.length !== 8) {
      this.addDomainError(
        new DomainError('Cep with invalid length! Should be eight')
      );
    }

    if (parseInt(numericCEP, 10) === 0) {
      this.addDomainError(
        new DomainError('Cep with invalid beginning!')
      );
    }
  }

  private validateGenericAddressValues({
    city,
    neighborhood,
    street
  }: Pick<TAddressCreate, 'city' | 'neighborhood' | 'street' | 'number'>) {
    if (!city) {
      this.addDomainError(
        new DomainError('City name is required')
      );
    }

    const cityNameHasInvalidMaxLength = city?.length > EAddressValidatorConstants.MAX_CITY_NAME_LENGTH;
    if (cityNameHasInvalidMaxLength) {
      this.addDomainError(
        new DomainError('City name too long!')
      );
    }

    const cityNameHasInvalidMinLength = city?.length < EAddressValidatorConstants.MIN_CITY_NAME_LENGTH;
    if (cityNameHasInvalidMinLength) {
      this.addDomainError(
        new DomainError('City name too short!')
      );
    }

    if (!neighborhood) {
      this.addDomainError(
        new DomainError('Neighborhood name is required')
      );
    }

    if (!street) {
      this.addDomainError(
        new DomainError('Neighborhood name is required')
      );
    }
  }

  private validateCoordinates({ latitude, longitude }: ICoordinates) {
    if (latitude < -90 || latitude > 90) {
      this.addDomainError(
        new DomainError('Latitude should be between -90deg and +90deg')
      );
    }

    if (longitude < -180 || longitude > 180) {
      this.addDomainError(
        new DomainError('Longitude should be between -180deg and +180deg')
      );
    }
  }

  private async validateState(state: string) {
    const stateIsNotInEnum = !Object.keys(EBrazilStates).includes(state);
    if (stateIsNotInEnum) {
      this.addDomainError(
        new DomainError('State should not exists!')
      );
    }
  }
}

export { AddressValidator };
