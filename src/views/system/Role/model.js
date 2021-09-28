import request from '@/utils/request'

export default {
  async getRoles () {
    const result = await request({
      url: '/role',
    })
    return result
  },
  saveRole: data => request({
    url: '/role/save',
    method: 'post',
    data
  }),
  updateRolePermission: data => request({
    url: '/role/updatePermissions',
    method: 'put',
    data
  }),
  removeRole: _id => request({
    url: '/role',
    method: 'delete',
    data: { _id }
  }),
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
}