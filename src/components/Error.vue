<script setup>
/**
 * Import defineProps from Vue
 */
import { defineProps } from "vue";

/**
 * Define props for the component
 * @property {String} message - Error message to display when data fetching fails
 */
const props = defineProps({

  /**
   * The error message to display
   * @type {string}
   * @default "Data fetching failed, please check your network connection"
   */
  message: {
    type: String,
    default: "Data fetching failed, please check your network connection",
  },
});
</script>

<template>
  <div class="mt-28 text-red-500 text-xl font-bold">
    {{ message }}
  </div>
</template>
