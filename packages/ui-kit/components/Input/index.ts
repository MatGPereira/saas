import InputRoot from './InputRoot.vue';
import InputBase from './InputBase.vue';

export const Input = {
  Root: InputRoot,
  Base: InputBase
} as {
  Root: typeof InputRoot,
  Base: typeof InputBase
};
