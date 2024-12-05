import { ETemplateReference } from "../../templates/template-reference";

interface IEmailContent {
  title: string;
  content: string;
  action: string;
}

interface IEmailTemplate {
  templateName: ETemplateReference
}

interface IEmailService {
  send(emailContent: IEmailContent, emailTemplate: IEmailTemplate): Promise<void>;
}

export type { IEmailService, IEmailContent, IEmailTemplate };
