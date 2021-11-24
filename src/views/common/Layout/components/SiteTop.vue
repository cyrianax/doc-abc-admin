<template>
  <div class="site-top">
    <div class="site-name">
      <!-- {{props.name}} -->
      <app-icon name="arrow-down" class="follow-icon"/>
    </div>
    <div class="site-menu">
      <div class="menu-item" :class="{ 'active': state.currentMenuItem.path === item.path }" v-for="item in props.menu" :key="item.path" @click="handler.selectMenu(item)">
        {{item.label}}
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useMenu } from '../use.module'

const router = useRouter()
const route = useRoute()
const currentMenuItem = useMenu()

const props = defineProps({
  menu: {
    type: Array,
    required: true,
  }
})

const state = reactive({
  currentMenuItem: currentMenuItem || {}
})

const handler = {
  selectMenu (item) {
    router.push(item.path)
  }
}

watch(route, () => {
  state.currentMenuItem = props.menu.find(item => {
    return route.path.match(item.path)
  })
})

defineExpose({
  props,
  state,
  handler
})
</script>

<style lang="scss" scoped>
.site-top {
  display: flex;
  height: 100%;

  .site-name {
    font-size: 14px;
    display: flex;
    align-items: center;
    padding: 0 16px;
    color: #999;

    .follow-icon {
      fill: #999;
      font-size: 10px;
      margin-left: 8px;
    }
  }

  .site-menu {
    height: 100%;
    display: flex;
    justify-content: center;

    >.menu-item {
      display: flex;
      align-items: center;
      height: 100%;
      padding: 0 32px;
      font-size: 14px;
      position: relative;
      cursor: pointer;

      &.active {
        color: $primary;
        
        &::after {
          content: '';
          display: block;
          height: 2px;
          background: $primary;
          position: absolute;
          bottom: -1px;
          left: 0;
          right: 0;
        }
      }
    }
  }
}

</style>