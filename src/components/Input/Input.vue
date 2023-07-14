<script setup lang="ts">
import { ref, watch } from "vue";

type TargetElement = HTMLInputElement | HTMLTextAreaElement;

interface Emits {
  (event: "handleFocus", FocusEvent: any): void;
  (event: "handleBlur", BlurEvent: any): void;
  (event: "handleChange", ChangeEvent: string): void;
  (event: "handleKeydown", KeyDownEvent: any): void;
  (event: "handleEnter", key: string): void;
}
interface Props {
  work: string;
  placeholder: string;
}
const props = defineProps<Props>();
const work = ref<string>(props.work);
const placeholder = ref<string>(props.placeholder);
const emit = defineEmits<Emits>();
const focused = ref<boolean>(false);
const attrs = ref<string>();

const handleFocus = (event: FocusEvent) => {
  focused.value = true;
  emit("handleFocus", event);
};

const handleBlur = (event: FocusEvent) => {
  focused.value = false;
  emit("handleBlur", event);
};

const handleChange = (event: Event) => {
  emit("handleChange", (event.target as TargetElement).value);
};

const handleKeydown = (event: KeyboardEvent) => {
  emit("handleKeydown", event);
};
watch(props, () => {
  work.value = props.work;
});
</script>

<template>
  <div
    :class="{ vsearch: true, vfocus: focused }"
    class="flex px-3 py-1.5 items-center gap-2 rounded-md"
  >
    <slot name="prefix"></slot>
    <input
      type="text"
      class="vsearch-input"
      v-bind="attrs"
      v-model="work"
      :placeholder="placeholder"
      @focus="handleFocus"
      @blur="handleBlur"
      @change="handleChange"
      @keydown="handleKeydown"
    />
    <slot name="suffix"></slot>
  </div>
</template>

<style lang="scss">
.vsearch {
  width: 320px;
  border: solid 1px #868fa0;
  background: var(--white, #fff);
  box-shadow: 0px 0px 0px 1px rgba(104, 113, 130, 0.16),
    0px 1px 2px 0px rgba(0, 0, 0, 0.06);

  &.vfocus {
    border-radius: 6px;
    background: var(--white, #fff);
    box-shadow: 0px 0px 0px 4px rgba(1, 178, 237, 0.36),
      0px 0px 0px 1px rgba(104, 113, 130, 0.16),
      0px 1px 2px 0px rgba(0, 0, 0, 0.06);
  }

  &:hover {
    border: solid 1px #5d5e61;
  }

  .vsearch-input {
    color: black !important;
    width: 100%;
    border: none;
    color: #a1a9b8;
    outline: none;
  }
}
</style>
