<template>
  <!-- Header -->
  <AppHeader />

  <main>
    <slot />
  </main>

  <!-- Auth Modal -->
  <AppAuthModal />
</template>

<script>
import AppHeader from '@/components/Layout/Header/AppHeader.vue'
import AppAuthModal from '@/components/AuthModal/AppAuthModal.vue'

export default {
  name: "AppLayout",
  components: {
    AppHeader,
    AppAuthModal
  }
}
</script>
