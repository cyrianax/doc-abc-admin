import request from '@/utils/request'

export default {
  getRoles: () => request({
    url: '/role',
  }),
  getUsers: () => request({
    url: '/user',
  }),
  saveUser: data => request({
    url: '/user/save',
    method: 'post',
    data
  }),
  removeUsers: ids => request({
    url: '/user',
    method: 'delete',
    data: { ids }
  }),
}