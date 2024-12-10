import type { IReadOnlyUserRepository } from "@/modules/users/domain/abstractions/repositories/in-memory/user-repository";
import type { IForgotPassword } from "./use-case-abstraction";
import type { IForgotPasswordCommand } from "./use-case-command";
import type { IEmailService } from "../../../../../common/application/services/abstractions/email-service";
import type { ITemplateService } from "@/common/application/services/abstractions/template-service";

import { ETemplateReference } from "@/common/application/templates/template-reference";

class ForgotPasswordUseCase implements IForgotPassword {

  public constructor(
    private readonly readonlyUserRepository: IReadOnlyUserRepository,
    private readonly emailService: IEmailService,
    private readonly templateService: ITemplateService
  ) { }

  public async execute({ email }: IForgotPasswordCommand): Promise<void> {
    const existingUserWithEmail: boolean = await this.readonlyUserRepository.existUserByEmail(
      email
    );
    if (!existingUserWithEmail) return;

    // TODO: add internationalization
    const template: string = await this.templateService.get({
      templateName: ETemplateReference.ForgotPasswordTemplateName,
    });

    // TODO: insert the e-mail function to a queue
    await this.emailService.send({
      to: {
        name: '',
        email: '',
      },
      from: {
        name: '',
        email: '',
      },
      subject: {
        template,
      },
    });
  }
}

export { ForgotPasswordUseCase };
