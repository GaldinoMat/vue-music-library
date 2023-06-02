import { setActivePinia, createPinia } from 'pinia'
import useUserStore from '@/stores/User/user.js'
import { vi } from 'vitest'

vi.mock('@/includes/firebase', () => ({
  auth: {
    signInWithEmailAndPassword: () => Promise.resolve()
  }
}))

describe('Pinia stores', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should authenticate user', async () => {
    const store = useUserStore()

    expect(store.userLoggedIn).toBe(false)
    await store.authenticate({})
    expect(store.userLoggedIn).toBe(true)
  })
})
