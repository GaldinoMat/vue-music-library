<template>
  <VeeForm v-show="tab === 'register'" :validationSchema="schema">
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
      <VeeField
        name="password"
        type="password"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Password"
      />
      <ErrorMessage class="text-red-600" name="password" />
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
      <select
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
      >
        <option value="USA">USA</option>
        <option value="Mexico">Mexico</option>
        <option value="Germany">Germany</option>
      </select>
    </div>
    <!-- TOS -->
    <div class="mb-3 pl-6">
      <input type="checkbox" class="w-4 h-4 float-left -ml-6 mt-1 rounded" />
      <label class="inline-block">Accept terms of service</label>
    </div>
    <button
      type="submit"
      class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700"
    >
      Submit
    </button>
  </VeeForm>
</template>

<script>
export default {
  data() {
    return {
      schema: {
        name: 'required|min:3|max:100|alphaSpaces',
        email: 'required|min:3|max:100|email',
        age: 'required|minValue:18|maxValue: 300',
        password: 'required|min:3|max:100|',
        confirmPassword: 'confirmed:@password',
        country: '',
        tos: ''
      }
    }
  },
  props: { tab: String }
}
</script>
