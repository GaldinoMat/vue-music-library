import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from '@/App.vue'
import router from '@/router'
import VeeValidatePlugin from '@/includes/validation'
import { auth } from '@/includes/firebase'
import ProgressBar from '@/includes/nprogress'

import i18n from '@/includes/i18n'

import { registerSW } from 'virtual:pwa-register'

import '@/assets/base.css'
import '@/assets/main.css'
import 'nprogress/nprogress.css'

registerSW({ immediate: true })

ProgressBar(router)

let app

// Early initialization of firebase for logged in state persistence
auth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App)

    app.use(createPinia())
    app.use(router)

    /**
      Custom plugins to install third party dependencies
      The app.use function can also use a second argument, which is an object that we 
      would like to provide the plugin
    */
    app.use(VeeValidatePlugin)
    app.use(i18n)

    app.mount('#app')
  }
})
