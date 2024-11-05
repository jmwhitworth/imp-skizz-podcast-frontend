import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// Add the icon to the library so you can use it in your page
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faArrowUpRightFromSquare,
  faArrowUp,
  faArrowDown,
  faMugSaucer,
} from '@fortawesome/free-solid-svg-icons'
import {
  faYoutube,
  faSpotify,
  faApple,
  faPatreon,
} from '@fortawesome/free-brands-svg-icons'
library.add(
  faArrowUpRightFromSquare,
  faArrowUp,
  faArrowDown,
  faMugSaucer,
  faYoutube,
  faSpotify,
  faApple,
  faPatreon,
)

createApp(App)
  .use(router)
  .component('font-awesome-icon', FontAwesomeIcon)
  .mount('#app')
