import { UniqueEntityId } from "@/common/domain/entities/unique-entity-id";
import { User } from "../../../entities/user/user";

interface ICommandUserRepository {
  createUser(user: User): Promise<UniqueEntityId>;
}

interface IReadOnlyUserRepository {
  existUserByEmail(email: string): Promise<boolean>;
}

export type { ICommandUserRepository, IReadOnlyUserRepository };
