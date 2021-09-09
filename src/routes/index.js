import { createRouter, createWebHashHistory } from 'vue-router'
import storage from '@/utils/storage'

import commonRoutes from './route.common'
import systemRoutes from './route.system'
import contentRoutes from './route.content'

const moduleRoutes = [
  ...systemRoutes,
  ...contentRoutes
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '',
    },
    ...commonRoutes,
  ]
})

const publicList = [
  '/login',
]

router.beforeEach(async to => {
  const isPublicPath = publicList.indexOf(to.path) > -1
  return storage.token
    ? isPublicPath ? '/' : true
    : isPublicPath ? true : `/login?redirect=${encodeURIComponent(to.path)}`
})

export default router