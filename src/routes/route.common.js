export default [
  {
    name: 'main',
    path: '/',
    component: () => import('@/views/common/Layout/index.vue')
  },
  {
    path: '/login',
    component: () => import('@/views/common/Login/index.vue')
  },
  { 
    path: '/:pathMatch(.*)*', 
    component: () => import('@/views/common/NotFound/index.vue') 
  },
]
