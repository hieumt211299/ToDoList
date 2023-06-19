<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'


const props = defineProps({
    work: String,
    index: Number,
})
const emit = defineEmits(['deteleWork', 'updateWork'])
function handleDelete() {
    emit('deteleWork', props.index)
}
function handleUpdate() {
    emit('updateWork', props.index, props.work)
}
</script>
<template>
    <div class="container">
        <div class="lists">
            <div class="list"> {{ work }}</div>
            <div class="buttons">
                <button class="button" @click="handleDelete"><img src="../assets/trash.png" alt=""></button>
                <button class="button" @click="handleUpdate"><img src="../assets/changes.png" alt=""></button>
            </div>
        </div>
    </div>
</template>
<style scoped>
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
