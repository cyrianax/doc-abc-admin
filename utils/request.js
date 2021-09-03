import axios from 'axios'
import storage from './storage'

const serviceMap = {
  default: import.meta.env.VITE_API_SERVICE
}

const penddingRequest = {
  list: [],
  removeRepeat () {

    const list = this.find({
      url: config.baseURL + config.url,
      method: config.method
    })
  },
  find ({ url, method }) {
    return this.list.filter(request => (request.url === url && request.method === method))
  }
}

const cancelPenddingItem = request => {
  if (request.cancel) {
    request.cancel({ request, code: '409', msg: true })
    request.canceled = true
    // this.removePenddingItem(request) // 在响应错误执行移除
  }
}
const removePenddingItem = request => {
  const index: number = this.penddingList.findIndex(item => {
    return item.baseURL === request.baseURL && item.url === request.url &&
      item.api === request.api && item.method === request.method && item.canceled === request.canceled
  })
  if (index > -1) this.penddingList.splice(index, 1)
}

const cancelAll = (showMsg = false) => {
  penddingList.forEach(item => {
    if (item.cancel) item.cancel({ request: item, code: '409', msg: showMsg })
  })
}
const cancelRequest = params => {
  const requestItem = this.getPenddingItem(params)
  if (requestItem.length > 1) this.cancelPenddingItem(requestItem[requestItem.length - 1])
}



const instance = axios.create({
  timeout: config.timeout || 5000,
})

instance.interceptors.request.use(
  config => {
    // 服务地址
    config.service = config.service || 'default'
    config.baseURL = serviceMap[config.service]

    // JWT token
    storage.token && (config.headers.token = 'bearer ' + storage.token)

    config.cancelToken = new CancelToken(cancel => {
      penddingRequest.list.push({
        config,
        cancel,
        canceled: false
      })
    })

    config.repeatable && penddingRequest.removeRepeat({
      url: config.baseURL + config.url,
      method: config.method
    })

    return config
  },
  error => {
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  response => {
    return response
  },
  error => {
    return Promise.reject(error)
  }
)

export const cancel = () => {}

export default request