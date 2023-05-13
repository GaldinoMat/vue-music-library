<template>
  <select
    class="block mt-4 py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
  >
    <option value="1">Latest</option>
    <option value="2">Oldest</option>
  </select>
</template>

<script>
export default {
  name: 'SortingComponent'
}
</script>
