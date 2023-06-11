<template>
  <AppAuthFeedbackInfo
    :actionShowAlert="registerShowAlert"
    :actionAlertVariant="registerAlertVariant"
    :actionAlertMessage="registerAlertMessage"
  />
  <VeeForm :validationSchema="schema" @submit="register" :initial-values="userData">
    <!-- Name -->
    <div class="mb-3">
      <label class="inline-block mb-2">{{ $t('register.name') }}</label>
      <VeeField
        name="name"
        type="text"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        :placeholder="$t(`register.namePlaceholder`)"
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
        :placeholder="$t(`register.emailPlaceholder`)"
      />
      <ErrorMessage class="text-red-600" name="email" />
    </div>
    <!-- Age -->
    <div class="mb-3">
      <label class="inline-block mb-2">{{ $t('register.age') }}</label>
      <VeeField
        name="age"
        type="number"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
      />
      <ErrorMessage class="text-red-600" name="age" />
    </div>
    <!-- Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">{{ $t('register.password') }}</label>
      <VeeField name="password" :bails="false" v-slot="{ field, errors }">
        <input
          type="password"
          class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
          :placeholder="$t(`register.passwordPlaceholder`)"
          v-bind="field"
        />
        <div class="text-red-600" v-for="error in errors" :key="error">
          {{ error }}
        </div>
      </VeeField>
    </div>
    <!-- Confirm Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">{{ $t('register.passwordConfirmation') }}</label>
      <VeeField
        name="confirmPassword"
        type="password"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        :placeholder="$t(`register.passwordConfirmationPlaceholder`)"
      />
      <ErrorMessage class="text-red-600" name="confirmPassword" />
    </div>
    <!-- Country -->
    <div class="mb-3">
      <label class="inline-block mb-2">{{ $t('register.country') }}</label>
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
    <div class="mb-3 pl-6">
      <VeeField
        name="tos"
        type="checkbox"
        class="w-4 h-4 float-left -ml-6 mt-1 rounded"
        value="true"
      />
      <i18n-t class="inline-block" keypath="register.accept" tag="label">
        <a href="">{{ $t('register.tos') }}</a>
      </i18n-t>
      <ErrorMessage class="text-red-600" name="tos" />
    </div>
    <button
      type="submit"
      class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700"
      :disabled="registerInProgress"
    >
      {{ $t('register.submit') }}
    </button>
  </VeeForm>
</template>

<script setup>
import { ref } from 'vue'
import AppAuthFeedbackInfo from '../AuthFeedbackInfo/AppAuthFeedbackInfo.vue'
import useUserStore from '@/stores/User/user'

const schema = {
  name: 'required|min:3|max:100|alphaSpaces',
  email: 'required|min:3|max:100|email',
  age: 'required|minValue:18|maxValue: 300',
  password: 'required|min:9|max:100|exclude:password',
  confirmPassword: 'passwordMismatch:@password',
  country: 'required|countryExclude:Antarctica',
  tos: 'tos'
}

const userData = {
  country: 'USA'
}

let registerInProgress = ref(false)
let registerShowAlert = ref(false)
let registerAlertVariant = ref('')
let registerAlertMessage = ref('')

const { register: createUser } = useUserStore()

const register = async (values) => {
  registerShowAlert.value = true
  registerInProgress.value = true
  registerAlertVariant.value = 'bg-blue-500'
  registerAlertMessage.value = 'Please wait, your account is being created.'

  try {
    await createUser(values)
  } catch (error) {
    registerInProgress.value = false
    registerAlertVariant.value = 'bg-red-500'
    registerAlertMessage.value = 'An unexpected error occured. Please, try again.'

    console.error(error)

    return
  }

  registerAlertVariant.value = 'bg-green-500'
  registerAlertMessage.value = 'Account created succesfully'
  window.location.reload()
}
</script>
