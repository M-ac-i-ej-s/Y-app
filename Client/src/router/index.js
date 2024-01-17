import { createRouter, createWebHistory } from 'vue-router'
import WelcomePage from '../views/WelcomePage.vue'
import MainPage from '../views/MainPage.vue'
import HomeComponent from '../components/HomeComponent.vue'
import ExploreComponent from '../components/ExploreComponent.vue'
import BookmarksComponent from '../components/BookmarksComponent.vue'
import BlockedUsersComponent from '../components/BlockedUsersComponent.vue'
import ProfileComponent from '../components/ProfileComponent.vue'
import ExpandedPostComponent from '../components/ExpandedPostComponent.vue'
import ShowFollowComponent from '../components/ShowFollowComponent.vue'
import ErrorPageComponent from '../components/ErrorPageComponent.vue'

const routes = [
  {
    path: '/',
    name: 'WelcomePage',
    component: WelcomePage,
  },
  {
    path: '/errorpage',
    name: 'Error',
    component: ErrorPageComponent
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
      {
        path: '/:username/:id',
        name: 'Post',
        component: ExpandedPostComponent
      },
      {
        path: '/:username/followers',
        name: 'Followers',
        component: ShowFollowComponent
      },
      {
        path: '/:username/following',
        name: 'Following',
        component: ShowFollowComponent
      },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router