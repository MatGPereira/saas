import type { IReadOnlyUserRepository } from "@/modules/users/domain/abstractions/repositories/in-memory/user-repository";
import type { IForgotPassword } from "./use-case-abstraction";
import type { IForgotPasswordCommand } from "./use-case-command";
import type { ITemplateService } from "@/common/application/services/abstractions/template-service";
import type { IEmailService } from "@/common/infrastructure/services/abstraction/email-service";

import { ETemplateReference } from "@/common/application/templates/template-reference";
import { User } from "@/modules/users/domain/entities/user/user";

class ForgotPasswordUseCase implements IForgotPassword {

  public constructor(
    private readonly readonlyUserRepository: IReadOnlyUserRepository,
    private readonly emailService: IEmailService,
    private readonly templateService: ITemplateService
  ) { }

  public async execute({ email }: IForgotPasswordCommand): Promise<void> {
    const existingUserWithEmail: User | null = await this.readonlyUserRepository.findUserByEmail(
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
        name: existingUserWithEmail.name,
        email,
      },
      from: {
        name: 'no-reply',
        email: 'matheusgp.mto@outlook.com',
      },
      subject: 'Email test',
      body: {
        template,
      }
    });
  }
}

export { ForgotPasswordUseCase };
