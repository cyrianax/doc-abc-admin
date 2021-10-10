<template>
  <div class="module-title">
    <div class="module-name">{{props.name}}</div>
    <div class="module-menu">
      <div class="menu-item" :class="{ 'active': state.currentMenuItem.path === item.path }" v-for="item in props.menu" :key="item.path" @click="handler.selectMenu(item)">
        {{item.label}}
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useMenu } from '../use.module'

const router = useRouter()
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
    state.currentMenuItem = item
    router.push(item.path)
  }
}

defineExpose({
  props,
  state,
  handler
})
</script>

<style lang="scss" scoped>
.module-title {
  display: flex;
  
  .module-menu {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    >.menu-item {
      padding: 0 16px;
      font-size: 14px;

      &.active {
        border-bottom: 3px solid green;
      }
    }
  }
}

</style>