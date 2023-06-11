<template v-cloak>
  <AppLayout>
    <RouterView v-slot="{ Component }">
      <Transition name="fade" mode="out-in">
        <Component :is="Component" />
      </Transition>
    </RouterView>
  </AppLayout>
</template>

<script setup>
import useUserStore from './stores/User/user'
import { auth } from '@/includes/firebase'
import AppLayout from '@/components/Layout/AppLayout.vue'
;(function () {
  if (auth.currentUser) {
    const store = useUserStore()
    store.$patch({
      userLoggedIn: true
    })
  }
})()
</script>

<style>
.fade-enter-from {
  opacity: 0;
}

.fade-enter-active {
  transition: all 0.5s linear;
}

.fade-leave-to {
  transition: all 0.5s linear;
  opacity: 0;
}
</style>
