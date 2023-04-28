<template>
  <div class="fixed z-10 inset-0 overflow-y-auto" id="modal" :class="hiddenClass">
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
            <p class="text-2xl font-bold">Your Account</p>
            <!-- Modal Close Button -->
            <div class="modal-close cursor-pointer z-50" @click="modalVisibility = false">
              <i class="fas fa-times"></i>
            </div>
          </div>

          <!-- Tabs -->
          <AppAuthTabs :tab="tab" @changeModalTabs="changeModalTabs" />

          <!-- Login Form -->
          <AppAuthLogin v-if="tab === 'login'" />

          <!-- Registration Form -->
          <AppAuthRegister v-else />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapWritableState } from 'pinia'
import useModalStore from '@/stores/Modal/modal'
import AppAuthTabs from './components/Tabs/AppAuthTabs.vue'
import AppAuthLogin from './components/LoginForm/AppAuthLoginForm.vue'
import AppAuthRegister from './components/RegistrationForm/AppAuthRegistrationForm.vue'

export default {
  name: 'AuthModal',
  data() {
    return {
      tab: 'login'
    }
  },
  computed: {
    /** 
      In this case, since we want to use the store's methods, we need to pass the methods name 
      to the function's second argument, inside an array.
    */
    ...mapWritableState(useModalStore, {
      modalVisibility: 'isOpen',
      hiddenClass: 'hiddenClass'
    })
  },
  components: {
    AppAuthTabs,
    AppAuthLogin,
    AppAuthRegister
  },
  methods: {
    changeModalTabs(modalTab) {
      this.tab = modalTab
    }
  }
}
</script>
