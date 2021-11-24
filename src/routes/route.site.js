export default [
  {
    path: '/site',
    component: () => import('@/views/site/List/index.vue'),
  },
  {
    path: '/site/home',
    component: () => import('@/views/site/Home/index.vue'),
  },
]
