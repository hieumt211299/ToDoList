<script setup lang="ts">
import { ref, defineProps} from 'vue'
import CLineListsWork from './CLineListsWork.vue';

const toDoListTString= window.localStorage.getItem('toDoListT');
const toDoListTLocal = toDoListTString ? ref<string[]>(JSON.parse(toDoListTString)) : ref<string[]>()

const update = ref(true)
const props = defineProps({
  msg: String
})

const placeholder = ref('')


const work = ref('')
// let done=ref(false)
let toDoList = ref<string[]>([])
let toDoListT= ref<object[]>([])

let status=ref<boolean[]>([])
const currenitem = ref<any[]>([])
// toDoListT= toDoListTLocal.value? toDoListTLocal.value
if(toDoListTLocal.value){
  toDoListT.value= toDoListTLocal.value as Object[]
}
const clonedToDoListT = [...toDoListT.value];
// console.log(toDoListT.value.length);
function handleSubmit() {
  if (work.value.length > 0) {
    toDoList.value.push(work.value) 
    status.value.push(false)
    let test={
      workT:work.value,
      status:false
    }
    toDoListT.value.push(test)
    work.value = '';
    window.localStorage.setItem('toDoListT', JSON.stringify(toDoListT.value))

  }
}
function deleteItem(index: number) {

  // console.log(clonedToDoListT);
  // let test=clonedToDoListT.filter((x)=>{
  //   return x.workT!= toDoListT.value[index].workT
  // })
  // console.log(test);
  location.reload()
  // toDoListT.value[index].status ? location.reload():0
  // toDoListT.value= test
  // clonedToDoListT = [...toDoListT.value];
  // console.log(toDoListT.value.);
  toDoListT.value.splice(index,1)

  window.localStorage.setItem('toDoListT', JSON.stringify(toDoListT.value))

}
function updateItem(index: number, currenWork: string) {

  placeholder.value = currenWork
  update.value = !update.value
  currenitem.value.push(index)
  currenitem.value.push(currenWork)
  window.localStorage.setItem('toDoListT', JSON.stringify(toDoListT.value))

}
function onUpdate():void {
  

  toDoListT.value[currenitem.value[0]].workT=work.value
  
  update.value = !update.value
  work.value = ''
  placeholder.value = ''
  currenitem.value=[]
  window.localStorage.setItem('toDoListT', JSON.stringify(toDoListT.value))

  // toDoList.value[currenitem.value[0]] = work.value
  // currenitem.value.splice(0, currenitem.value.length)
  // update.value = !update.value
  // work.value = ''  
  // placeholder.value = ''

}
function updateStatus(statusT: boolean[],index:number){

  toDoListT.value[index].status= statusT[index]
  
  window.localStorage.setItem('toDoListT', JSON.stringify(toDoListT.value))
}

// const placeholderSearch = ref('')
const search = ref('')
const searchList = ref<object[]>([])
const isFormDisabled =ref<boolean>(false)
function handleSearch(){
  if (toDoListTLocal.value) {
    toDoListT.value = toDoListTLocal.value as Object[]
  }
  searchList.value=toDoListT.value.filter((x)=>{
    return x.workT.includes(search.value)
  })
  console.log(searchList.value);
  toDoListT.value=searchList.value
  if(toDoListT.value.length!=toDoListTLocal.value?.length){
    isFormDisabled.value=true
  }else isFormDisabled.value = false
}

// onUpdated(()=>{
//   window.localStorage.setItem('toDoListT', JSON.stringify(toDoListT.value))
// })

// onUnmounted(()=>{
// console.log('on Unmounted');
// })
// onBeforeMount(()=>{
//   console.log("on Before mount");
// })
// onBeforeUpdate(()=>{
//   console.log('on before update');
// })
</script>

<template>
  <h1>{{ props.msg }}</h1>
  <div class="container">
    <form @submit.prevent="handleSubmit" class="newtask" :class="{ 'disabled': isFormDisabled }">
      <label for="worktodo"></label>
      <input class="text" type="text" name="worktodo" id="worktodo" :placeholder="placeholder" v-model="work">
      <input class="button" type="submit" value="Submit" v-if="update">
      <input class="button" type="submit" value="update" v-if="!update" @click="onUpdate">
    </form>
  </div>
  <!-- <CLineListsWork v-for="(work, index ,test) in toDoList" :key="index" :work="work" :index='index' :test="test" :status="status" @deteleWork="deleteItem" @update-work="updateItem" @status-test="updateStatus" /> -->
  <form @submit.prevent="handleSearch" > 
    <label for="search"></label>
    <input  type="text" name="sreach" id="sreach" v-model="search">
        <input  type="submit" value="Submit" >
  </form>
  <CLineListsWork v-for="(big, index) in toDoListT" :big="big" :key="index" :index="index" @deteleWork="deleteItem" @update-work="updateItem" @status-test="updateStatus"/>

</template>

<style scoped>
.disabled {
  opacity: 0.5;
  pointer-events: none;
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