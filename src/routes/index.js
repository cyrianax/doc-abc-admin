import { createRouter, createWebHashHistory } from 'vue-router'
import storage from '@/utils/storage'

import commonRoutes from './route.common'
import systemRoutes from './route.system'
import contentRoutes from './route.content'

const dynamicRoutes = [
  ...systemRoutes,
  ...contentRoutes
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
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

const getUserRouteConfig = () => {
  const permissions = storage.user ? storage.user.permissions.filter(permission => permission.type === '页面') : []
  const eachPermissions = parent => {
    const list = permissions.filter(item => item.parent === parent)
    list.length && list.forEach(item => {
      const children = eachPermissions(item._id)
      item.children = children.length ? children : undefined
    })
    return list
  }
  return eachPermissions()
}

export const addUserRoutes = () => {
  const userRouteConfig = getUserRouteConfig()
  const eachRouteConfig = routes => {
    routes.forEach(config => {
      const findResult = dynamicRoutes.find(route => route.path === config.path)

      const route = findResult
        ? {
          name: findResult.path,
          ...findResult
        }
        : {
          name: config.path,
          path: config.path,
          redirect: config.children ? config.children[0].path : undefined
        }

      router.addRoute('main', route)
      config.children && eachRouteConfig(config.children)
    })
  }
  eachRouteConfig(userRouteConfig)
}

export const removeUserRoutes = () => {
  const userRouteConfig = getUserRouteConfig()
  const eachRouteConfig = routes => {
    routes.forEach(config => {
      router.removeRoute(config.path)
      config.children && eachRouteConfig(config.children)
    })
  }
  eachRouteConfig(userRouteConfig)
}

addUserRoutes()