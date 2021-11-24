<template>
  <div class="layout">
    <div class="layout-side">
      <Side @select="handler.selectModule"/>
    </div>
    <div class="layout-main">
      <div class="layout-top" v-if="state.module.children && state.module.children.length">
        <SiteTop :menu="state.module.children" v-if="state.topbar ==='site' && state.currentSite"/>
        <ModuleTop :name="state.module.name" :menu="state.module.children" v-if="state.topbar === 'module'"/>
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

import { reactive, provide, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useModule } from './use.module'
import storage from '../../../utils/storage'

const route = useRoute()
const router = useRouter()
const [userModules, currentModule] = useModule()

provide('userModules', userModules)
provide('currentModule', currentModule)

const getTopbarType = () => {
  return route.path.match('/site') ? 'site' : 'module'
}

const state = reactive({
  module: currentModule || {
    name: '',
    children: []
  },
  topbar: getTopbarType(),
  currentSite: storage.currentSite
})

watch(
  () => route.path,
  async () => {
    state.topbar = getTopbarType()
    state.currentSite = storage.currentSite
    console.log(state.topbar);
    console.log(state.currentSite);
  }
)

const handler = {
  selectModule (module) {
    state.module = module
    router.push(module.path)
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