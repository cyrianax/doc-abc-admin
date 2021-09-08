export default [
  {
    path: '/login',
    component: () => import('@/views/common/Login/index.vue')
  },
  { 
    path: '/:pathMatch(.*)*', 
    component: () => import('@/views/common/NotFound/index.vue') 
  },
]
