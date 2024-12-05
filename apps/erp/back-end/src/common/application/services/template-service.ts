import { readFile } from 'node:fs/promises';

import type { ITemplateService } from "./abstractions/template-service";

import { ETemplateReference } from "../templates/template-reference";

class TemplateService implements ITemplateService {

  private readonly templatesPath: string = './src/common/application/templates';

  public async get(templateName: ETemplateReference): Promise<string> {
    const completeTemplateFile: string = `${this.templatesPath}/${templateName}.html`;
    const template: Buffer = await readFile(completeTemplateFile);

    return template.toString();
  }
}

export { TemplateService };
