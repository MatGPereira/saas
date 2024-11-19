import { Entity } from '@/common/domain/entities/entity';
import { Password, Cpf, Telephone, Address, Email } from '../../value-objects';
import { UserValidator } from './user-validator';

type TCreateUser = Omit<TUserProps, 'createdAt'>;
type TUserProps = {
	name: string;
	lastName: string;
	email: Email;
	password: Password;
	username?: string;
	cpf: Cpf;
	telephones: Telephone[];
	addresses: Address[];
	createdAt: Date;
	updatedAt?: Date;
};

class User extends Entity<TUserProps> {

	public static create(props: TCreateUser): User {
		const userValidator: UserValidator = new UserValidator();
		userValidator.validate(props);

		if (userValidator.isInvalid()) {
			throw new Error('Invalid domain entity props');
		}

		return new User(
			{
				name: props.name,
				lastName: props.lastName,
				email: props.email,
				password: props.password,
				username: props.username,
				cpf: props.cpf,
				telephones: props.telephones,
				addresses: props.addresses,
				createdAt: new Date(),
			}
		);
	}
}

export { User };
export { TCreateUser, TUserProps };
