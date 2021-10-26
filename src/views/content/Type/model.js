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
  renameType: data => request({
    url: '/type/rename',
    method: 'put',
    data 
  }),
  removeType: data => request({
    url: '/type',
    method: 'delete',
    data 
  }),
  saveTypeField: data => request({
    url: '/type/fields',
    method: 'put',
    data 
  }),
}