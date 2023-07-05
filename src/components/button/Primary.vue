<script setup lang="ts">
import { ref } from "vue";

</script>

<template>
    <button class=button>
        <img src="/src/assets/add.svg" alt="">
        <span class="button-text">Button</span>
    </button>
</template>
<style lang="scss" scoped>
span {
    /* Button/default */
    font-size: 14px;
    font-family: Inter;
    font-style: normal;
    font-weight: 500;
    line-height: 20px;
    letter-spacing: 0.28px;
}

.button {
    outline: none;
    width: 95px;
    border: none;
    display: inline-flex;
    padding: 6px 12px;
    align-items: center;
    gap: 8px;
    border-radius: 6px;
    background: var(--blue-500, #2264E5);
    box-shadow: 0px 2px 5px 0px rgba(34, 100, 229, 0.12),
        0px 0px 0px 1px #2264E5, 0px 1px 1px 0px rgba(0, 0, 0, 0.14),
        0px 1px 0px 0px #4B85FA inset;


    .button-text {
        color: var(--white, #FFF);
    }
}

.button:focus {
    outline: none;
    animation: dissolve 300ms linear;
    border-radius: 6px;
    background: var(--blue-500, #2264E5);
    box-shadow: 0px 2px 5px 0px rgba(34, 100, 229, 0.12),
        0px 0px 0px 4px rgba(1, 178, 237, 0.36), 0px 0px 0px 1px #2264E5,
        0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 0px 0px #4B85FA inset;
}

.button:hover {
    border-radius: 6px;
    background: var(--blue-600, #1354D4);
    box-shadow: 0px 4px 10px -2px rgba(19, 84, 212, 0.24),
        0px 0px 0px 1px #1354D4,
        0px 1px 1px 0px rgba(0, 0, 0, 0.14),
        0px 1px 0px 0px #4B85FA inset;
}
</style>