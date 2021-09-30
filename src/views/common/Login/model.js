import request from '@/utils/request'

export default {
  login: data => request({
    url: '/public/login',
    method: 'post',
    data
  }),
}