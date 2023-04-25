import { defineStore } from 'pinia'

// Pinia uses the defineStore function to create a store, a "hub" for a specific type of data
export default defineStore('modal', {
  // Here we define the state that we want to use/propagate to other components
  state: () => ({
    isOpen: false
  }),
  /** 
    Getters are the equivalent of computed values but for Pinia's stores. 
    It helps caching the application's state, and is only called again when the state value is 
    changed.
    It always receives the state as the first argument and always returns a value.
  */
  getters: {
    hiddenClass(state) {
      return !state.isOpen ? 'hidden' : ''
    }
  }
})
