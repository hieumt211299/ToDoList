<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>

  <HelloWorld msg="To Do List" />
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
html{
   background: linear-gradient(135deg, #8052ec, #d161ff) no-repeat;
}

</style>
