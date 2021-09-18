import request from '@/utils/request'

export default {
  async getPermissions () {
    const result = await request({
      url: '/permission',
    })

    const fn = parent => {
      const list = result.filter(item => item.parent === parent)
      list.length && list.forEach(item => {
        const l = fn(item.id)
        l.length && (item.children = l)
      })
      return list
    }

    return fn()
  },
  createPermission (data) {
    console.log(data);
    return request({
      url: '/permission',
      method: 'post',
      data
    })
  }
}