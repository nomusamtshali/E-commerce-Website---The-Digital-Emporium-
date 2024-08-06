<script setup>
import { defineProps } from "vue";

const props = defineProps({
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
