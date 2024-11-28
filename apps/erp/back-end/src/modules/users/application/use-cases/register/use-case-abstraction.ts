import { IRegisterUserUseCaseCommand } from "./use-case-command";
import { IRegisterUserUseCaseResult } from "./use-case-result";

interface IRegisterUserUseCase {
  execute(command: IRegisterUserUseCaseCommand): Promise<IRegisterUserUseCaseResult>;
}

export type { IRegisterUserUseCase };
