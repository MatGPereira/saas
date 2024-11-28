import { IAuthenticateUserWithEmailAndPasswordCommand } from "./use-case-command";
import { IAuthenticateUserWithEmailAndPasswordResult } from "./use-case-result";

interface IAuthenticateUserWithEmailAndPassword {
  execute(command: IAuthenticateUserWithEmailAndPasswordCommand): Promise<IAuthenticateUserWithEmailAndPasswordResult>
}

export type { IAuthenticateUserWithEmailAndPassword };
