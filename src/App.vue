<script setup lang="ts">
// import { ref } from "vue";
// import HelloWorld from './components/HelloWorld.vue';
// import SearchBar from "./components/Input/SearchBar.vue";
// import Button from "./components/button/Button.vue";
// import CheckBox from "./components/checkBox/CheckBox.vue";
// import Tags from './components/Tags/Tags.vue'
// import Button from "./components/button/Button.vue";
import ToDoList from "./components/ToDoList.vue";
import "./style.css";
</script>
<template>
  <!-- <HelloWorld msg="To Do List" /> -->
  <!-- <SearchBar>
    <template #prefix>
      <img src="/src/assets/Search.svg" alt="search-icon" />
    </template>
  </SearchBar> -->
  <!-- <Primary></Primary> -->
  <!-- <CheckBox></CheckBox> -->
  <!-- <Tags></Tags> -->
  <!-- <Button :butonContent="butonContent">
    <template #prefix>
      <img src="./assets/add.svg" alt="" />
    </template>
  </Button> -->
  <ToDoList></ToDoList>
</template>

<style lang="scss">
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
  :hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
}

.logo .logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}

html {
  background: linear-gradient(135deg, #8052ec, #d161ff) no-repeat;
}
</style>
