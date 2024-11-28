import { IRegisterUserUseCaseCommand } from "./use-case-command";
import { IRegisterUserUseCaseResult } from "./use-case-result";

interface IRegisterUseCase {
  execute(command: IRegisterUserUseCaseCommand): Promise<IRegisterUserUseCaseResult>;
}

export type { IRegisterUseCase };
