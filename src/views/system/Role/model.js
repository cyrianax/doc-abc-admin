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