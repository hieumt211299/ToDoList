<script setup lang="ts">
// import HelloWorld from './components/HelloWorld.vue';
import SearchBar from './components/searchBar/SearchBar.vue'
</script>

<template>
  <!-- <HelloWorld msg="To Do List" /> -->
  <SearchBar>
    <template #prefix>
      <img src="/src/assets/Search.svg" alt="search-icon">
    </template>
  </SearchBar>
</template>

<style >
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}

html {
  background: linear-gradient(135deg, #8052ec, #d161ff) no-repeat;
}
</style>
