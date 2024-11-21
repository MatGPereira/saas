import SeparatorBase from "./SeparatorBase.vue";
import SeparatorRoot from "./SeparatorRoot.vue";

export const Separator = {
  Root: SeparatorRoot,
  Base: SeparatorBase,
} as {
  Root: typeof SeparatorRoot,
  Base: typeof SeparatorBase,
};
