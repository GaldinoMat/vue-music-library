<template>
  <AppAuthFeedbackInfo
    :actionShowAlert="loginShowAlert"
    :actionAlertVariant="loginAlertVariant"
    :actionAlertMessage="loginAlertMessage"
  />
  <VeeForm :validationSchema="schema" @submit="login">
    <!-- Email -->
    <div class="mb-3">
      <label class="inline-block mb-2">Email</label>
      <VeeField
        type="email"
        name="email"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        :placeholder="$t(`login.emailPlaceholder`)"
      />
      <ErrorMessage class="text-red-600" name="email" />
    </div>
    <!-- Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">{{ $t('login.password') }}</label>
      <VeeField
        type="password"
        name="password"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        :placeholder="$t(`login.password`)"
      />
      <ErrorMessage class="text-red-600" name="password" />
    </div>
    <button
      type="submit"
      class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700"
      :disabled="loginInProgress"
    >
      {{ $t('login.submit') }}
    </button>
  </VeeForm>
</template>

<script setup>
import { ref } from 'vue'
import AppAuthFeedbackInfo from '../AuthFeedbackInfo/AppAuthFeedbackInfo.vue'
import useUserStore from '@/stores/User/user'

const schema = {
  email: 'required|min:3|max:100|email',
  password: 'required|min:9|max:100|exclude:password'
}

let loginInProgress = ref(false)
let loginShowAlert = ref(false)
let loginAlertVariant = ref('')
let loginAlertMessage = ref('')

const { authenticate } = useUserStore()

const login = async (values) => {
  loginShowAlert.value = true
  loginInProgress.value = true
  loginAlertVariant.value = 'bg-blue-500'
  loginAlertMessage.value = 'Logging you in.'

  try {
    await authenticate(values)
  } catch (error) {
    loginInProgress.value = false
    loginAlertVariant.value = 'bg-red-500'
    loginAlertMessage.value = 'Invalid login details.'

    return
  }

  loginAlertVariant.value = 'bg-green-500'
  loginAlertMessage.value = 'You are logged in.'
  window.location.reload()
}
</script>
