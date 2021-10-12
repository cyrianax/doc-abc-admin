import { useRoute } from 'vue-router'
import storage from '@/utils/storage'

const menu = [
  {
    icon: 'nav-dashboard',
    path: '/dashboard',
    public: true
  },
  {
    name: '文档管理',
    icon: 'nav-content',
    path: '/content',
    children: [
      {
        label: '文档',
        path: '/content/document'
      },
      {
        label: '类型',
        path: '/content/type'
      },
      {
        label: '标签',
        path: '/content/tag'
      },
    ]
  },
  {
    icon: 'nav-collect',
    path: '/collect'
  },
  {
    icon: 'nav-site',
    path: '/site'
  },
  {
    icon: 'nav-server',
    path: '/server'
  },
  {
    name: '系统管理',
    icon: 'nav-setting',
    path: '/system',
    children: [
      {
        label: '用户',
        path: '/system/user'
      },
      {
        label: '角色',
        path: '/system/role'
      },
      {
        label: '权限',
        path: '/system/permission'
      },
    ]
  }
]

const getUserModules = () => menu.filter(module => storage.user.permissions.find(permission => permission.path === module.path) || module.public)
const getCurrentModule = (userModules, route) => userModules.find(module => route.path.match(module.path))
const getCurrentMenuItem = (menu = [], route) => menu.find(item => route.path.match(item.path))

export const useModule = () => {
  const route = useRoute()
  const userModules = getUserModules()
  const currentModule = getCurrentModule(userModules, route)

  return [
    userModules, 
    currentModule
  ]
}

export const useMenu = () => {
  const route = useRoute()
  const userModules = getUserModules()
  const currentModule = getCurrentModule(userModules, route)
  const currentMenuItem = getCurrentMenuItem(currentModule.children, route)

  return currentMenuItem
}