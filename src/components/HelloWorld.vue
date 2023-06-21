<script setup lang="ts">
import { ref, defineProps, onMounted ,onUpdated, onUnmounted , onBeforeMount,onBeforeUpdate} from 'vue'
// import ListsWork from "./ListsWork.vue"
import CLineListsWork from './CLineListsWork.vue';

// interface Work {
//   value: string
// }
// onMounted(() => {
//   console.log('on mounted');
// })

const statusString = window.localStorage.getItem('status');
const statusLocal = statusString ? ref<boolean[]>(JSON.parse(statusString)) : ref<boolean[]>([])

const toDoListString= window.localStorage.getItem('toDoList');
const toDoListLocal = toDoListString ? ref<string[]>(JSON.parse(toDoListString)) : ref<string[]>()

const toDoListTString= window.localStorage.getItem('toDoListT');
const toDoListTLocal = toDoListTString ? ref<string[]>(JSON.parse(toDoListTString)) : ref<string[]>()
console.log(toDoListTLocal);

// {
//   value: 
//   status:
// }
// interface task {
//   workT:String
//   status:boolean
// }


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
toDoList.value = toDoListLocal.value ? toDoListLocal.value : []
status.value = statusLocal.value




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

  }
}
function deleteItem(index: number) {
  // toDoList.value.splice(index, 1);
  // status.value.splice(index, 1);
  toDoListT.value.splice(index,1);

  // location.reload()
}
function updateItem(index: number, currenWork: string) {

  placeholder.value = currenWork
  update.value = !update.value
  currenitem.value.push(index)
  currenitem.value.push(currenWork)

}
function onUpdate():void {
  
  console.log(toDoListT.value[currenitem.value[0]]);
  console.log(toDoListT.value[currenitem.value[0]].workT);
  toDoListT.value[currenitem.value[0]].workT=work.value
  
  update.value = !update.value
  work.value = ''
  placeholder.value = ''
  currenitem.value=[]

  // toDoList.value[currenitem.value[0]] = work.value
  // currenitem.value.splice(0, currenitem.value.length)
  // update.value = !update.value
  // work.value = ''
  // placeholder.value = ''

}
function updateStatus(statusT: [],index:number){
  status.value[index] = statusT[index]
}



onUpdated(()=>{

  // window.localStorage.setItem('toDoList', JSON.stringify(toDoList.value))
  // window.localStorage.setItem('status', JSON.stringify(status.value))


  window.localStorage.setItem('toDoListT', JSON.stringify(toDoListT.value))

})

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
    <form @submit.prevent="handleSubmit" class="newtask">
      <label for="worktodo"></label>
      <input class="text" type="text" name="worktodo" id="worktodo" :placeholder="placeholder" v-model="work">
      <input class="button" type="submit" value="Submit" v-if="update">
      <input class="button" type="submit" value="update" v-if="!update" @click="onUpdate">
    </form>
  </div>
  <!-- <CLineListsWork v-for="(work, index ,test) in toDoList" :key="index" :work="work" :index='index' :test="test" :status="status" @deteleWork="deleteItem" @update-work="updateItem" @status-test="updateStatus" /> -->

  <CLineListsWork v-for="(big, index) in toDoListT" :big="big" :key="index" :index="index" @deteleWork="deleteItem" @update-work="updateItem" @status-test="updateStatus"/>

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