import { ETemplateReference } from "../../templates/template-reference";

interface ITemplateService {
  get(templateName: ETemplateReference): Promise<string>;
}

export type { ITemplateService };
