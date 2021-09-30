import 'virtual:svg-icons-register'
import 'element-plus/dist/index.css'
import {
  ElTable,
  ElTableColumn,
  ElTree,
  ElButton,
  ElDialog,
  ElForm,
  ElFormItem,
  ElInput,
  ElSelect,
  ElOption,
} from 'element-plus'

import Icon from './Icon/index.vue'
import View from './View/index.vue'
import Block from './Block/index.vue'

export default {
  install (app) {
    app.component('app-icon', Icon)
    app.component('app-view', View)
    app.component('app-block', Block)

    app.config.globalProperties.$ELEMENT = { size: 'mini', zIndex: 3000 }

    const ElementPlus = [
      ElTable,
      ElTableColumn,
      ElTree,
      ElButton,
      ElDialog,
      ElForm,
      ElFormItem,
      ElInput,
      ElSelect,
      ElOption,
    ]

    ElementPlus.forEach(component => {
      app.component(component.name, component)
    })
  }
}