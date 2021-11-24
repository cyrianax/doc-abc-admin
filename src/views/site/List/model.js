import request from '@/utils/request'

export default {
  getSiteList: () => request({
    url: '/site',
  }),
  createSite: data => request({
    url: '/site',
    method: 'post',
    data
  }),
}