import { readFile } from 'node:fs/promises';

import type { ITemplateInfos, ITemplateService } from "./abstractions/template-service";

import { ETemplateReference } from "../templates/template-reference";

class TemplateService implements ITemplateService {

  private readonly templatesPath: string = './src/common/application/templates';

  public async get(templateInfos: ITemplateInfos): Promise<string> {
    const { templateName, internationalization = 'pt-BR' } = templateInfos;
    const completeTemplateFile: string = `${this.templatesPath}/${internationalization}/${templateName}.html`;
    const template: Buffer = await readFile(completeTemplateFile);

    return template.toString();
  }
}

export { TemplateService };
