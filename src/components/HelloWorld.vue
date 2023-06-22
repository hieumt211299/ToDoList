<script setup lang="ts">
import { ref, defineProps } from "vue";
import CLineListsWork from "./CLineListsWork.vue";

const toDoListTString = window.localStorage.getItem("toDoListT");
const toDoListTLocal = toDoListTString
  ?JSON.parse(toDoListTString):0
  
const countIDString=window.localStorage.getItem('countID')
const countIDLocal=countIDString?JSON.parse(countIDString):0
console.log(countIDLocal);
const update = ref(true);
const props = defineProps({
  msg: String,
});

const placeholder = ref("");

const work = ref("");
// let done=ref(false)
//

//
// let toDoList = ref<string[]>([]);
const toDoListT = ref<{ workT: string, status: boolean,id:number }[]>([]);
const displayList = ref<{ workT: string, status: boolean, id: number  }[]>([]);
const countID=ref<number>()
countID.value=countIDLocal||1
// const status = ref<boolean[]>([]);
const currenitem = ref<{ workT: string, status: boolean, id: number  }[]>([]);
// toDoListT= toDoListTLocal.value? toDoListTLocal.value

if (toDoListTLocal) {
  toDoListT.value = toDoListTLocal;
  displayList.value = toDoListT.value;
}

// const clonedToDoListT = [...toDoListT.value];
// console.log(toDoListT.value.length);
function handleSubmit() {
  if (work.value.length > 0) {
    let test = {
      workT: work.value,
      status: false,
      id:countID.value||1
    };
    countID.value?countID.value++:1
    toDoListT.value.push(test);
    work.value = "";
    displayList.value = toDoListT.value;
    window.localStorage.setItem("toDoListT", JSON.stringify(toDoListT.value));
    window.localStorage.setItem("countID", JSON.stringify(countID.value));
  }
}
function deleteItem(index: number, work: String) { /* delete work* */
  // // -----
  // toDoListT.value.splice(index, 1);
  // location.reload();
  index
  // window.localStorage.setItem("toDoListT", JSON.stringify(toDoListT.value));
  // ------
  let test =  toDoListT.value.filter((x) => {
    return x.workT == work;
  });
  toDoListT.value = toDoListT.value.filter((x) => {
    return x != test[0];  
  });
  displayList.value = displayList.value.filter((x) => {
    return x != test[0];
  });

  // syncData()
  window.localStorage.setItem("toDoListT", JSON.stringify(toDoListT.value));
}

function updateItem(status: boolean, currenWork: string, id:number) {
  placeholder.value = currenWork;
  update.value = !update.value;
   let test = {
    workT: currenWork,
    status: status,
    id:id,
  };
  currenitem.value.push(test)
}
function onUpdate(): void {

  toDoListT.value.forEach((x)=>{
    if(x.id== currenitem.value[0].id){
      console.log(x.id);
      toDoListT.value[x.id - 1].workT=work.value
    }
  })

  update.value = !update.value;
  work.value = "";
  placeholder.value = "";
  currenitem.value = [];
  window.localStorage.setItem("toDoListT", JSON.stringify(toDoListT.value));
  

  // toDoList.value[currenitem.value[0]] = work.value
  // currenitem.value.splice(0, currenitem.value.length)
  // update.value = !update.value
  // work.value = ''
  // placeholder.value = ''
}
function updateStatus(statusT: boolean, id: number,index:number) {

  toDoListT.value[id-1].status=statusT;
  displayList.value[index].status=statusT
  console.log(toDoListT.value);
  console.log(displayList.value);
  window.localStorage.setItem("toDoListT", JSON.stringify(toDoListT.value));

  // console.log(displayList.value[index].status=statusT);

}

//  search function
const search = ref("");
const searchList = ref<{ workT: string, status: boolean, id: number }[]>([]);
function handleSearch() {
  
  displayList.value = toDoListT.value;
  searchList.value = displayList.value.filter((x) => {
    return (x).workT.includes(search.value);
  });

  displayList.value = searchList.value;
}


</script>

<template>
  <h1>{{ props.msg }}</h1>
  <div class="container">
    <form
      @submit.prevent="handleSubmit"
      class="newtask"
    >
      <label for="worktodo"></label>
      <input
        class="text"
        type="text"
        name="worktodo"
        id="worktodo"
        :placeholder="placeholder"
        v-model="work"
      />
      <input class="button" type="submit" value="Submit" v-if="update" />
      <input
        class="button"
        type="submit"
        value="update"
        v-if="!update"
        @click="onUpdate"
      />
    </form>
  </div>
  <!-- <CLineListsWork v-for="(work, index ,test) in toDoList" :key="index" :work="work" :index='index' :test="test" :status="status" @deteleWork="deleteItem" @update-work="updateItem" @status-test="updateStatus" /> -->
  <form @submit.prevent="handleSearch">
    <label for="search"></label>
    <input type="text" name="sreach" id="sreach"  v-model="search" />
    <input type="submit" value="Submit" />
  </form>
  <CLineListsWork
    v-for="(big, index) in displayList"
    :big="big"
    :key="index"
    :index="index"
    @deteleWork="deleteItem"
    @update-work="updateItem"
    @status-test="updateStatus"
  />
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
