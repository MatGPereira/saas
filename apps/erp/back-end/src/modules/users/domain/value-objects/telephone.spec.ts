import { describe, it, expect } from 'vitest';

import { Telephone } from './telephone';
import type { TTelephoneCreate } from './telephone';

describe(`#${Telephone.name}`, _ => {
  it.each([
    [11, '987654321'],
    [21, '999888777'],
    [31, '988776655'],
    [51, '999123456']
  ])(
    'should create a valid telephone with ddd (%s) and number (%s)',
    (ddd: number, number: string) => {
      const validTelephoneProps: TTelephoneCreate = { ddd, number };

      const sut = Telephone.create(validTelephoneProps);

      expect(sut).toEqual(
        expect.objectContaining({
          value: expect.objectContaining({
            ddd: expect.any(Number),
            number: expect.any(String)
          })
        })
      );
      expect(sut.toString()).toBe(`${ddd}${number}`);
    }
  );

  it.each([
    [0, '987654321'],
    [11, ''],
    [11, 'abc123def'],
    [99, '99999999999']
  ])(
    'should not create a telephone with invalid props ddd (%s) or number (%s)',
    (ddd: number, number: string) => {
      const invalidTelephoneProps: TTelephoneCreate = { ddd, number };

      expect(() => Telephone.create(invalidTelephoneProps)).toThrow();
    }
  );
});
