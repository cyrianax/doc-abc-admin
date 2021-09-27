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
  removeRole: _id => request({
    url: '/role',
    method: 'delete',
    data: { _id }
  })
}