<template>
  <header id="header" class="bg-gray-700">
    <nav class="container mx-auto flex justify-start items-center py-5 px-4">
      <!-- App Name -->
      <a class="text-white font-bold uppercase text-2xl mr-4" href="#">Music</a>

      <div class="flex flex-grow items-center">
        <!-- Primary Navigation -->
        <ul class="flex flex-row mt-1">
          <!-- Navigation Links -->
          <li>
            <a class="px-2 text-white" href="#" @click.prevent="toggleAuthModal"
              >Login / Register</a
            >
          </li>
          <li>
            <a class="px-2 text-white" href="#">Manage</a>
          </li>
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
  The mapWritableState lets us modify the State as much as we want.
*/
import {
  mapStores
  // mapState,
  // mapWritableState
} from 'pinia'
import useModalStore from '@/stores/Modal/modal.js'

export default {
  name: 'AppHeader',
  // Registers stores to be used
  computed: {
    // Needs to pass only the store
    ...mapStores(useModalStore)
    // Needs to pass both store and the state we want to use (same case with mapState function)
    // ...mapWritableState(useModalStore, ['isOpen'])
  },
  methods: {
    toggleAuthModal() {
      /** 
        If we use the mapState functions, we can simply use the property without calling the store 
        through dot notation 
      */
      this.modalStore.isOpen = !this.modalStore.isOpen
    }
  }
}
</script>
