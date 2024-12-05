import type { IReadOnlyUserRepository } from "@/modules/users/domain/abstractions/repositories/in-memory/user-repository";
import type { IForgotPassword } from "./use-case-abstraction";
import type { IForgotPasswordCommand } from "./use-case-command";
import type { IEmailService } from "../../../../../common/application/services/abstractions/email-service";

import { ETemplateReference } from "@/common/application/templates/template-reference";

class ForgotPasswordUseCase implements IForgotPassword {

  public constructor(
    private readonly readonlyUserRepository: IReadOnlyUserRepository,
    private readonly emailService: IEmailService
  ) { }

  public async execute({ email }: IForgotPasswordCommand): Promise<void> {
    const existingUserWithEmail: boolean = await this.readonlyUserRepository.existUserByEmail(
      email
    );
    if (!existingUserWithEmail) return;

    // TODO: think a better way to put messages
    const title: string = '';
    const content: string = '';
    const action: string = '';

    // TODO: put e-mail to a queue to send email async
    await this.emailService.send(
      {
        action,
        content,
        title
      },
      {
        templateName: ETemplateReference.ForgotPasswordTemplateName
      }
    );
  }
}

export { ForgotPasswordUseCase };
