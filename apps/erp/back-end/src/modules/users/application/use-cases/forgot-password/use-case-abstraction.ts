import type { IForgotPasswordCommand } from "./use-case-command";

interface IForgotPassword {
  execute(command: IForgotPasswordCommand): Promise<void>;
}

export type { IForgotPassword };
