import { describe, it, expect } from 'vitest';

import { faker } from '@faker-js/faker';

import { UserValidator } from './user-validator';
import { DomainError } from '@/common/domain/errors/domain-error';

describe(`#${UserValidator.name}`, _ => {
	it.each([
		[faker.string.alpha({ length: 0 }), 'Name is required'],
		[faker.string.alpha({ length: { min: 1, max: 2 } }), 'Name is too short!'],
		[faker.string.alpha({ length: { min: 50, max: 100 } }), 'Name is too long!'],
		[faker.string.sample({ min: 3, max: 50 }), 'Name cannot contain special characters'],
	])(
		'should throw an error for name (%s) with invalid value (%s)',
		(invalidName: string, errorMessage: string) => {
			// Arrange
			const userValidator = new UserValidator();

			// Act
			userValidator!.validate({
				name: invalidName,
				lastName: faker.string.alpha({ length: { min: 3, max: 50 } }),
				username: faker.string.alpha({ length: { min: 3, max: 16 } }),
			});

			// Assert
			expect(userValidator!.isInvalid).toBeTruthy();

			const errors: DomainError[] = userValidator!.domainErrors;
			expect(errors[0].errorMessage).toEqual(errorMessage);
		}
	);

	it.each([
		[faker.string.alpha({ length: 0 }), 'Last name is required!'],
		[faker.string.alpha({ length: { min: 1, max: 2 } }), 'Last name is too short!'],
		[faker.string.alpha({ length: { min: 51, max: 100 } }), 'Last name is too long!'],
		[faker.string.sample({ min: 3, max: 50 }), 'Last name cannot contain special characters'],
	])(
		'should throw an error for last name (%s) with invalid value (%s)',
		(invalidLastName: string, errorMessage: string) => {
			// Arrange
			const userValidator = new UserValidator();

			// Act
			userValidator!.validate({
				name: faker.string.alpha({ length: { min: 3, max: 50 } }),
				lastName: invalidLastName,
				username: faker.string.alpha({ length: { min: 3, max: 16 } }),
			});

			// Assert
			expect(userValidator!.isInvalid).toBeTruthy();

			const errors: DomainError[] = userValidator!.domainErrors;
			expect(errors[0].errorMessage).toEqual(errorMessage);
		}
	);

	it.each([
		[faker.string.sample({ min: 1, max: 2 }), 'Username is too short!'],
		[faker.string.sample({ min: 17, max: 50 }), 'Username is too long!'],
		[`${faker.string.sample({ min: 3, max: 15 })}!`, 'Username has invalid format!']
	])(
		'should throw an error for username (%s) with invalid value (%s)',
		(username: string, errorMessage: string) => {
			// Arrange
			const userValidator = new UserValidator();

			// Act
			userValidator!.validate({
				name: faker.string.alpha({ length: { min: 3, max: 50 } }),
				lastName: faker.string.alpha({ length: { min: 3, max: 16 } }),
				username,
			});

			// Assert
			expect(userValidator!.isInvalid).toBeTruthy();

			const errors: DomainError[] = userValidator!.domainErrors;
			expect(errors[0].errorMessage).toEqual(errorMessage);
		}
	);
});
