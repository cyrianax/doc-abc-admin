import axios from 'axios'
import { ElLoading } from 'element-plus'
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

export default options => {
  const instance = axios.create({ timeout: 30000 })
  
  const loadingInstance = options.method ? ElLoading.service({ target: '.layout-container', background: 'rgba(0,0,0,0.1)' }) : null
  
  // 请求拦截
  instance.interceptors.request.use(
    config => {
      // 设置服务地址
      config.service = config.service || 'default'
      config.baseURL = serviceMap[config.service]
  
      // 请求头设置Token
      storage.token && (config.headers.token = 'bearer ' + storage.token)
  
      // 加入到请求等待序列
      config.cancelToken = new axios.CancelToken(cancel => {
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
      loadingInstance && loadingInstance.close()
      return Promise.reject(error)
    }
  )
  
  // 响应拦截
  instance.interceptors.response.use(
    response => {
      //   // 响应成功后移除暂未响应请求
      //   this.removePenddingItem({
      //     baseURL: responseConfig.baseURL || '',
      //     url: responseConfig.url || '',
      //     api: responseConfig.service || '',
      //     method: responseConfig.method || '',
      //     canceled: false
      //   })
      loadingInstance && loadingInstance.close()
      return response.data
    },
    error => {
      loadingInstance && loadingInstance.close()
      return Promise.reject(error)
    }
  )

  return instance(options)
}