import { expect, it, describe } from 'vitest';

import { generateValidDdds } from './generate-valid-ddds';

describe(`#${generateValidDdds.name}`, _ => {
  it('should be able to generate valid ddd array', _ => {
    // Arrange | Act
    const validDddArray: string[] = generateValidDdds();

    // Assert
    expect(validDddArray).toHaveLength(67);
    validDddArray.forEach(ddd => {
      expect(ddd).toBeDefined();
      expect(ddd).toEqual(expect.any(String));
    });
  });
});
