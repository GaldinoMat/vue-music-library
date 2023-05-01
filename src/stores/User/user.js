import { defineStore } from 'pinia'
import { auth, usersCollection } from '@/includes/firebase'

export default defineStore('user', {
  state: () => ({
    userLoggedIn: false
  }),
  /**
    Common in the Flux architecture, actions can be used to reduce code in our components and delegate
    specific logic to methods in out stores. The general rule of thumb is:
    If the logic modifies a global state, it should be implemented in an action (reducer for the Redux lib).
    If not, then it should be implemented in the component.
   */
  actions: {
    async register(values) {
      // Creates user in authentication service in firebase using email and password method
      const userCredentials = await auth.createUserWithEmailAndPassword(
        values.email,
        values.password
      )

      // Adds user's info to database collection
      await usersCollection.doc(userCredentials.user.uid).set({
        name: values.name,
        email: values.email,
        age: values.age,
        country: values.country
      })

      await userCredentials.user.updateProfile({
        displayName: values.name
      })

      this.userLoggedIn = true
    },
    async authenticate(values) {
      // Log ins the user with email and password
      await auth.signInWithEmailAndPassword(values.email, values.password)

      this.userLoggedIn = true
    },
    async logout() {
      // Logs out current user
      await auth.signOut()

      this.userLoggedIn = false
    }
  }
})
