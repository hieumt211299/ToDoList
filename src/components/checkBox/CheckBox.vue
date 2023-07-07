<script setup lang="ts">
import { ref } from "vue";
const checked1 = ref<boolean>(false);
const btnStage = ref<string>("unchecked");
</script>
<template>
  <input id="myCheckBox" type="checkbox" :class="btnStage" v-model="checked1" />
  <label for="myCheckBox"></label>
</template>

<!-- <style lang="scss">
input[type="checkbox"] {
  display: none;
}

label {
  display: inline-block;
  position: relative;
  padding-left: 25px;
  cursor: pointer;

  &:hover::before {
    border: solid 1px #d5dae5;
  }

  &:focus::before {
    border-radius: 4px;
    background: var(--white, #fff);
    box-shadow: 0px 2px 5px 0px rgba(89, 96, 120, 0.1),
      0px 0px 0px 4px rgba(1, 178, 237, 0.36),
      0px 0px 0px 1px rgba(70, 79, 96, 0.16), 0px 1px 1px 0px rgba(0, 0, 0, 0.1);
  }

  &:before {
    content: "";
    box-sizing: border-box;
    display: inline-block;
    position: absolute;
    left: 0;
    top: 0;
    width: 16px;
    height: 16px;
    flex-shrink: 0;
    border-radius: 4px;
    background: var(--white, #fff);
    border: solid 1px #e3e9f6;
    box-shadow: 0px 2px 5px 0px rgba(89, 96, 120, 0.1),
      0px 0px 1px rgba(70, 79, 96, 0.16), 0px 1px 1px 0px rgba(0, 0, 0, 0.1);
  }
}

input[type="checkbox"]:checked + label:before {
  background-color: #2264e5; /* Checkbox background color when checked */
  border-color: #2264e5; /* Checkbox border color when checked */
  fill: var(--blue-500, #2264e5);
  box-shadow: 0px 1px 0px 0px #4b85fa inset;
  filter: drop-shadow(0px 2px 5px rgba(34, 100, 229, 0.12))
    drop-shadow(0px 0px 0px #2264e5)
    drop-shadow(0px 1px 1px rgba(0, 0, 0, 0.14));
}
input[type="checkbox"]:checked + label:hover::before {
  background-color: #1354d4; /* Checkbox background color when checked */
  border-color: #1354d4;
  fill: var(--blue-600, #1354d4);
  box-shadow: 0px 1px 0px 0px #4b85fa inset;
  filter: drop-shadow(0px 4px 10px rgba(19, 84, 212, 0.24))
    drop-shadow(0px 0px 0px #1354d4)
    drop-shadow(0px 1px 1px rgba(0, 0, 0, 0.14));
}
input[type="checkbox"]:checked + label:focus::before {
  border-radius: 4px;
  box-shadow: 0px 2px 5px 0px rgba(89, 96, 120, 0.1),
    0px 0px 0px 4px rgba(1, 178, 237, 0.36),
    0px 0px 0px 1px rgba(70, 79, 96, 0.16), 0px 1px 1px 0px rgba(0, 0, 0, 0.1);
}

/* Style the checkmark inside the custom checkbox */
label:after {
  content: "";
  position: absolute;
  display: none;
}

/* Show the checkmark when the checkbox is checked */
input[type="checkbox"]:checked + label:after {
  display: block;
}

label:after {
  left: 5px; /* Adjust the position of the checkmark */
  top: 1px; /* Adjust the position of the checkmark */
  width: 5px; /* Adjust the size of the checkmark */
  height: 10px; /* Adjust the size of the checkmark */
  border: solid #fff; /* Checkmark color */
  border-width: 0 2px 2px 0; /* Checkmark thickness and shape */
  transform: rotate(45deg); /* Rotate the checkmark */
}
</style> -->
<style lang="scss">
input[type="checkbox"] {
  display: none;
  &:checked {
    + {
      label {
        &:before {
          background-color: #2264e5;
          border-color: #2264e5;
          fill: var(--blue-500, #2264e5);
          box-shadow: 0px 1px 0px 0px #4b85fa inset;
          filter: drop-shadow(0px 2px 5px rgba(34, 100, 229, 0.12))
            drop-shadow(0px 0px 0px #2264e5)
            drop-shadow(0px 1px 1px rgba(0, 0, 0, 0.14));
        }
        &:hover {
          &::before {
            background-color: #1354d4;
            border-color: #1354d4;
            fill: var(--blue-600, #1354d4);
            box-shadow: 0px 1px 0px 0px #4b85fa inset;
            filter: drop-shadow(0px 4px 10px rgba(19, 84, 212, 0.24))
              drop-shadow(0px 0px 0px #1354d4)
              drop-shadow(0px 1px 1px rgba(0, 0, 0, 0.14));
          }
        }
        &:focus {
          &::before {
            border-radius: 4px;
            box-shadow: 0px 2px 5px 0px rgba(89, 96, 120, 0.1),
              0px 0px 0px 4px rgba(1, 178, 237, 0.36),
              0px 0px 0px 1px rgba(70, 79, 96, 0.16),
              0px 1px 1px 0px rgba(0, 0, 0, 0.1);
          }
        }
        &:after {
          display: block;
        }
      }
    }
  }
}
label {
  display: inline-block;
  position: relative;
  padding-left: 25px;
  cursor: pointer;
  &:hover {
    &::before {
      border: solid 2px #d5dae5;
    }
  }
  &:focus {
    &::before {
      border-radius: 4px;
      background: var(--white, #fff);
      box-shadow: 0px 2px 5px 0px rgba(89, 96, 120, 0.1),
        0px 0px 0px 4px rgba(1, 178, 237, 0.36),
        0px 0px 0px 1px rgba(70, 79, 96, 0.16),
        0px 1px 1px 0px rgba(0, 0, 0, 0.1);
    }
  }
  &:before {
    content: "";
    box-sizing: border-box;
    display: inline-block;
    position: absolute;
    left: 0;
    top: 0;
    width: 16px;
    height: 16px;
    flex-shrink: 0;
    border-radius: 4px;
    background: var(--white, #fff);
    border: solid 1px #e3e9f6;
    box-shadow: 0px 2px 5px 0px rgba(89, 96, 120, 0.1),
      0px 0px 1px rgba(70, 79, 96, 0.16), 0px 1px 1px 0px rgba(0, 0, 0, 0.1);
  }
  &:after {
    content: "";
    position: absolute;
    display: none;
    left: 5px;
    top: 1px;
    width: 5px;
    height: 10px;
    border: solid #fff;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }
}
</style>
