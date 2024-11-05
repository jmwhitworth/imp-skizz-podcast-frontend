import { createRouter, createWebHistory } from 'vue-router'
import home from '@/pages/home.vue'

// Import the Font Awesome icon library for the whole site
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

const routes = [
  {
    path: '/',
    name: 'Home',
    component: home,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
