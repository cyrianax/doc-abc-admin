import request from '@/utils/request'

export default {
  getTypeDetail: _id => request({
    url: '/type/detail',
    params: { _id }
  }),
  getDocByType: params => request({
    url: '/content',
    params: params
  }),
  
}