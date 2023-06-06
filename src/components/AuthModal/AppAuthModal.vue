<template>
  <div class="fixed z-10 inset-0 overflow-y-auto" id="modal" :class="store.hiddenClass">
    <div
      class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
    >
      <div class="fixed inset-0 transition-opacity">
        <div class="absolute inset-0 bg-gray-800 opacity-75"></div>
      </div>

      <!-- This element is to trick the browser into centering the modal contents. -->
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>

      <div
        class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
      >
        <!-- Add margin if you want to see some of the overlay behind the modal-->
        <div class="py-4 text-left px-6">
          <!--Title-->
          <div class="flex justify-between items-center pb-4">
            <p class="text-2xl font-bold">{{ $t('modal.title') }}</p>
            <!-- Modal Close Button -->
            <div class="modal-close cursor-pointer z-50" @click="openModal">
              <i class="fas fa-times" />
            </div>
          </div>

          <!-- Tabs -->
          <AppAuthTabs :tab="tab" @change-modal-tabs="changeModalTabs" />

          <!-- Login Form -->
          <AppAuthLogin v-if="tab === 'login'" />

          <!-- Registration Form -->
          <AppAuthRegister v-else />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import useModalStore from '@/stores/Modal/modal'
import AppAuthTabs from './components/Tabs/AppAuthTabs.vue'
import AppAuthLogin from './components/LoginForm/AppAuthLoginForm.vue'
import AppAuthRegister from './components/RegistrationForm/AppAuthRegistrationForm.vue'

const store = useModalStore()

let tab = ref('login')

const changeModalTabs = (modalTab) => {
  tab.value = modalTab
}

const openModal = () => {
  store.$patch({
    isOpen: false
  })
}
</script>
