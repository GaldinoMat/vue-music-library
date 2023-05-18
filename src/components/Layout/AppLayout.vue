<template>
  <!-- Header -->
  <AppHeader />

  <slot />

  <!-- Player -->
  <MusicPlayer />

  <!-- Auth Modal -->
  <AppAuthModal />
</template>

<script>
import AppHeader from '@/components/Layout/Header/AppHeader.vue'
import AppAuthModal from '@/components/AuthModal/AppAuthModal.vue'
import MusicPlayer from '@/components/MusicPlayer/MusicPlayer.vue'

export default {
  name: 'AppLayout',
  components: {
    AppHeader,
    AppAuthModal,
    MusicPlayer
  }
}
</script>
