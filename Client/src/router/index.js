import { createRouter, createWebHistory } from 'vue-router'
import WelcomePage from '../views/WelcomePage.vue'
import MainPage from '../views/MainPage.vue'
import HomeComponent from '../components/HomeComponent.vue'
import ExploreComponent from '../components/ExploreComponent.vue'
import BookmarksComponent from '../components/BookmarksComponent.vue'
import BlockedUsersComponent from '../components/BlockedUsersComponent.vue'
import ProfileComponent from '../components/ProfileComponent.vue'

const routes = [
  {
    path: '/',
    name: 'WelcomePage',
    component: WelcomePage,
  },
  {
    path: '/',
    name: 'MainPage',
    component: MainPage,
    children: [
      {
        path: '/home',
        name: 'Home',
        component: HomeComponent
      },
      {
        path: '/explore',
        name: 'Explore',
        component: ExploreComponent
      },
      {
        path: '/:id/bookmarks',
        name: 'Booksmarks',
        component: BookmarksComponent
      },
      {
        path: '/:id/blockedUsers',
        name: 'BlockedUsers',
        component: BlockedUsersComponent
      },
      {
        path: '/:username',
        name: 'Profile',
        component: ProfileComponent
      },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router