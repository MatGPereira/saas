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
  subject: string;
  body: ISubject;
}

interface IEmailService {
  send(emailContent: IEmail): Promise<void>;
}

export type { IEmailService, IEmail, ITo, IFrom, ISubject };
