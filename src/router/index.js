// router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import PodcastList from '../components/PodcastList.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: PodcastList,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
