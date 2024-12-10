import { ETemplateReference } from "../../templates/template-reference";

interface ITemplateInfos {
  templateName: ETemplateReference;
  internationalization?: 'pt-BR' | 'en' | 'es';
}

interface ITemplateService {
  get(templateInfos: ITemplateInfos): Promise<string>;
}

export type { ITemplateService, ITemplateInfos };
