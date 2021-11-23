import request from '@/utils/request'

export default {
  getSiteList: () => request({
    url: '/site',
  }),
}