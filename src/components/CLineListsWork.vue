<script setup lang="ts">
import { ref, defineProps, defineEmits } from "vue";

const props = defineProps({
  big: Object,
  index: Number,
});
let done = ref<boolean>(props.big?.status);

const emit = defineEmits([
  "deteleWork",
  "updateWork",
  "finishWork",
  "statusTest",
]);
function handleDelete() {
  emit("deteleWork",  props.big?.workT);
}
function handleUpdate() {
  emit("updateWork", props.big?.status, props.big?.workT, props.big?.id);
}
function handleFinish() {
  done.value = !done.value;
  emit("statusTest",  done.value, props.big?.id, props.index);
}
</script>
<template>
  <div class="container">
    <div class="lists" :class="{ finish: props.big?.status }">
      <div class="list">{{ props.big?.workT }}</div>
      <div class="buttons">
        <button class="button" @click="handleDelete">
          <img src="../assets/trash.png" alt="" />
        </button>
        <button class="button" @click="handleUpdate">
          <img src="../assets/changes.png" alt="" />
        </button>
        <button class="button" @click="handleFinish">
          <img src="../assets/check.png" alt="" />
        </button>
      </div>
    </div>
  </div>
</template>
<style scoped>
.finish .list {
  text-decoration: line-through;
}
.container {
  width: 500px;
}

.button {
  background-color: #8052ec;
  color: #ffffff;
  height: 100%;
  width: 40px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  outline: none;
  height: 35px;
  width: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.button img {
  max-height: 100%;
}

.lists {
  background-color: #ffffff;
  height: 50px;
  padding: 5px 10px;
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 2px solid #d1d3d4;
  cursor: pointer;
  border-radius: 15px;
  color: black !important;
}
.list{
  overflow: auto;
  white-space: nowrap;
}
.list::-webkit-scrollbar{
  height: 3px;
}
.list::-webkit-scrollbar-track {
  background-color: #f1f1f1;
}

.list::-webkit-scrollbar-thumb {
  background-color: #888;
  height: 10px;
}
.list::-webkit-scrollbar-thumb:hover {
  background-color: #555;
}

h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.lists {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.buttons {
  display: flex;
  gap: 10px;
}

form {
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;
  margin: 25px;
}
</style>
