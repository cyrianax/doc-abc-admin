import request from '@/utils/request'

export default {
  async getPermissions () {
    const result = await request({
      url: '/permission',
    })

    const fn = parent => {
      const list = result.filter(item => item.parent === parent)
      list.length && list.forEach(item => {
        const children = fn(item._id)
        item.children = children.length ? children : undefined
      })
      return list
    }

    return fn()
  },
  createPermission: data => request({
    url: '/permission',
    method: 'post',
    data
  }),
  updatePermission: data => request({
    url: '/permission',
    method: 'put',
    data
  }),
  removePermissions: permission => {
    const fn = permission => {
      permission.children = permission.children || []
      return permission.children.reduce((list, item) => {
        return list.concat(fn(item))
      }, [permission._id])
    }

    return request({
      url: '/permission',
      method: 'delete',
      data: { 
        ids: fn(permission)
      }
    })
  }
}