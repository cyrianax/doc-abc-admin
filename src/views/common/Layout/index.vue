<template>
  <div class="layout">
    <div class="layout-side">
      <Side :modules="state.modules" @click="handler.selectModule"/>
    </div>
    <div class="layout-main">
      <div class="layout-top" v-if="state.moduleMenu.length">
        <Module :name="state.module.name" :menu="state.module.menu"/>
      </div>
      <div class="layout-container">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script setup>
import Side from './components/Side.vue'
import ModuleMenu from './components/ModuleMenu.vue'

import { reactive } from 'vue'
import menu from './menu'
import storage from '@/utils/storage'

const setUserModules = () => menu.filter(module => {
  return storage.user.permissions.find(permission => permission.path === module.path) || module.public
})

const state = reactive({
  modules: setUserModules(),
  moduleMenu: []
})

const handler = {
  selectModule (module) {
    state.moduleMenu = module.children
  }
}

defineExpose({
  state,
  handler
})
</script>

<style lang="scss" scoped>
.layout {
  display: flex;
  height: 100%;
  align-items: stretch;
  .layout-side {
    background: $primary;
    width: 48px;
    flex-shrink: 0;
    border-right: 1px solid rgba(0, 0, 0, 0.03);
  }
  .layout-main {
    flex: auto;
    display: flex;
    flex-direction: column;

    .layout-top {
      height: 40px;
      background: #fff;
      border-bottom: 1px solid $border;
    }

    .layout-container {
      flex: auto;
      background: #f1f1f1;
    }
  }
}
</style>