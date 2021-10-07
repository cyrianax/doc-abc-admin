<template>
  <div class="menu">
    <div class="menu-item" v-for="item in state.menu" :key="item.path">
      {{item.label}}
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

const state = reactive({
  menu: [
    {
      label: '用户',
      path: '/system/user'
    },
    {
      label: '角色',
      path: '/system/role'
    },
    {
      label: '权限',
      path: '/system/permission'
    },
  ] 
})

defineExpose({
  state
})
</script>

<style lang="scss" scoped>
.menu {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  >.menu-item {
    padding: 0 16px;
    font-size: 14px;
  }
}
</style>