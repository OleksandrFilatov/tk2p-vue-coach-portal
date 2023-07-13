import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/Dashboard/Dashboard.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/app',
    name: 'Dashboard',
    component: Dashboard,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import('../views/Dashboard/Dashboard.vue'),
    children: [
      {
        path: '',
        component: () => import('../views/Programs.vue')
      },
      {
        path: 'programs/:programId',
        component: () => import('../views/CuratedContent.vue')
      },
      {
        path: 'programs/:programId/subscribers',
        component: () => import('../views/ClientPage.vue')
      },
      {
        path: 'programs/:programId/content/:contentId/edit',
        component: () => import('../views/GraphicEditor.vue')
      },
      {
        path: 'programs/:programId/add/:nextItemIndex',
        component: () => import('../views/GraphicEditor.vue')
      },
      {
        path: 'profile',
        component: () => import('../views/CoachProfile.vue')
      },
      {
        path: 'branding',
        component: () => import('../views/Branding/Branding.vue')
      },
      {
        path: 'library',
        component: () => import('../views/BackgroundLibrary.vue')
      },
    ]
  },
  {
    path: '/',
    redirect: "/app"    
  },

  // {
  //   path: '/subscribers',
  //   name: 'Subscribers',
    
  //   component: () => import('../views/Subscribers/Subscribers.vue')
  // },
  // {
  //   path: '/program-detail',
  //   name: 'ProgramDetail',
    
  //   component: () => import('../views/ProgramDetail/ProgramDetail.vue')
  // },
  {
    path: '/login',
    name: 'Login',    
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
