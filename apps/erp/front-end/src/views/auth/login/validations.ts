import type { IRule } from '@saas/ui-kit/components/Input/InputRoot.vue';

const emailValidationRules: IRule[] = [
  {
    validationRule(content: string): boolean {
      if (content.length < 8) return true;
      return false;
    },
    customErrorMessage: 'O e-mail é muito curto!',
  },
  {
    validationRule(content: string): boolean {
      if (!content.includes('@')) return true;

      const [email, domain]: string[] = content.split('@');
      if (email.length === 0 || domain.length === 0) return true;
      if (/\.*/.test(domain)) return true;

      return false;
    },
    customErrorMessage: 'E-mail mal formatado!',
  },
];

const passwordValidationRules: IRule[] = [
  {
    validationRule(content: string): boolean {
      console.debug(content);
      return true;
    },
    customErrorMessage: 'Senha muito curta!'
  },
  {
    validationRule(content: string): boolean {
      console.debug(content);
      return true;
    },
    customErrorMessage: 'Senha muito fraca'
  }
];

export { emailValidationRules, passwordValidationRules };
