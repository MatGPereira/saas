// import type { IRule } from '@saas/ui-kit/components/Input/InputRoot.vue';

// const emailValidationRules: IRule[] = [
//   {
//     validationRule(content: string): boolean {
//       if (content.length < 8) return false;
//       return true;
//     },
//     customErrorMessage: 'O e-mail é muito curto!',
//   },
//   {
//     validationRule(content: string): boolean {
//       if (!content.includes('@')) return false;

//       const [email, domain]: string[] = content.split('@');
//       if (email.length === 0 || domain.length === 0) return false;

//       return true;
//     },
//     customErrorMessage: 'E-mail mal formatado!',
//   },
// ];

// const passwordValidationRules: IRule[] = [
//   {
//     validationRule(content: string): boolean {

//     },
//     customErrorMessage: ''
//   }
// ];

// export { emailValidationRules, passwordValidationRules };
