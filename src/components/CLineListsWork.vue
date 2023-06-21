<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue'


const props = defineProps({
    work: String,
    done: Boolean,
    status:Array,
    big : Object,
    index: Number,

})
let statusT=props.big?.status||[]
// console.log(statusT[props.index]);/
let done = ref<boolean>(statusT[props.index] || false)
const emit = defineEmits(['deteleWork', 'updateWork','finishWork','statusTest'])
function handleDelete() {
    emit('deteleWork', props.index)
}
function handleUpdate() {
    emit('updateWork', props.index, props.big?.workT)
}
function handleFinish(){
    // emit('finishWork',props.index)
    done.value = !done.value;
    statusT[props.index||0]=done.value 
    // console.log(statusT);
    emit('statusTest',statusT,props.index)
    // window.localStorage.setItem('status', JSON.stringify(statusT))
}
</script>
<template>
    <div class="container">
        <div class="lists" :class="{ 'finish': done }">
            <div class="list" > {{ props.big?.workT }}</div>
            <div class="buttons">
                <button class="button" @click="handleDelete"><img src="../assets/trash.png" alt=""></button>
                <button class="button" @click="handleUpdate"><img src="../assets/changes.png" alt=""></button>
                <button class="button" @click="handleFinish"><img src="../assets/check.png" alt="" ></button>
            </div>
        </div>
    </div>
</template>
<style scoped>

.finish .list{
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
