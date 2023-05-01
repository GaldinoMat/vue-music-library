<template>
  <AppAuthFeedbackInfo
    :actionShowAlert="registerShowAlert"
    :actionAlertVariant="registerAlertVariant"
    :actionAlertMessage="registerAlertMessage"
  />
  <VeeForm :validationSchema="schema" @submit="register" :initial-values="userData">
    <!-- Name -->
    <div class="mb-3">
      <label class="inline-block mb-2">Name</label>
      <VeeField
        name="name"
        type="text"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Name"
      />
      <ErrorMessage class="text-red-600" name="name" />
    </div>
    <!-- Email -->
    <div class="mb-3">
      <label class="inline-block mb-2">Email</label>
      <VeeField
        name="email"
        type="email"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Email"
      />
      <ErrorMessage class="text-red-600" name="email" />
    </div>
    <!-- Age -->
    <div class="mb-3">
      <label class="inline-block mb-2">Age</label>
      <VeeField
        name="age"
        type="number"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
      />
      <ErrorMessage class="text-red-600" name="age" />
    </div>
    <!-- Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">Password</label>
      <VeeField name="password" :bails="false" v-slot="{ field, errors }">
        <input
          type="password"
          class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
          placeholder="Password"
          v-bind="field"
        />
        <div class="text-red-600" v-for="error in errors" :key="error">
          {{ error }}
        </div>
      </VeeField>
    </div>
    <!-- Confirm Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">Confirm Password</label>
      <VeeField
        name="confirmPassword"
        type="password"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Confirm Password"
      />
      <ErrorMessage class="text-red-600" name="confirmPassword" />
    </div>
    <!-- Country -->
    <div class="mb-3">
      <label class="inline-block mb-2">Country</label>
      <VeeField
        as="select"
        name="country"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
      >
        <option value="USA">USA</option>
        <option value="Mexico">Mexico</option>
        <option value="Germany">Germany</option>
        <option value="Antarctica">Antarctica</option>
      </VeeField>
      <ErrorMessage class="text-red-600" name="country" />
    </div>
    <!-- TOS -->
    <div class="mb-3 pl-6 flex flex-col">
      <label class="inline-block">
        Accept terms of service
        <VeeField
          name="tos"
          type="checkbox"
          class="w-4 h-4 float-left -ml-6 mt-1 rounded"
          value="true"
        />
      </label>
      <ErrorMessage class="text-red-600" name="tos" />
    </div>
    <button
      type="submit"
      class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700"
      :disabled="registerInProgress"
    >
      Submit
    </button>
  </VeeForm>
</template>

<script>
import AppAuthFeedbackInfo from '../AuthFeedbackInfo/AppAuthFeedbackInfo.vue'
import { mapActions } from 'pinia'
import useUserStore from '@/stores/User/user'

export default {
  name: 'RegisterForm',
  data() {
    return {
      schema: {
        name: 'required|min:3|max:100|alphaSpaces',
        email: 'required|min:3|max:100|email',
        age: 'required|minValue:18|maxValue: 300',
        password: 'required|min:9|max:100|exclude:password',
        confirmPassword: 'passwordMismatch:@password',
        country: 'required|countryExclude:Antarctica',
        tos: 'tos'
      },
      userData: {
        country: 'USA'
      },
      registerInProgress: false,
      registerShowAlert: false,
      registerAlertVariant: '',
      registerAlertMessage: ''
    }
  },
  components: {
    AppAuthFeedbackInfo
  },
  methods: {
    ...mapActions(useUserStore, {
      createUser: 'register'
    }),
    async register(values) {
      this.registerShowAlert = true
      this.registerInProgress = true
      this.registerAlertVariant = 'bg-blue-500'
      this.registerAlertMessage = 'Please wait, your account is being created.'

      try {
        await this.createUser(values)
      } catch (error) {
        this.registerInProgress = false
        this.registerAlertVariant = 'bg-red-500'
        this.registerAlertMessage = 'An unexpected error occured. Please, try again.'

        return
      }

      this.registerAlertVariant = 'bg-green-500'
      this.registerAlertMessage = 'Account created succesfully'
      window.location.reload()
    }
  }
}
</script>
