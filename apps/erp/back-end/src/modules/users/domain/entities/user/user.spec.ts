import { describe, it, expect, beforeEach } from 'vitest';

import { TCreateUser, User } from './user';
import { generateValidUserProps } from '@/common/tests/helpers/generate-valid-user-props';

describe(`#${User.name}`, _ => {
	let validUserProps: TCreateUser | undefined = undefined;

	// Arrange
	beforeEach(_ => {
		validUserProps = generateValidUserProps();
	});

	it('should be able to create an (#User) entity', _ => {
		// Act
		const sut: User = User.create(validUserProps!);

		// Assert
		expect(sut).toEqual(
			expect.objectContaining({
				_id: expect.objectContaining({
					value: expect.any(String),
				}),
				props: expect.objectContaining({
					name: expect.any(String),
					lastName: expect.any(String),
					email: expect.objectContaining({
						_value: expect.any(String)
					}),
					password: expect.objectContaining({
						_value: expect.any(String)
					}),
					username: expect.any(String),
					cpf: expect.objectContaining({}),
					telephones: expect.objectContaining({}),
					addresses: expect.objectContaining({}),
					createdAt: expect.any(Date),
				})
			})
		);
	});

	it('should not be able to create an (#User) entity when props is invalid', _ => {
		// Arrange
		const userPropsWithInvalidName: TCreateUser = {
			...validUserProps!,
			name: ''
		};
		const userPropsWithInvalidLastName: TCreateUser = {
			...validUserProps!,
			lastName: ''
		};

		// Act | Assert
		expect(() => User.create(userPropsWithInvalidName)).toThrow()
		expect(() => User.create(userPropsWithInvalidLastName)).toThrow();
	});
});
