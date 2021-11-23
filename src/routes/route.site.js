export default [
  {
    path: '/site',
    component: () => import('@/views/site/Home/index.vue'),
  },
  {
    path: '/site/list',
    component: () => import('@/views/site/List/index.vue'),
  },
]
