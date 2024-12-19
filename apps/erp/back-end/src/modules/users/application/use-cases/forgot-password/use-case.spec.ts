import type { MockInstance } from 'vitest';
import { beforeEach, describe, it, expect, vi, afterAll } from 'vitest';

import type { ITemplateService } from '@/common/application/services/abstractions/template-service';
import type { IEmail, IEmailService } from '@/common/infrastructure/services/abstraction/email-service';
import type { IForgotPassword } from './use-case-abstraction';

import { InMemoryUserRepository } from '@/modules/users/infrastructure/repositories/in-memory/user-repository';
import { EmailService } from '@/common/infrastructure/services/email-service';
import { TemplateService } from '@/common/application/services/template-service';
import { ForgotPasswordUseCase } from './use-case';
import { TCreateUser, User } from '@/modules/users/domain/entities/user/user';
import { generateValidUserProps } from '@/helpers/generate-valid-user-props';
import { Email } from '@/modules/users/domain/value-objects';

describe(`#${ForgotPasswordUseCase.name}`, _ => {
  let readonlyUserRepository: InMemoryUserRepository | undefined = undefined;
  let emailService: IEmailService | undefined = undefined;
  let templateService: ITemplateService | undefined = undefined;
  let sut: IForgotPassword | undefined = undefined;
  let sendEmailSpy: MockInstance<(emailContent: IEmail) => Promise<void>> | undefined = undefined;

  // Arrange
  beforeEach(_ => {
    readonlyUserRepository = new InMemoryUserRepository();
    emailService = new EmailService();
    templateService = new TemplateService();
    sut = new ForgotPasswordUseCase(
      readonlyUserRepository,
      emailService,
      templateService
    );

    sendEmailSpy = vi.spyOn(emailService!, 'send').mockResolvedValue();
  });

  afterAll(_ => {
    vi.clearAllMocks();
  });

  it(
    'should be able to send an confirmation e-mail when recovery password is requested',
    async () => {
      // Arrange
      let validUserProps: TCreateUser = generateValidUserProps();
      validUserProps = {
        ...validUserProps,
        email: Email.create({ email: 'matheusg.pereira89@outlook.com' })
      }
      const user: User = User.create(validUserProps);
      readonlyUserRepository!.db.push(user);

      // Act | Assert
      await expect(
        sut!.execute({
          email: 'matheusg.pereira89@outlook.com'
        })
      ).resolves.not.toThrow();
      expect(sendEmailSpy).toHaveBeenCalledOnce();
    }
  );

  it('should be able to return "ok" when an invalid email is given', async () => {
    // Arrange
    const validUserProps: TCreateUser = generateValidUserProps();
    const user: User = User.create(validUserProps);
    readonlyUserRepository!.db.push(user);

    // Act | Assert
    await expect(
      sut!.execute({
        email: 'matheusg.pereira89@outlook.com'
      })
    ).resolves.not.toThrow();
    expect(sendEmailSpy).not.toHaveBeenCalledOnce();
  });
});
