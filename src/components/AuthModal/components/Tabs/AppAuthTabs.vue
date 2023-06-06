<template>
  <ul class="flex flex-wrap mb-4">
    <li class="flex-auto text-center">
      <a
        class="block rounded py-3 px-4 transition"
        href="#"
        :class="{
          'hover:text-white text-white bg-blue-600': tab === 'login',
          'hover:text-blue-600': tab === 'register'
        }"
        @click.prevent="changeTab('login')"
        >Login</a
      >
    </li>
    <li class="flex-auto text-center">
      <a
        class="block rounded py-3 px-4 transition"
        href="#"
        :class="{
          'hover:text-white text-white bg-blue-600': tab === 'register',
          'hover:text-blue-600': tab === 'login'
        }"
        @click.prevent="changeTab('register')"
        >{{ $t('modal.register') }}</a
      >
    </li>
  </ul>
</template>

<script setup>
const emit = defineEmits(['change-modal-tabs'])

const changeTab = (tab) => {
  emit('change-modal-tabs', tab)
}

const props = defineProps({
  tab: String
})
</script>
