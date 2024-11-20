import { describe, it, expect, beforeEach } from 'vitest';

import generator from 'cpf_and_cnpj-generator';

import type { TCpfCreate } from './cpf';
import { Cpf } from './cpf';

describe(`#${Cpf.name}`, () => {
  let validCpfProps: TCpfCreate | undefined = undefined;

  // Arrange
  beforeEach(_ => {
    validCpfProps = {
      cpf: generator.generateCpf(),
    };
  })

  it(`should be able to create an (#${Cpf.name}) value object`, _ => {
    // Act
    const cpf: Cpf = Cpf.create(validCpfProps!);

    // Assert
    expect(cpf).toEqual(
      expect.objectContaining({
        _value: expect.any(String),
      })
    );
  });

  it('should fail when the first identifier digit is invalid', () => {
    // Arrange
    const validCpf: string = validCpfProps!.cpf;
    const invalidFirstCpfDigit = validCpf.substring(0, 9) + `${+validCpf[9] + 1}` + validCpf[10];
    const invalidSecondCpfDigit = validCpf.substring(0, 10) + `${+validCpf[10] + 1}`;

    const cpfPropsWithInvalidFirstDigit: TCpfCreate = {
      ...validCpfProps!,
      cpf: invalidFirstCpfDigit,
    };
    const cpfPropsWithInvalidSecondDigit: TCpfCreate = {
      ...validCpfProps!,
      cpf: invalidSecondCpfDigit,
    };

    // Act | Assert
    expect(() => Cpf.create(cpfPropsWithInvalidFirstDigit)).toThrow();
    expect(() => Cpf.create(cpfPropsWithInvalidSecondDigit)).toThrow();
  });
});
