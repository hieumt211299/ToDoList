<script setup lang="ts">
import { ref, defineProps } from 'vue'
// import ListsWork from "./ListsWork.vue"
import CLineListsWork from './CLineListsWork.vue';

// interface Work {
//   value: string
// }

const update = ref(true)
const props = defineProps({
  msg: String
})
const placeholder = ref('')
const work = ref('')
const toDoList = ref<string[]>([])
const currenitem = ref<(number|string)[]>([])
function handleSubmit() {
  if (work.value.length > 0) {
    toDoList.value.push(work.value)
    work.value = '';
    console.log(toDoList.value);
  }
}
function deleteItem(index: number) {
  toDoList.value.splice(index, 1);
}
function updateItem(index: number, currenWork: string) {
  // let workReplace=prompt('sua cong viec')
  // let workReplace=null
  placeholder.value = currenWork
  update.value = !update.value
  currenitem.value.push(index)
  currenitem.value.push(currenWork)
  // console.log(currenitem.value);

  // toDoList.value.splice(index, 1,workReplace);
}
function onUpdate() {
  console.log(currenitem.value[0]);
  console.log(work.value);
  toDoList.value[currenitem.value[0]] = work.value
  currenitem.value.splice(0, currenitem.value.length)
  update.value = !update.value
  work.value = ''
  placeholder.value = ''
}
    // return{
    //   update,placeholder,work,toDoList,handleSubmit, deleteItem, updateItem, onUpdate
    // }
</script>

<template>
  <h1>{{ props.msg }}</h1>
  <div class="container">
    <form @submit.prevent="handleSubmit" class="newtask">
      <label for="worktodo"></label>
      <input class="text" type="text" name="worktodo" id="worktodo" :placeholder="placeholder" v-model="work">
      <input class="button" type="submit" value="Submit" v-if="update">
      <input class="button" type="submit" value="update" v-if="!update" @click="onUpdate">
    </form>
  </div>
  <CLineListsWork v-for="(work, index) in toDoList" :key="index" :work="work" :index='index' @detele-work="deleteItem"
    @update-work="updateItem" />
</template>

<style scoped>
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
  font-family: 'Poppins', sans-serif;
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
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
  font-size: 16px;
  background-color: #8052ec;
  border: none;
  color: #ffffff;
  cursor: pointer;
  outline: none;
}
</style>