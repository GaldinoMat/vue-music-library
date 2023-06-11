<template>
  <!-- Progess Bar -->
  <div v-for="upload in uploads" :key="upload.name" class="mb-4">
    <!-- File Name -->
    <div class="font-bold text-sm" :class="upload.textClass">
      <i :class="upload.icon" />
      {{ upload.name }}
    </div>
    <div class="flex h-4 overflow-hidden bg-gray-200 rounded">
      <!-- Inner Progress Bar -->
      <div
        class="transition-all progress-bar"
        :class="upload.variant"
        :style="{ width: `${upload.currentProgress}%` }"
      ></div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  uploads: Array
})
</script>
