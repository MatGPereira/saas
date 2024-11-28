import { describe, it, expect } from 'vitest';

import { UniqueEntityId } from './unique-entity-id';

describe(`#${UniqueEntityId.name}`, _ => {
	it('should generate an object with an value key', _ => {
		// Arrange | Act
		const sut = new UniqueEntityId();

		// Assert
		expect(sut).toEqual(
			expect.objectContaining({ value: expect.any(String) })
		);
	});

	it('should generate an object with given id', _ => {
		// Arrange
		const givenId = 'id-123';

		// Act
		const sut = new UniqueEntityId(givenId);
		const uniqueEntityIdValue = sut.toString();

		// Assert
		expect(uniqueEntityIdValue).toBe(givenId);
	});

	it('should generate a random uuid when it is not to pass any value', _ => {
		// Arrange
		const uuidv4Regex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

		// Act
		const sut = new UniqueEntityId();

		// Assert
		const isValidGeneratedUuid = uuidv4Regex.test(sut.toString());
		expect(isValidGeneratedUuid).toBe(true);
	});

	it('should return the id value when use (@toString) method', _ => {
		// Arrange
		const generatedUuidLength = 36;
		const sut = new UniqueEntityId();

		// Act
		const uniqueEntityIdValue = sut.toString();

		// Assert
		expect(uniqueEntityIdValue).toBeTruthy();
		expect(uniqueEntityIdValue).toStrictEqual(expect.any(String));
		expect(uniqueEntityIdValue).toHaveLength(generatedUuidLength);
	});
});
