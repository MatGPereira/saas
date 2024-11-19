import { describe, it, expect, beforeEach } from 'vitest';

import { MockSampleEntity } from './mocks/mock-sample-entity';

import { Entity } from './entity';

describe(`#${Entity.name}`, _ => {
	let mockSampleEntity: Entity<string> | undefined = undefined;

	// Arrange
	beforeEach(() => {
		mockSampleEntity = MockSampleEntity.create('any-text');
	});

	it('should contains an id with the given type', _ => {
		// Act
		const entityInstanceId = (<MockSampleEntity>mockSampleEntity!).getId();

		// Assert
		expect(entityInstanceId.toString()).toEqual(
			expect.any(String)
		);
	});
});
