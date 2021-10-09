<template>
  <div class="layout">
    <div class="layout-side">
      <Side @select="handler.selectModule"/>
    </div>
    <div class="layout-main">
      <div class="layout-top" v-if="state.module.children.length">
        <ModuleTitle :name="state.module.name" :menu="state.module.children"/>
      </div>
      <div class="layout-container">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script setup>
import Side from './components/Side.vue'
import ModuleTitle from './components/ModuleTitle.vue'

import { reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const state = reactive({
  module: {
    name: '',
    children: []
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
      background: #f5f7fb;
    }
  }
}
</style>