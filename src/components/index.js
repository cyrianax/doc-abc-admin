import 'virtual:svg-icons-register'
// import 'element-plus/dist/index.css'

import '@/assets/theme/element-plus-green/index.css'
import '@/assets/styles/element.scss'

import {
  ElTable,
  ElTableColumn,
  ElTree,
  ElButton,
  ElButtonGroup,
  ElDialog,
  ElForm,
  ElFormItem,
  ElInput,
  ElSelect,
  ElOption,
  ElPopover,
  ElCheckbox
} from 'element-plus'

import Icon from './Icon/index.vue'
import View from './View/index.vue'
import Block from './Block/index.vue'
import List from './List/index.vue'


export default {
  install (app) {
    app.component('app-icon', Icon)
    app.component('app-view', View)
    app.component('app-block', Block)
    app.component('app-list', List)

    app.config.globalProperties.$ELEMENT = { size: 'mini', zIndex: 3000 }

    const ElementPlus = [
      ElTable,
      ElTableColumn,
      ElTree,
      ElButton,
      ElButtonGroup,
      ElDialog,
      ElForm,
      ElFormItem,
      ElInput,
      ElSelect,
      ElOption,
      ElPopover,
      ElCheckbox
    ]

    ElementPlus.forEach(component => {
      app.component(component.name, component)
    })
  }
}