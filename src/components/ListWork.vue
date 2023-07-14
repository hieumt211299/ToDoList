<!-- <script setup lang="ts">
import { Todo } from "./ToDoList.vue";
import Tags from "./Tags/Tags.vue";
// import Button from "./button/Button.vue";s
import { ref } from "vue";
import UpdateBar from "./Input/UpdateBar.vue";
import VDelete from "./Icons/VDelete.vue";
import VEdit from "./Icons/VEdit.vue";
import VCheck from "./Icons/VCheck.vue";

interface Props {
  todo: Todo;
  index: number;
}
const props = defineProps<Props>();
interface Emits {
  (even: "handleDelete", id: number): void;
  (even: "handleUpdate", todo: Todo): void;
  (even: "handleCheck", todo: Todo): void;
  (even: "testSelect", index: number): void;
}
const emit = defineEmits<Emits>();
const dialogUpdate = ref<boolean>(false);
const work = ref<string>("");
const handleDelete = () => {
  emit("handleDelete", props.todo.id);
};
const handleUpdate = () => {
  dialogUpdate.value = true;
};
const handleCheck = () => {
  emit("handleCheck", props.todo);
};
const getUpdate = (event: any, data: string) => {
  event;
  work.value = data;
};
const handleConfirmUpdate = () => {
  dialogUpdate.value = false;
  props.todo.title = work.value;
  emit("handleUpdate", props.todo);
};
const handleCancelUpdate = () => {
  dialogUpdate.value = false;
  work.value = "";
};
const handleCheckBox = () => {
  // console.log(props.todo);
  emit("testSelect", props.todo.id);
};
</script>
<template>
  <div
    class="flex flex-col gap-8 px-5 py-3"
    :class="index % 2 != 0 ? 'odd' : 'even'"
  >
    <div class="column-header grid grid-cols-7 gap-4 items-center text-left">
      <el-checkbox @change="handleCheckBox"></el-checkbox>
      <div class="w-32">{{ props.todo.id || "" }}</div>
      <div class="col-span-3 max-w-md w-96 h-12 flex items-center">
        {{ props.todo.title || "" }}
      </div>
      <div>
        <Tags
          :tag-content="props.todo.completed"
          :tag-stage="props.todo.completed ? 'success' : 'inactive'"
        ></Tags>
      </div>
      <div class="flex gap-5">
        <VDelete class="w-6 h-6 cursor-pointer" @click="handleDelete"></VDelete>

        <VEdit class="w-6 h-6 cursor-pointer" @click="handleUpdate"></VEdit>
        <el-dialog v-model="dialogUpdate" title="Update Work" width="30%">
          <UpdateBar
            @handle-change="getUpdate"
            class="w-full"
            :stage="props.todo.completed"
            :test="props.todo.title"
          ></UpdateBar>
          <template #footer>
            <span class="dialog-footer">
              <el-button
                class="bg-blue-600"
                type="primary"
                @click="handleCancelUpdate"
                >Cancel</el-button
              >
              <el-button
                class="bg-blue-600"
                type="primary"
                @click="handleConfirmUpdate"
              >
                Confirm
              </el-button>
            </span>
          </template>
        </el-dialog>

        <v-check
          class="w-6 h-6 cursor-pointer"
          :class="{ hidden: props.todo.completed }"
          @click="handleCheck"
        ></v-check>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.odd {
  background: #f0f1fa;
}
.even {
  background: #f9fafc;
}
</style> -->
