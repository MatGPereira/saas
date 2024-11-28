import { UniqueEntityId } from "@/common/domain/entities/unique-entity-id";
import { User } from "../../../entities/user/user";

interface ICommandUserRepository {
  createUser(user: User): Promise<UniqueEntityId>;
}

interface IReadOnlyUserRepository {
  existUserByEmail(email: string): Promise<boolean>;
  findUserByEmail(email: string): Promise<User | null>;
}

export type { ICommandUserRepository, IReadOnlyUserRepository };
