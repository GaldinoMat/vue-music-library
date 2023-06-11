<template>
  <div
    class="text-white text-center font-bold p-4 rounded mb-4"
    v-if="actionShowAlert"
    :class="actionAlertVariant"
  >
    {{ actionAlertMessage }}
  </div>
</template>

<script setup>
const props = defineProps({
  actionShowAlert: Boolean,
  actionAlertVariant: String,
  actionAlertMessage: String
})
</script>
