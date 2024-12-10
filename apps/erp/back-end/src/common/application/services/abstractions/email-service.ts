import { ETemplateReference } from "../../templates/template-reference";

interface ITo {
  name: string;
  email: string;
}

interface IFrom {
  name: string;
  email: string;
}

interface ISubject {
  template: string;
}

interface IEmail {
  to: ITo;
  from: IFrom;
  subject: ISubject;
}

interface IEmailService {
  send(emailContent: IEmail): Promise<void>;
}

export type { IEmailService, IEmail, ITo, IFrom, ISubject };
