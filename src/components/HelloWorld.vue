<script setup lang="ts">
import { ref, defineProps, onMounted, unref, watch, onBeforeMount } from "vue";
import CLineListsWork from "./CLineListsWork.vue";
import axios from "axios";

const props = defineProps({
  msg: String,
});
export interface Todo {
  title: string;
  completed: boolean;
  id: number;
}
const isUpdate = ref(false);
const work = ref("");
const todos = ref<Todo[]>([]);
const filterTodo = ref<Todo[]>([]);
const id = ref<number>();
const search = ref("");
const currentPage = ref<number>(1)
const bigData = ref<Todo[]>([]);
const totalPage = ref<number>()
const pageCount = ref<number>(0)

onBeforeMount(() => {
  axios.get('https://jsonplaceholder.typicode.com/todos')
    .then(Response => {
      bigData.value = Response.data
      totalPage.value = bigData.value.length
      pageCount.value = totalPage.value / 10
      for (let i = 0; i < 10; i++) {
        todos.value.push(bigData.value[i])
      }
    })

}),
  onMounted(() => {
    // const dataStorage = window.localStorage.getItem("todos");
    // if (dataStorage) {
    //   todos.value = JSON.parse(dataStorage);
    // }

  });

function saveLocal(nameLocal: string, list: any) {
  window.localStorage.setItem(nameLocal, JSON.stringify(list));
}

function handleSubmit() {
  const valueInput = unref(work);
  if (!valueInput) return;

  const data = {
    title: valueInput,
    completed: false,
    id: new Date().valueOf(),
  };

  todos.value = [...todos.value, data];
  work.value = "";

  saveLocal("todos", todos.value);
}
function deleteItem(id: number) {
  /* delete work* */

  todos.value = todos.value.filter((x) => x.id !== id);
  filterTodo.value = filterTodo.value.filter((x) => x.id !== id);

  saveLocal("todos", todos.value);
}

function updateItem(todo: Todo) {
  work.value = todo.title;
  isUpdate.value = !unref(isUpdate);
  id.value = todo.id;
}
function onUpdate(): void {
  todos.value = todos.value.map((todo) => {
    if (todo.id === unref(id)) {
      todo.title = unref(work);
    }
    return todo;
  });

  isUpdate.value = !unref(isUpdate);
  work.value = "";
  id.value = 0;

  saveLocal("todos", todos.value);
}
function updateStatus(todo: Todo, index: number) {
  if (filterTodo.value.length) {
    filterTodo.value[index].completed = !todo.completed;
  }

  todos.value = todos.value.map((t) => {
    if (t.id === todo.id) {
      todo.completed = !todo.completed;
    }
    return t;
  });

  saveLocal("todos", todos.value);
}

function handleSearch() {
  filterTodo.value = todos.value.filter((x) => x.title.includes(search.value));
}

function handleCurrentChange(page: number) {
  currentPage.value = page
}
watch(currentPage, (newPage) => {
  todos.value = []
  for (let i = newPage * 10 - 10; i < newPage * 10; i++) {
    todos.value.push(bigData.value[i])
  }
})
</script>

<template>
  <h1>{{ props.msg }}</h1>
  <div class="container">
    <el-form @submit.prevent="handleSubmit" class="newtask">
      <label for="valueodo"></label>
      <el-input type="text" name="valueodo" id="valueodo" v-model="work" class="text" />
      <el-button class="button" type="primary" value="Submit" v-if="!isUpdate" @click="handleSubmit">Submit</el-button>
      <el-button v-else class="button" type="primary" value="update" @click="onUpdate">Update</el-button>
    </el-form>
    <el-form @submit.prevent="handleSearch">
      <label for="search"></label>
      <el-input type="text" name="sreach" id="sreach" v-model="search" />
      <el-button type="primary" value="Submit" @click="handleSearch">Search</el-button>
    </el-form>

  </div>
  <CLineListsWork v-for="(todo, index) in filterTodo.length ? filterTodo : todos" :todo="todo" :key="index" :index="index"
    @deteleWork="() => deleteItem(todo.id)" @update-work="() => updateItem(todo)"
    @handle-status="() => updateStatus(todo, index)" />

  <el-pagination style="margin-top: 25px;" background layout="prev, pager, next" :total="totalPage" v-model="currentPage"
    @current-change="handleCurrentChange" :page-count="pageCount" />
</template>

<style scoped>
.el-pagination {
  justify-content: center;
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
  color: black !important;
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

.container {
  width: 40%;
  min-width: 450px;
  margin: auto;
  left: 0;
  right: 0;
  top: 55px;
  /* padding: 30px 40px;  */
}

.newtask {
  position: relative;
  background-color: #ffffff;
  padding: 30px 20px;
  border-radius: 15px;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
}

.text {
  width: 70%;
  width: 70%;
  height: 45px;
  font-family: "Poppins", sans-serif;
  font-size: 15px;
  border: 2px solid #d1d3d4;
  padding: 12px;
  color: #111111;
  font-weight: 500;
  position: relative;
  border-radius: 5px;
}

.button {
  position: relative;
  float: right;
  width: 20%;
  height: 45px;
  border-radius: 5px;
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  font-size: 16px;
  background-color: #8052ec;
  border: none;
  color: #ffffff;
  cursor: pointer;
  outline: none;
}
</style>
