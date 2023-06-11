<template>
  <header id="header" class="bg-gray-700">
    <nav class="container mx-auto flex justify-start items-center py-5 px-4">
      <!-- App Name -->
      <RouterLink
        class="text-white font-bold uppercase text-2xl mr-4"
        :to="{ name: 'Home' }"
        exact-active-class="no-active"
        >Music</RouterLink
      >

      <div class="flex flex-grow items-center">
        <!-- Primary Navigation -->
        <ul class="flex flex-row mt-1">
          <!-- Navigation Links -->
          <li>
            <RouterLink class="px-2 text-white" :to="{ name: 'About' }">
              {{ $t('header.about') }}
            </RouterLink>
          </li>
          <li v-if="!isUserLoggedIn">
            <RouterLink
              class="px-2 text-white"
              :to="{ name: 'Home' }"
              @click.prevent="toggleAuthModal"
              exact-active-class="no-active"
            >
              {{ $t('header.loginRegister') }}
            </RouterLink>
          </li>
          <template v-else>
            <li>
              <RouterLink class="px-2 text-white" :to="{ name: 'Manage' }">
                {{ $t('header.manage') }}
              </RouterLink>
            </li>
            <li>
              <RouterLink
                class="px-2 text-white"
                :to="{ name: 'Home' }"
                @click.prevent="logout"
                exact-active-class="no-active"
                >Logout
              </RouterLink>
            </li>
          </template>
        </ul>
        <ul class="ml-auto">
          <li>
            <a href="#" @click.prevent="changeLocale" class="text-white">
              {{ currentLocale }}
            </a>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { computed } from 'vue'
import useModalStore from '@/stores/Modal/modal.js'
import useUserStore from '@/stores/User/user.js'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n({ useScope: 'global' })

const currentLocale = computed(() => (locale.value === 'pt' ? 'EN' : 'PT'))

const changeLocale = () => {
  locale.value = locale.value === 'pt' ? 'en' : 'pt'
}

const { logout } = useUserStore()

const isUserLoggedIn = computed(() => useUserStore().userLoggedIn)

const toggleAuthModal = () => {
  const store = useModalStore()
  const { isOpen } = store
  store.$patch({
    isOpen: !isOpen
  })
}
</script>
