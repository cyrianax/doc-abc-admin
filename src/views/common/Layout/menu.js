export default [
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