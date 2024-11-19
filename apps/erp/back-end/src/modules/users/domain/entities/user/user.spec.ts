import { describe, it, expect, beforeEach } from 'vitest';

import { faker } from '@faker-js/faker';
import generator from 'cpf_and_cnpj-generator';

import { TCreateUser, User } from './user';
import { Address, Cpf, Email, Password, Telephone } from '../../value-objects';
import { EBrazilStates } from '../../enums/brazil-states';

describe(`#${User.name}`, _ => {
	let validUserProps: TCreateUser | undefined = undefined;

	// Arrange
	beforeEach(_ => {
		const email: Email = Email.create({ email: faker.internet.email() })
		const password: Password = Password.create({
			password: 'Aa123!@aX'
		});
		const cpf: Cpf = Cpf.create({ cpf: generator.generateCpf() });
		const telephone: Telephone = Telephone.create({
			ddd: faker.number.int({ min: 10, max: 100 }),
			number: `${faker.number.bigInt({ min: 8, max: 9 })}`
		});
		const address: Address = Address.create({
			cep: `${faker.location.zipCode()}`,
			city: faker.location.city(),
			neighborhood: faker.string.alpha(),
			number: faker.location.buildingNumber(),
			state: EBrazilStates.AC,
			street: faker.location.street(),
			coordinates: {
				latitude: faker.location.latitude({ precision: 10 }),
				longitude: faker.location.longitude({ precision: 10 })
			}
		});

		validUserProps = {
			name: faker.string.alpha({ length: { min: 3, max: 50 } }),
			lastName: faker.string.alpha({ length: { min: 3, max: 50 } }),
			addresses: [address],
			cpf,
			email,
			password,
			telephones: [telephone],
			username: faker.string.alpha({ length: { min: 3, max: 16 } }),
		};
	});

	it('should be able to create an (#User) entity', _ => {
		// Act
		const user: User = User.create(validUserProps!);

		// Assert
		expect(user).toEqual(
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
