import type { IEmail, IEmailService } from "./abstractions/email-service";

class EmailService implements IEmailService {

  public async send(email: IEmail): Promise<void> {

    // const { action, content, title } = emailContent;
    // const formattedTemplate: string = template
    //   .replace(TemplateVariables.templateTitle, title)
    //   .replace(TemplateVariables.templateContent, content)
    //   .replace(TemplateVariables.templateAction, action);

    // TODO: configure provider to send e-mail
  }
}

export { EmailService };
