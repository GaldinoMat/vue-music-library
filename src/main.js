import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import VeeValidatePlugin from './includes/validation'

import './assets/base.css'
import './assets/main.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
// Custom plugin to install third party dependencies
/**
  The app.use function can also use a second argument, which is an object that we 
  would like to provide the plugin
*/
app.use(VeeValidatePlugin)

app.mount('#app')
