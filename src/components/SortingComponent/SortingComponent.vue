<template>
  <select
    @change="onChange($event.target.value)"
    class="block mt-4 py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
  >
    <option value="latest">{{ $t('song.latest') }}</option>
    <option value="oldest">{{ $t('song.oldest') }}</option>
  </select>
</template>

<script setup>
const emit = defineEmits(['change-sort'])

const onChange = (sortValue) => {
  emit('change-sort', sortValue)
}
</script>
