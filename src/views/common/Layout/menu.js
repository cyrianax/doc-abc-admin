export default [
  {
    icon: 'nav-dashboard',
    path: '/dashboard',
    public: true
  },
  {
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
]