import { TemplateVariables } from "../templates/template";
import type { IEmailContent, IEmailService, IEmailTemplate } from "./abstractions/email-service";
import type { ITemplateService } from "./abstractions/template-service";

class EmailService implements IEmailService {

  public constructor(private readonly templateService: ITemplateService) { }

  public async send(emailContent: IEmailContent, emailTemplate: IEmailTemplate): Promise<void> {
    const template: string = await this.templateService.get(emailTemplate.templateName);

    const { action, content, title } = emailContent;
    const formattedTemplate: string = template
      .replace(TemplateVariables.templateTitle, title)
      .replace(TemplateVariables.templateContent, content)
      .replace(TemplateVariables.templateAction, action);

    // TODO: configure provider to send e-mail
  }
}

export { EmailService };
