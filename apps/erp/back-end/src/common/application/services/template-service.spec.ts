import { describe, it, beforeEach, expect } from 'vitest';

import { TemplateService } from './template-service';
import { ITemplateService } from './abstractions/template-service';
import { ETemplateReference } from '../templates/template-reference';

describe(`#${TemplateService.name}`, _ => {
  let templateService: ITemplateService | undefined = undefined;

  // Arrange
  beforeEach(() => {
    templateService = new TemplateService();
  });

  it('should be able to get a template by your name', async () => {
    // Arrange
    const templateName: ETemplateReference = ETemplateReference.ForgotPasswordTemplateName;

    // Action
    const template: string = await templateService!.get(templateName);

    // Assert
    expect(template).toBeDefined();
    expect(template).toEqual(expect.any(String));
  });

  it('should not be able to get a template with wrong name', async () => {
    // Arrange
    const templateName: ETemplateReference
      = <ETemplateReference>'invalid-template-name';

    // Action | Assert
    await expect(() => templateService!.get(templateName)).rejects.toThrow();
  });
});
