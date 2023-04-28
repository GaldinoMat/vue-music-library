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
        placeholder="Enter Email"
      />
      <ErrorMessage class="text-red-600" name="email" />
    </div>
    <!-- Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">Password</label>
      <VeeField
        type="password"
        name="password"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Password"
      />
      <ErrorMessage class="text-red-600" name="password" />
    </div>
    <button
      type="submit"
      class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700"
      :disabled="loginInProgress"
    >
      Submit
    </button>
  </VeeForm>
</template>

<script>
import AppAuthFeedbackInfo from '../AuthFeedbackInfo/AppAuthFeedbackInfo.vue'

export default {
  name: 'LoginForm',
  data() {
    return {
      schema: {
        email: 'required|min:3|max:100|email',
        password: 'required|min:9|max:100|exclude:password'
      },
      loginInProgress: false,
      loginShowAlert: false,
      loginAlertVariant: '',
      loginAlertMessage: ''
    }
  },
  components: {
    AppAuthFeedbackInfo
  },
  methods: {
    async login(values) {
      this.loginShowAlert = true
      this.loginInProgress = true
      this.loginAlertVariant = 'bg-blue-500'
      this.loginAlertMessage = 'Logging you in.'

      this.loginAlertVariant = 'bg-green-500'
      this.loginAlertMessage = 'You are logged in.'

      console.log(values)
    }
  }
}
</script>
