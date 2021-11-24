<template>
  <div class="layout">
    <div class="layout-side">
      <Side @select="handler.selectModule"/>
    </div>
    <div class="layout-main">
      <div class="layout-top" v-if="topStatus.hasTopMenu">
        <SiteTop :menu="state.module.children" v-if="topStatus.showSiteTop"/>
        <ModuleTop :name="state.module.name" :menu="state.module.children" v-if="topStatus.showModuleTop"/>
      </div>
      <div class="layout-container">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script setup>
import Side from './components/Side.vue'
import ModuleTop from './components/ModuleTop.vue'
import SiteTop from './components/SiteTop.vue'

import { reactive, provide, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useModule } from './use.module'

const route = useRoute()
const router = useRouter()
const [userModules, currentModule] = useModule()

provide('userModules', userModules)
provide('currentModule', currentModule)

const state = reactive({
  module: currentModule || {
    name: '',
    children: []
  },
})

const topStatus = computed(() => {
  const showSiteTop = route.path.match('/site') && route.path !== '/site'
  const showModuleTop = !route.path.match('/site')
  const hasTopMenu = state.module.children && state.module.children.length && (showSiteTop || showModuleTop)
  return {
    hasTopMenu,
    showSiteTop,
    showModuleTop
  }
})

const handler = {
  selectModule (module) {
    state.module = module
    router.push(module.path)
  }
}

defineExpose({
  state,
  handler,
  topStatus
})
</script>

<style lang="scss" scoped>
.layout {
  display: flex;
  height: 100%;
  align-items: stretch;
  .layout-side {
    background: $secondary;
    width: 40px;
    flex-shrink: 0;
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
      background: $bg-gray;
    }
  }
}
</style>