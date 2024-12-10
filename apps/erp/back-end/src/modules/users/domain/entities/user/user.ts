import { Entity } from '@/common/domain/entities/entity';
import { Password, Cpf, Telephone, Address, Email } from '../../value-objects';
import { UserValidator } from './user-validator';
import { UniqueEntityId } from '@/common/domain/entities/unique-entity-id';

type TCreateUser = Omit<TUserProps, 'createdAt'>;
type TUserProps = {
	tenantId: UniqueEntityId;
	name: string;
	lastName: string;
	email: Email;
	password: Password;
	salt: string;
	username?: string;
	cpf: Cpf;
	telephones: Telephone[];
	addresses: Address[];
	createdAt: Date;
	updatedAt?: Date;
};

class User extends Entity<TUserProps> {

	public static create(props: TCreateUser) {
		const userValidator: UserValidator = new UserValidator();
		userValidator.validate(props);

		if (userValidator.isInvalid()) {
			throw new Error('Invalid domain entity props');
		}

		return new User(
			{
				tenantId: props.tenantId,
				salt: props.salt,
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

	public get email(): Email {
		return this.props.email;
	}

	private set email(value: string) { }

	public get password(): Password {
		return this.props.password;
	}

	private set password(value: string) { }

	public get name(): string {
		return this.props.name;
	}

	private set name(value: string) { }
}

export { User };
export { TCreateUser, TUserProps };
