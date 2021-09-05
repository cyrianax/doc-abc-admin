import axios from 'axios'
import storage from './storage'

const serviceMap = {
  default: import.meta.env.VITE_API_SERVICE
}

export const penddingRequest = {
  list: [],
  unique ({ url, method }) {
    const list = this.find({ url, method })
    list.length > 1 && list[list.length - 1].cancel()
  },
  find ({ url, method }) {
    return this.list.filter(request => (request.url === url && request.method === method))
  },
  append ({ url, method }) {
    this.list.push({ url, method, canceled: false })
  },
  remove () {

  },
  cancel (list) {
    this.list.forEach(request => request.cancel())
  }
}

export default () => {
  const instance = axios.create({ timeout: 30000 })
  
  // 请求拦截
  instance.interceptors.request.use(
    config => {
      // 设置服务地址
      config.service = config.service || 'default'
      config.baseURL = serviceMap[config.service]
  
      // 请求头设置Token
      storage.token && (config.headers.token = 'bearer ' + storage.token)
  
      // 加入到请求等待序列
      config.cancelToken = new CancelToken(cancel => {
        penddingRequest.append({ config, cancel })
      })
  
      // 取消重复请求
      config.unique && penddingRequest.unique({
        url: config.baseURL + config.url,
        method: config.method
      })
  
      return config
    },
    error => {
      return Promise.reject(error)
    }
  )
  
  // 响应拦截
  instance.interceptors.response.use(
    response => {
      return response
    },
    error => {
      return Promise.reject(error)
    }
  )

  return instance
}