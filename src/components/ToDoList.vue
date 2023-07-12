<script setup lang="ts">
import { ref, onBeforeMount, watch } from "vue";
import SearchBar from "./Input/SearchBar.vue";
import Button from "./button/Button.vue";
import ListWork from "./ListWork.vue";
import AddBar from "./Input/AddBar.vue";
// import axios from "axios";

// import axios from "axios";

export interface Todo {
  title: string;
  completed: boolean;
  id: number;
}

const bigData = ref<Todo[]>([]);
const cloneBigData = ref<Todo[]>([]);
const totalData = ref<number>();
const pageCount = ref<number>(0);
const todos = ref<Todo[]>([]);
const currentPage = ref<number>(1);
const dialogAdd = ref<boolean>(false);
const work = ref<string>("");
const butonContent = ref<string>("Add Work");
const dataPerPage = ref<number>(10);

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
  dataStorage ? (bigData.value = JSON.parse(dataStorage)) : 0;
  dataStorage ? (cloneBigData.value = JSON.parse(dataStorage)) : 0;
  setUpPagination();
});
const setUpPagination = () => {
  todos.value = [];
  totalData.value = cloneBigData.value.length;
  pageCount.value =
    totalData.value > dataPerPage.value
      ? Math.floor(totalData.value / dataPerPage.value)
      : 1;
  for (let i = 0; i < dataPerPage.value; i++) {
    todos.value.push(cloneBigData.value[i]);
  }
};
// const test = (dataPerPage: number) => {
//   currentPage.value = 1;
//   // pageCount.value = 0;
//   // totalData.value = 0;
//   todos.value = [];
//   const dataStorage = window.localStorage.getItem("localData");
//   dataStorage ? (bigData.value = JSON.parse(dataStorage)) : 0;
//   dataStorage ? (cloneBigData.value = JSON.parse(dataStorage)) : 0;
//   totalData.value = cloneBigData.value.length;
//   pageCount.value =
//     totalData.value > dataPerPage
//       ? Math.floor(totalData.value / dataPerPage)
//       : 1;
//   for (let i = 0; i < dataPerPage; i++) {
//     todos.value.push(cloneBigData.value[i]);
//   }
// };
// const cloneBigDataChange = (data: Todo[]) => {
//   data;
//   saveLocal("localData", cloneBigData.value);
//   console.log(2);
// };
// watchEffect(() => {
//   test(dataPerPage.value);
//   cloneBigDataChange(cloneBigData.value);
// });

// // watch(currentPage, (newPage) => {
// //   todos.value = [];
// //   for (
// //     let i = newPage * dataPerPage.value - dataPerPage.value;
// //     i < newPage * dataPerPage.value;
// //     i++
// //   ) {
// //     todos.value.push(cloneBigData.value[i]);
// //     filterOption.value = "";
// //   }
// // });
// // watch(todos || cloneBigData || searchData, () => {
// //   console.log(2);
// //   saveLocal("localData", cloneBigData.value);
// //   totalData.value = bigData.value.length;
// //   pageCount.value =
// //     totalData.value > dataPerPage.value
// //       ? Math.floor(totalData.value / dataPerPage.value)
// //       : 1;
// // });

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
  // todos.value = todos.value.filter((x) => x.id !== id);
  // searchData.value = searchData.value.filter((x) => x.id !== id);
  // todos.value = [];
  // for (
  //   let i = currentPage.value * dataPerPage.value - dataPerPage.value;
  //   i < currentPage.value * dataPerPage.value;
  //   i++
  // ) {
  //   todos.value.push(cloneBigData.value[i]);
  // }
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
    cloneBigData.value = bigData.value.filter((x) => {
      return x.title.includes(search);
      setUpPagination();
    });
  }
};

const handleUpdate = (todo: Todo) => {
  todo;
  saveLocal();
};
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
  const clone = ref<Todo[]>([]);
  for (let x in todos.value) {
    clone.value.push(todos.value[x]);
  }
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
  for (
    let i = currentPage.value * dataPerPage.value - dataPerPage.value;
    i < currentPage.value * dataPerPage.value;
    i++
  ) {
    todos.value.push(cloneBigData.value[i]);
  }
};
watch(dataPerPage, () => {
  todos.value = [];
  for (
    let i = currentPage.value * dataPerPage.value - dataPerPage.value;
    i < currentPage.value * dataPerPage.value;
    i++
  ) {
    todos.value.push(cloneBigData.value[i]);
  }
});
</script>
<template>
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
        <div class="column-header grid grid-cols-6 gap-4 text-left">
          <div class="">ID</div>
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
