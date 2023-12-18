import { createRouter, createWebHistory } from 'vue-router'
import WelcomePage from '../views/WelcomePage.vue'
import HomePage from '../views/HomePage.vue'

const routes = [
  {
    path: '/',
    name: 'WelcomePage',
    component: WelcomePage
  },
  {
    path: '/home',
    name: 'HomePage',
    component: HomePage
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router