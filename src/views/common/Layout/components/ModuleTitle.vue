<template>
  <div class="module-title">
    <div class="module-name">
      {{props.name}}
      <app-icon name="arrow-right" class="follow-icon"/>
    </div>
    <div class="module-menu">
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
  name: {
    type: String,
    required: true,
  },
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
  state.currentMenuItem = props.menu.find(item => item.path.match(route.path))
})

defineExpose({
  props,
  state,
  handler
})
</script>

<style lang="scss" scoped>
.module-title {
  display: flex;
  height: 100%;

  .module-name {
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

  .module-menu {
    height: 100%;
    display: flex;
    justify-content: center;

    >.menu-item {
      display: flex;
      align-items: center;
      height: 100%;
      padding: 0 16px;
      font-size: 14px;
      position: relative;
      cursor: pointer;

      &.active {
        &::after {
          content: '';
          display: block;
          height: 2px;
          background: $primary;
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
        }
      }
    }
  }
}

</style>