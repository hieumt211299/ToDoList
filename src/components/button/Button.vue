<script setup lang="ts">
// import { ref } from "vue";

interface Emits {
  (event: "handleClick"): void;
}

const emit = defineEmits<Emits>();

const handleClick = () => {
  console.log("test");
  emit("handleClick");
};
</script>

<template>
  <el-button type="primary" class="vbutton" @click="handleClick">
    <!-- <img src="/src/assets/add.svg" alt="" /> -->
    <slot></slot>
    <span class="vbutton-text">Button</span>
  </el-button>
</template>
<style lang="scss" scoped>
.vbutton {
  display: flex;
  gap: 8px;
  padding: 6px 12px;
  align-items: center;
  background-color: #2264e5;
  border: none;
  box-sizing: content-box;
  height: 20px;
  width: 71px;
  box-shadow: 0px 2px 5px 0px rgba(34, 100, 229, 0.12), 0px 0px 0px 1px #2264e5,
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 0px 0px #4b85fa inset;
  &:hover {
    background-color: #1354d4;
    box-shadow: 0px 4px 10px -2px rgba(19, 84, 212, 0.24),
      0px 0px 0px 1px #1354d4, 0px 1px 1px 0px rgba(0, 0, 0, 0.14),
      0px 1px 0px 0px #4b85fa inset;
  }
  &:focus {
    box-shadow: 0px 2px 5px 0px rgba(34, 100, 229, 0.12),
      0px 0px 0px 4px rgba(1, 178, 237, 0.36), 0px 0px 0px 1px #2264e5,
      0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 0px 0px #4b85fa inset;
  }
  img {
    padding: 2px;
  }
  .vbutton-text {
    color: var(--white, #fff);
    /* Button/default */
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px;
    letter-spacing: 0.28px;
  }
}
</style>
