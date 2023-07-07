<script setup lang="ts">
import { ref } from "vue";

interface Emits {
  (event: "handleFocus", FocusEvent: any): void;
  (event: "handleBlur", BlurEvent: any): void;
  (event: "handleChange", ChangeEvent: any): void;
  (event: "handleKeydown", key: string): void;
}

interface Attrs {
  class: string;
}
const search = ref<string>("");
const placeholder = ref<string>("Search...");
const emit = defineEmits<Emits>();
const focused = ref<boolean>(false);
const attrs = ref<Attrs>();

const handleFocus = (event: FocusEvent) => {
  focused.value = true;
  emit("handleFocus", event);
};

const handleBlur = (event: FocusEvent) => {
  focused.value = false;
  emit("handleBlur", event);
};

const handleChange = (event: Event) => {
  console.log("handleChange", event);
  emit("handleChange", event);
};

const handleKeydown = (evt: KeyboardEvent) => {
  console.log("handleKeydown", evt.key);
  emit("handleKeydown", evt.key);
};
</script>

<template>
  <div :class="{ vsearch: true, vfocus: focused }">
    <slot name="prefix"></slot>
    <input
      type="text"
      class="vsearch-input"
      v-bind="attrs"
      v-model="search"
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
  display: flex;
  width: 320px;
  padding: 6px 12px;
  align-items: center;
  height: 20px;
  gap: 8px;
  border-radius: 6px;
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
