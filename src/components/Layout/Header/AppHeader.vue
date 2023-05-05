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
            <RouterLink class="px-2 text-white" :to="{ name: 'About' }">About</RouterLink>
          </li>
          <li v-if="!userLoggedIn">
            <RouterLink
              class="px-2 text-white"
              :to="{ name: 'Home' }"
              @click.prevent="toggleAuthModal"
              exact-active-class="no-active"
            >
              Login / Register
            </RouterLink>
          </li>
          <template v-else>
            <li>
              <RouterLink class="px-2 text-white" :to="{ name: 'Manage' }">Manage</RouterLink>
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
      </div>
    </nav>
  </header>
</template>

<script>
/**
  The mapStores function is important to register/use stores and their data in the Options API,
  be it state or methods.
  On the other hand, if you only need to access or modify state using methods from the component
  you can use the mapState or mapWritableState functions to register the store.
  The mapState function turn the state into a readonly variable, so it can not be modified.
  The mapWritableState function lets us modify the State as much as we want.
  The mapActions function lets us implements the action methods defined inside our store that helps us 
  handle and mutate the global state contained inside each store.
*/
import {
  mapState,
  mapActions,
  mapWritableState
  // mapStores,
  // mapWritableState
} from 'pinia'
import useModalStore from '@/stores/Modal/modal.js'
import useUserStore from '@/stores/User/user.js'

export default {
  name: 'AppHeader',
  // Registers stores to be used
  computed: {
    // Needs to pass only the store
    // ...mapStores(useModalStore),
    // Needs to pass both store and the state we want to use (same case with mapWritableState function)
    ...mapState(useUserStore, ['userLoggedIn']),
    ...mapWritableState(useModalStore, ['isOpen'])
  },
  methods: {
    /**
      Needs to pass both store and the function we want to use
      In this case, since actions can be asynchronous, we need to pass mapActions inside the methods
      object. 
    */
    ...mapActions(useUserStore, ['logout']),
    toggleAuthModal() {
      /** 
        If we use the mapState functions, we can simply use the property without calling the store 
        through dot notation 
      */
      this.isOpen = !this.isOpen
    }
  }
}
</script>
