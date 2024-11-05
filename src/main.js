import './assets/main.css'

import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router.js'
import { createHead } from '@unhead/vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { RouterLink } from 'vue-router'

createApp(App)
  .use(
    router, // For SPA navigation
    createHead(), // For managing the document head / meta
  )
  .component('font-awesome-icon', FontAwesomeIcon) // Mount the Font Awesome component globally
  .component('router-link', RouterLink) // Mount the Vue Router link component globally
  .mount('#app')
