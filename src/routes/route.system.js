export default [
  {
    path: '/system/user',
    component: () => import('@/views/system/User/index.vue'),
    meta: { title: '用户' }
  },
  {
    path: '/system/role',
    component: () => import('@/views/system/Role/index.vue'),
    meta: { title: '角色' }
  },
  {
    path: '/system/permission',
    component: () => import('@/views/system/Permission/index.vue'),
    meta: { title: '权限' }
  }
]
