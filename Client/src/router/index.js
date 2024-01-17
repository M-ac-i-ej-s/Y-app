import { createRouter, createWebHistory } from 'vue-router'
import WelcomePage from '../views/WelcomePage.vue'
import MainPage from '../views/MainPage.vue'
import HomePage from '../views/HomePage.vue'
import ExplorePage from '../views/ExplorePage.vue'
import BookmarksPage from '../views/BookmarksPage.vue'
import BlockedUsersPage from '../views/BlockedUsersPage.vue'
import ProfilePage from '../views/ProfilePage.vue'
import ExpandedPostPage from '../views/ExpandedPostPage.vue'
import ShowFollowPage from '../views/ShowFollowPage.vue'
import ErrorPage from '../views/ErrorPage.vue'

const routes = [
  {
    path: '/',
    name: 'WelcomePage',
    component: WelcomePage,
  },
  {
    path: '/errorpage',
    name: 'Error',
    component: ErrorPage
  },
  {
    path: '/',
    name: 'MainPage',
    component: MainPage,
    children: [
      {
        path: '/home',
        name: 'Home',
        component: HomePage
      },
      {
        path: '/explore',
        name: 'Explore',
        component: ExplorePage
      },
      {
        path: '/:id/bookmarks',
        name: 'Booksmarks',
        component: BookmarksPage
      },
      {
        path: '/:id/blockedUsers',
        name: 'BlockedUsers',
        component: BlockedUsersPage
      },
      {
        path: '/:username',
        name: 'Profile',
        component: ProfilePage
      },
      {
        path: '/:username/:id',
        name: 'Post',
        component: ExpandedPostPage
      },
      {
        path: '/:username/followers',
        name: 'Followers',
        component: ShowFollowPage
      },
      {
        path: '/:username/following',
        name: 'Following',
        component: ShowFollowPage
      },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router