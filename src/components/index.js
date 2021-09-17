import 'element-plus/dist/index.css'
import {
  ElTable,
  ElTableColumn,
  ElTree,
} from 'element-plus'

import Icon from './Icon/index.vue'
import Block from './Block/index.vue'
import Panel from './Panel/index.vue'

export default {
  install (app) {
    app.component('app-icon', Icon)
    app.component('app-block', Block)
    app.component('app-panel', Panel)

    app.config.globalProperties.$ELEMENT = { size: 'mini', zIndex: 3000 }

    const ElementPlus = [
      ElTable,
      ElTableColumn,
      ElTree,
    ]

    ElementPlus.forEach(component => {
      app.component(component.name, component)
    })
  }
}