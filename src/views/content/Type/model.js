import request from '@/utils/request'

export default {
  getTypes: () => request({
    url: '/type',
  }),
  createType: data => request({
    url: '/type',
    method: 'post',
    data
  }),
}