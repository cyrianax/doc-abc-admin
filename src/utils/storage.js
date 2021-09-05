const storage = new Proxy(window.localStorage, {
  set (obj, prop, value) {
    obj[prop] = (typeof value !== 'string') ? JSON.stringify(value) : value
    return obj[prop]
  },
  get (obj, prop) {
    try {
      return JSON.parse(obj[prop])
    } catch (error) {
      return obj[prop]
    }
  }
})

export default storage