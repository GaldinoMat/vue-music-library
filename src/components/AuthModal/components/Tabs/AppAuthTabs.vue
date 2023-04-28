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
        @click.prevent="onClickChangeTabs('login')"
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
        @click.prevent="onClickChangeTabs('register')"
        >Register</a
      >
    </li>
  </ul>
</template>

<script>
export default {
  props: { tab: String },
  emits: ['changeModalTabs'],
  methods: {
    onClickChangeTabs(modalTab) {
      this.$emit('changeModalTabs', modalTab)
    }
  }
}
</script>
