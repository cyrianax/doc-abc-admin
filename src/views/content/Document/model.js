import request from '@/utils/request'

export default {
  getDocumentTypes: () => request({
    url: '/content/type',
  }),
}