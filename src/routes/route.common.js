export default [
  {
    name: 'main',
    path: '/',
    redirect: '/dashboard',
    component: () => import('@/views/common/Layout/index.vue'),
    children: [
      {
        path: '/dashboard',
        component: () => import('@/views/common/Dashboard/index.vue'),
      }
    ]
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
