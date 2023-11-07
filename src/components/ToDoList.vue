<script setup lang="ts">
import { ref, onMounted } from "vue";
import Button from "./button/Button.vue";
import VDelete from "./Icons/VDelete.vue";
import VEdit from "./Icons/VEdit.vue";
import Input from "./Input/Input.vue";
import Tags from "./Tags/Tags.vue";
import VSearch from "./Icons/VSearch.vue";
import VCheck from "./Icons/VCheck.vue";
import axios from "axios";

export interface Todo {
  title: string;
  completed: boolean;
  id: number;
}

const bigData = ref<Todo[]>([]);
const totalData = ref<number>(0);
const pageCount = ref<number>(0);
const todos = ref<Todo[]>([]);
const currentPage = ref<number>(1);
const dialogAdd = ref<boolean>(false);
const work = ref<string>("");
const butonContent = ref<string>("Add Work");
const dataPerPage = ref<number>(10);
const dialogUpdate = ref<boolean>(false);
const filterOption = ref("");
const multipleSelection = ref<Todo[]>([]);
const workUpdate = ref<string>();
const currWork = ref<Todo>();
const options = [
  {
    value: "id",
    label: "Sort by ID",
  },
  {
    value: "title",
    label: "Sort by name",
  },
];

const TODO = "todos";

const getTodosFromLocal = () => {
  const dataStorage = window.localStorage.getItem(TODO);
  if (!dataStorage) return "";
  return JSON.parse(dataStorage);
};

const fetchTodos = () => {
  const todos = getTodosFromLocal();

  if (todos) {
    bigData.value = todos;
  } else {
    axios
      .get("https://jsonplaceholder.typicode.com/todos")
      .then((response) => {
        window.localStorage.setItem(TODO, JSON.stringify(response.data));
        bigData.value = response.data;
      })
      .catch((error) => {
        console.error(error);
      });
  }
  updatePagination();
};
onMounted(() => {
  fetchTodos();
});
const updatePagination = () => {
  totalData.value = bigData.value.length;
  pageCount.value = Math.max(1, Math.ceil(totalData.value / dataPerPage.value));
  updateTodos();
};
const updateTodos = () => {
  const startIndex = (currentPage.value - 1) * dataPerPage.value;
  const endIndex = startIndex + dataPerPage.value;
  todos.value = bigData.value.slice(startIndex, endIndex);
};
const saveToLocal = () => {
  window.localStorage.setItem(TODO, JSON.stringify(bigData.value));
};
const submitWork = () => {
  if (work.value) {
    const data = {
      userID: 1,
      id: new Date().valueOf(),
      title: work.value,
      completed: false,
    };
    bigData.value.unshift(data);
  }
  work.value = "";
  saveToLocal();
  updatePagination();
};
const handleConfirmAdd = () => {
  dialogAdd.value = false;
  submitWork();
};

const handleDelete = (id: number) => {
  bigData.value = bigData.value.filter((x) => x.id !== id);
  saveToLocal();
  updatePagination();
};
const handleToggleCompletion = (todo: Todo) => {
  bigData.value = bigData.value.map((x) => {
    if (x.id === todo.id) {
      x.completed = !todo.completed;
    }
    return x;
  });
  saveToLocal();
};
const handleSearch = (search: string) => {
  if (!search) {
    bigData.value = getTodosFromLocal();
  } else {
    bigData.value = bigData.value.filter((x) =>
      x.title.toLowerCase().includes(search.toLowerCase())
    );
  }
  updatePagination();
};

const handleChangeSort = (value: string) => {
  switch (value) {
    case "id":
      bigData.value = sortById(bigData.value);
      updateTodos();
      break;
    case "title":
      bigData.value = sortByTitle(bigData.value);
      updateTodos();
      break;
    default:
      bigData.value = getTodosFromLocal();
      updateTodos();
  }
};

const sortById = (data: Todo[]) => {
  return data.sort((a, b) => a.id - b.id);
};

const sortByTitle = (data: Todo[]) => {
  return data.sort((a, b) => a.title.localeCompare(b.title));
};
const handlePageChange = (page: number) => {
  currentPage.value = page;
  updateTodos();
};

const handleUpdate = (data: Todo) => {
  dialogUpdate.value = true;
  currWork.value = data;
};
const getUpdatedWork = (data: string) => {
  workUpdate.value = data;
};
const handleCancelUpdate = () => {
  dialogUpdate.value = false;
  workUpdate.value = currWork.value?.title;
};
const handleConfirmUpdate = () => {
  dialogUpdate.value = false;
  bigData.value = bigData.value.map((x) => {
    if (x.id === currWork.value?.id) {
      console.log(x.title);
      x.title = workUpdate.value || "";
    }
    return x;
  });
  saveToLocal();
};

const handleSelectionChange = (val: Todo[]) => {
  multipleSelection.value = val;
};

const handleDeleteByCheck = () => {
  bigData.value = bigData.value.filter(
    (x) => !multipleSelection.value.some((selection) => selection.id === x.id)
  );
  saveToLocal();
  updateTodos();
};
const handleChangeAdd = (value: string) => {
  work.value = value;
};
const handleSizeChange = () => {
  updateTodos();
};
</script>

<template>
  <div class="list-table">
    <div class="list-table__top flex flex-col gap-8">
      <div class="search-add flex items-center justify-between">
        <div class="flex gap-4">
          <el-select
            v-model="filterOption"
            clearable
            placeholder="Sort"
            class="h-full"
            :class="{ hidden: multipleSelection.length }"
            @change="handleChangeSort"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <Input
            #prefix
            @handle-change="handleSearch"
            :placeholder="'Search'"
            :work="work"
            :class="{ hidden: multipleSelection.length }"
          >
            <VSearch></VSearch>
          </Input>

          <div class="flex" :class="{ hidden: !multipleSelection.length }">
            <p>{{ multipleSelection.length }} selected</p>
            <VDelete
              class="w-6 h-6 cursor-pointer ml-5"
              @click.prevent="handleDeleteByCheck()"
            ></VDelete>
          </div>
        </div>

        <Button
          :buton-content="butonContent"
          #prefix
          class="h-6"
          @handle-click="dialogAdd = true"
        >
          <img src="../assets/add.svg" alt="" />
        </Button>
        <el-dialog v-model="dialogAdd" title="Add Work" width="30%">
          <Input
            class="w-full"
            @handle-change="handleChangeAdd"
            :work="work"
            :placeholder="'Add work'"
          ></Input>

          <template #footer>
            <span class="dialog-footer">
              <el-button
                class="bg-blue-600"
                type="primary"
                @click="dialogAdd = false"
                >Cancel</el-button
              >
              <el-button
                class="bg-blue-600"
                type="primary"
                @click="handleConfirmAdd"
              >
                Confirm
              </el-button>
            </span>
          </template>
        </el-dialog>
      </div>
    </div>
    <el-table
      class="pt-5 rounded-xl"
      ref="multipleTableRef"
      :data="todos"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column label="ID" property="id" width="150px"> </el-table-column
      >Fsea
      <el-table-column
        property="title"
        label="Work"
        width="450px"
        height="45px"
        show-overflow-tooltip
      />
      <el-table-column label="Status" width="150px">
        <template #default="scope">
          <Tags
            :tag-content="scope.row.completed"
            :tag-stage="scope.row.completed ? 'success' : 'inactive'"
          ></Tags>
        </template>
      </el-table-column>

      <el-table-column label="..." width="150px">
        <template #default="scope">
          <div class="flex gap-5">
            <VDelete
              class="w-6 h-6 cursor-pointer"
              @click.prevent="handleDelete(scope.row.id)"
            ></VDelete>
            <VEdit
              class="w-6 h-6 cursor-pointer"
              @click.prevent="handleUpdate(scope.row)"
            ></VEdit>
            <v-check
              class="w-6 h-6 cursor-pointer"
              :class="{ hidden: scope.row.completed }"
              @click="handleToggleCompletion(scope.row)"
            ></v-check>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div>
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="dataPerPage"
        :page-sizes="[5, 10, 50, 100]"
        layout="sizes, prev, pager, next"
        :total="totalData"
        @current-change="handlePageChange"
        @size-change="handleSizeChange"
        class="justify-center p-5"
      />
    </div>
  </div>
  <el-dialog v-model="dialogUpdate" title="Update Work" width="30%">
    <Input
      class="w-full"
      :work="workUpdate || currWork?.title || ''"
      :placeholder="'Update'"
      @handle-change="getUpdatedWork"
    ></Input>
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
</template>
<!-- asd -->
<style lang="scss">
.list-table {
  background: var(--gray-0, #f7f9fc);
  border-radius: 12px;
  .list-table__top {
    padding: 20px;
    background: #f0f1fa;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
  }
}
</style>
