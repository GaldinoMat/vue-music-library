<template v-cloak>
  <AppLayout>
    <RouterView v-slot="{ Component }">
      <Transition name="fade" mode="out-in">
        <Component :is="Component" />
      </Transition>
    </RouterView>
  </AppLayout>
</template>

<script>
import { mapWritableState } from 'pinia'
import useUserStore from './stores/User/user'
import { auth } from '@/includes/firebase'
import AppLayout from '@/components/Layout/AppLayout.vue'

export default {
  name: 'App',
  components: {
    AppLayout
  },
  computed: {
    ...mapWritableState(useUserStore, ['userLoggedIn'])
  },
  created() {
    if (auth.currentUser) {
      this.userLoggedIn = true
    }
  }
}
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
