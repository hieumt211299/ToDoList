<script setup lang="ts">
import { ref, onBeforeMount, watch } from "vue";
import SearchBar from "./Input/SearchBar.vue";
import Button from "./button/Button.vue";
// import ListWork from "./ListWork.vue";
import AddBar from "./Input/AddBar.vue";
import VDelete from "./Icons/VDelete.vue";
import VEdit from "./Icons/VEdit.vue";
import VCheck from "./Icons/VCheck.vue";

import UpdateBar from "./Input/UpdateBar.vue";

import Tags from "./Tags/Tags.vue";
// import axios from "axios";

// import axios from "axios";

export interface Todo {
  title: string;
  completed: boolean;
  id: number;
}

const bigData = ref<Todo[]>([]);
const cloneBigData = ref<Todo[]>([]);
const totalData = ref<number>(0);
const pageCount = ref<number>(0);
const todos = ref<Todo[]>([]);
const currentPage = ref<number>(1);
const dialogAdd = ref<boolean>(false);
const work = ref<string>("");
const butonContent = ref<string>("Add Work");
const dataPerPage = ref<number>(10);
// const selectList = ref<number[]>([]);

const dialogUpdate = ref<boolean>(false);

onBeforeMount(() => {
  // axios
  //   .get("https://jsonplaceholder.typicode.com/todos")
  //   .then((response) => {
  //     window.localStorage.setItem("localData", JSON.stringify(response.data));
  //     // Do something with the fetched data
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //     // Handle any errors that occurred during the request
  //   });

  //
  //
  const dataStorage = window.localStorage.getItem("localData");
  dataStorage ? (cloneBigData.value = JSON.parse(dataStorage)) : 0;
  dataStorage ? (bigData.value = JSON.parse(dataStorage)) : 0;
  setUpPagination();
});
const setUpPagination = () => {
  todos.value = [];
  totalData.value = cloneBigData.value.length;
  pageCount.value =
    totalData.value > dataPerPage.value
      ? Math.floor(totalData.value / dataPerPage.value)
      : 1;
  renderTodos();
};
const renderTodos = () => {
  for (
    let i = currentPage.value * dataPerPage.value - dataPerPage.value;
    i < currentPage.value * dataPerPage.value;
    i++
  ) {
    if (i > totalData.value - 1) break;
    todos.value.push(cloneBigData.value[i]);
  }
};
const saveLocal = () => {
  window.localStorage.setItem("localData", JSON.stringify(cloneBigData.value));
};
const getWork = (data: string) => {
  work.value = data;
};
const submitWork = () => {
  const data = {
    userID: 1,
    id: new Date().valueOf(),
    title: work.value,
    completed: false,
  };
  console.log(data);
  cloneBigData.value.unshift(data);
  work.value = "";
  saveLocal();
  setUpPagination();
};
const handleConfirmAdd = () => {
  dialogAdd.value = false;
  submitWork();
};
watch(cloneBigData, () => {
  todos.value = [];
  setUpPagination();
});
const handleDelete = (id: number) => {
  cloneBigData.value = cloneBigData.value.filter((x) => x.id !== id);
  saveLocal();
  todos.value = todos.value.filter((x) => x.id !== id);
};
const handleCheck = (todo: Todo) => {
  cloneBigData.value = cloneBigData.value.map((x) => {
    if (x.id == todo.id) {
      x.completed = !todo.completed;
    }
    return x;
  });
  saveLocal();
};
const handleSearch = (search: string) => {
  if (search == "") {
    cloneBigData.value = bigData.value;
    setUpPagination();
  } else {
    // searchData.value = todos.value.filter((x) => x.title.includes(search));
    cloneBigData.value = cloneBigData.value.filter((x) => {
      return x.title.includes(search);
      setUpPagination();
    });
  }
};

// const handleUpdate = (todo: Todo) => {
//   todo;
//   saveLocal();
// };
const filterOption = ref("");
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
watch(filterOption, (newOptions) => {
  // const clone = ref<Todo[]>([]);
  // for (let x in todos.value) {
  //   clone.value.push(todos.value[x]);
  // }
  switch (newOptions) {
    case "": {
      cloneBigData.value = bigData.value;
      setUpPagination();
      return;
    }
    case "id": {
      cloneBigData.value = cloneBigData.value.sort((a, b) => a.id - b.id);
      setUpPagination();
      return;
    }

    case "title": {
      cloneBigData.value = cloneBigData.value.sort((a, b) =>
        a.title.localeCompare(b.title)
      );
      setUpPagination();
      return;
    }
  }
});
const handlePageChange = (page: number) => {
  currentPage.value = page;
  todos.value = [];
  renderTodos();
};
watch(dataPerPage, () => {
  todos.value = [];
  renderTodos();
});

const curUpdateID = ref<number>(0);
const curUpdateWork = ref<string>("");
const handleUpdate = (data: Todo) => {
  dialogUpdate.value = true;
  curUpdateID.value = data.id;
  curUpdateWork.value = data.title;
};
const workUpdate = ref<string>();
const getUpdate = (event: any, data: string) => {
  event;
  workUpdate.value = data;
};
const handleCancelUpdate = () => {
  dialogUpdate.value = false;
  workUpdate.value = curUpdateWork.value;
};
const handleConfirmUpdate = () => {
  dialogUpdate.value = false;
  // props.todo.title = work.value;
  // emit("handleUpdate", props.todo);
  cloneBigData.value = cloneBigData.value.map((x) => {
    if (x.id == curUpdateID.value) {
      x.title = workUpdate.value || "";
    }
    return x;
  });
  saveLocal();
};
const multipleSelection = ref<Todo[]>([]);
const hideTop = ref<boolean>(false);
const handleSelectionChange = (val: Todo[]) => {
  multipleSelection.value = val;
};
watch(multipleSelection, () => {
  if (multipleSelection.value.length > 0) {
    hideTop.value = true;
  } else {
    hideTop.value = false;
  }
});
const handleDeleteByCheck = () => {
  for (let i in multipleSelection.value) {
    console.log(multipleSelection.value[i]);

    cloneBigData.value = cloneBigData.value.filter(
      (x) => x.id !== multipleSelection.value[i].id
    );
  }
  saveLocal();
};
</script>

<!-- <template>
  <div class="list-table relative">
    <div>
      <div class="list-table_top flex flex-col gap-8">
        <div class="search_add flex items-center justify-between">
          <div class="flex gap-4">
            <el-select
              v-model="filterOption"
              clearable
              placeholder="Sort"
              class="h-full"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>

            <SearchBar #prefix @handle-enterdown="handleSearch">
              <img src="../assets/Search.svg" alt="" />
            </SearchBar>
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
            <AddBar @get-work="getWork" class="w-full"> </AddBar>

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
        <div class="column-header grid grid-cols-7 gap-4 text-left">
          <div></div>
          <div class="w-32">ID</div>
          <div class="col-span-3">WORK</div>
          <div>STATUS</div>
          <div class="text-center">...</div>
        </div>
      </div>
      <div class="list-table_body">
        <ListWork
          v-for="(todo, index) in todos"
          :key="index"
          :todo="todo"
          :index="index"
          @handle-delete="handleDelete"
          @handle-update="handleUpdate"
          @handle-check="handleCheck"
          @test-select="testSelect"
        ></ListWork>
      </div>
      <div class="list-table_bottom">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="dataPerPage"
          :page-sizes="[5, 10, 50, 100]"
          layout="sizes, prev, pager, next"
          :total="totalData"
          @current-change="handlePageChange"
          class="justify-center p-5"
        />
      </div>
    </div>
  </div>
</template> -->

<template>
  <div class="list-table">
    <div class="list-table_top flex flex-col gap-8">
      <div class="search_add flex items-center justify-between">
        <div class="flex gap-4">
          <el-select
            v-model="filterOption"
            clearable
            placeholder="Sort"
            class="h-full"
            :class="{ hidden: hideTop }"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>

          <SearchBar
            #prefix
            @handle-enterdown="handleSearch"
            :class="{ hidden: hideTop }"
          >
            <img src="../assets/Search.svg" alt="" />
          </SearchBar>
          <div class="flex" :class="{ hidden: !hideTop }">
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
          <AddBar @get-work="getWork" class="w-full"> </AddBar>

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
          <!-- {{ scope.row.completed }} -->
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
              @click="handleCheck(scope.row)"
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
        class="justify-center p-5"
      />
    </div>
  </div>

  <el-dialog v-model="dialogUpdate" title="Update Work" width="30%">
    <UpdateBar
      @handle-change="getUpdate"
      class="w-full"
      :stage="dialogUpdate"
      :test="curUpdateWork"
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
</template>
<style lang="scss">
.list-table {
  background: var(--gray-0, #f7f9fc);
  border-radius: 12px;
  .list-table_top {
    padding: 20px;
    background: #f0f1fa;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
  }
}
</style>
