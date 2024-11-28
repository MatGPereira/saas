import type { ICommandUserRepository, IReadOnlyUserRepository } from "@/modules/users/domain/abstractions/repositories/in-memory/user-repository";

import { User } from "@/modules/users/domain/entities/user/user";
import { UniqueEntityId } from "@/common/domain/entities/unique-entity-id";

class InMemoryUserRepository
  implements ICommandUserRepository, IReadOnlyUserRepository {

  private _db: User[] = [];

  public async createUser(user: User): Promise<UniqueEntityId> {
    this._db.push(user);

    return new UniqueEntityId(`${user.id}`);
  }

  public async existUserByEmail(email: string): Promise<boolean> {
    const userExists: User | undefined = this._db.find(
      user => email === user.email.value
    );

    if (userExists) return true;

    return false;
  }

  public get db(): User[] {
    return this._db;
  }

  public set db(value: User) {
    this._db.push(value);
  }
}

export { InMemoryUserRepository };
