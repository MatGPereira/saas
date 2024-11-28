import type { IReadOnlyUserRepository } from "@/modules/users/domain/abstractions/repositories/in-memory/user-repository";
import type { IAuthenticateUserWithEmailAndPassword } from "./use-case-abstraction";
import type { IAuthenticateUserWithEmailAndPasswordCommand } from "./use-case-command";
import type { IAuthenticateUserWithEmailAndPasswordResult } from "./use-case-result";
import type { ICryptoService } from "../../services/abstractions/crypto-service";

import { User } from "@/modules/users/domain/entities/user/user";

class AuthenticateUserWithEmailAndPasswordUseCase
  implements IAuthenticateUserWithEmailAndPassword {

  public constructor(
    private readonly cryptoService: ICryptoService,
    private readonly readOnlyUserRepository: IReadOnlyUserRepository
  ) { }

  public async execute({
    email,
    password
  }: IAuthenticateUserWithEmailAndPasswordCommand): Promise<IAuthenticateUserWithEmailAndPasswordResult> {
    const existingUser: User | null = await this.readOnlyUserRepository.findUserByEmail(email);
    if (!existingUser) throw new Error('Invalid credentials!');

    const passwordIsValid: boolean = await this.cryptoService.compare(
      password,
      existingUser.password.value
    );
    if (!passwordIsValid) throw new Error('Invalid credentials!');

    const accessToken: string = await this.cryptoService.generateToken({
      sub: existingUser.id.toString(),
    });

    return { accessToken };
  }
}

export { AuthenticateUserWithEmailAndPasswordUseCase };
