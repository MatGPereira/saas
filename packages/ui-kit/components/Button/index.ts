import ButtonRoot from "./ButtonRoot.vue";
import ButtonBase from "./ButtonBase.vue";

export const Button = {
  Root: ButtonRoot,
  Base: ButtonBase,
} as {
  Root: typeof ButtonRoot,
  Base: typeof ButtonBase,
}
