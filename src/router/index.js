import { createRouter, createWebHistory } from 'vue-router'

import useUserStore from '@/stores/User/user.js'

const HomeView = () => import('@/views/HomeView.vue')
const AboutView = () => import('@/views/AboutView.vue')
const ManageView = () => import('@/views/ManageView.vue')
const SongView = () => import('@/views/SongView.vue')

/** 
  Routes being passed to the router lib 
  Each object must contain the path, which is the path to wich the user is being sent to, and the component
  that will be rendered in that path.
  Optionally, we can define names to each route, which can make easier to change routes freely, and 
  alias/redirects properties, which can be used to redirect the user in case they go to a specific route
*/
const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView
  },
  {
    path: '/manage-music',
    name: 'Manage',
    component: ManageView,
    /**
      The meta property is an arbitrary value that can be used for the route, 
      and is passed to the $route.meta object. We can also access it in the guards using to.meta or 
      from.meta
    */
    meta: {
      requiresAuth: true
    }
    /** 
      This is a component navigation guard, a function that runs logic much like the global guard, 
      but isolated to a component. It receives the smae parameters as the global guard.
      Pay attention when using this type of guard, since it does not have access to the component's 
      "this" 
      beforeEnter: (to, from, next) => {
        next()
      }
    */
  },
  {
    path: '/song/:id',
    name: 'song',
    component: SongView,
    props: {
      default: true,

    },
  },
  {
    path: '/manage',
    redirect: { name: 'Manage' }
  },
  // Here we can use the catchAll path to redirect the user to a 404 page
  {
    path: '/:catchAll(.*)*',
    redirect: { name: 'Home' }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  linkExactActiveClass: 'text-yellow-500'
})

/**
  Here we can define global navigation guards, which can run specific logic before or after the user is 
  redirected to that route.
  It receives three parameters: to, from and next.
  The to parameter contains information to where the user is navigating to. 
  On the other hand, the from parameter has info on the page the user was previously.
  The next parameter is very important because the router will not render the component if we do not call
  the function at some place in our application, finishing the guard's logic.
  Pay attention that this is used EVERY TIME the router is activated.
 
*/
router.beforeEach((to, from, next) => {
  if (!to.meta.requiresAuth) {
    next()
    return
  }

  const store = useUserStore()

  if (store.userLoggedIn) {
    next()
  } else {
    next({ name: 'Home' })
  }
})

export default router
