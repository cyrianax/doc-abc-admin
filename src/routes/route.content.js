export default [
  {
    path: '/content/type',
    component: () => import('@/views/content/Type/index.vue'),
    meta: { title: '用户' }
  },
  {
    path: '/content/document',
    component: () => import('@/views/content/Document/index.vue'),
    meta: { title: '用户' }
  },
  {
    path: '/content/document/list',
    component: () => import('@/views/content/DocumentList/index.vue'),
  },
  {
    path: '/content/tag',
    component: () => import('@/views/content/Type/index.vue'),
    meta: { title: '用户' }
  },
]
