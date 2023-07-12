<script setup lang="ts">
// import { ref } from "vue";
interface Props {
  tagStage: string;
  tagContent: boolean;
}
const props = defineProps<Props>();
</script>
<template>
  <div class="vtags" :class="[props.tagStage]">
    {{ tagContent ? "DONE" : "TO DO" }}
  </div>
</template>

<style lang="scss" scoped>
.vtags {
  display: inline-flex;
  padding: 1px 10px;
  justify-content: center;
  align-items: center;
  gap: 6px;
  /* Caption/c1 */
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 18px;
  letter-spacing: 0.36px;
  &.success {
    border-radius: 10px;
    background: var(--green-0, #e1fcef);
    color: var(--green-500, #14804a);
  }
  &.warning {
    color: var(--orange-500, #aa5b00);

    border-radius: 10px;
    background: var(--orange-0, #fcf2e6);
  }
  &.error {
    color: var(--red-500, #d12953);

    border-radius: 10px;
    background: var(--red-0, #faf0f3);
  }
  &.info {
    color: var(--indigo-500, #4f5aed);

    border-radius: 10px;
    background: var(--indigo-0, #f0f1fa);
  }
  &.active {
    color: #2264e5;

    border-radius: 10px;
    background: var(--indigo-0, #f0f1fa);
  }
  &.inactive {
    color: var(--gray-600, #5a6376);

    border-radius: 10px;
    background: var(--gray-50, #e9edf5);
  }
}
</style>
