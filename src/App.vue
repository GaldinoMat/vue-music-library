<template v-cloak>
  <AppLayout>
    <RouterView />

    <!-- Player -->
    <MusicPlayer />
  </AppLayout>
</template>

<script>
import { mapWritableState } from 'pinia'
import useUserStore from './stores/User/user'
import { auth } from '@/includes/firebase'
import AppLayout from '@/components/Layout/AppLayout.vue'
import MusicPlayer from '@/components/MusicPlayer/MusicPlayer.vue'

export default {
  name: 'App',
  components: {
    AppLayout,
    MusicPlayer
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
