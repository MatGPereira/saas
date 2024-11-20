import InputRoot from './InputRoot.vue';
import InputBase from './InputBase.vue';
import InputLabel from './InputLabel.vue';

export const Input = {
  Root: InputRoot,
  Base: InputBase,
  Label: InputLabel,
} as {
  Root: typeof InputRoot,
  Base: typeof InputBase,
  Label: typeof InputLabel,
};
