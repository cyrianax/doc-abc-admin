<template>
  <div class="module-title">
    <div class="module-name">{{props.name}}</div>
    <div class="module-menu">
      <div class="menu-item" v-for="item in props.menu" :key="item.path">
        {{item.label}}
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

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

defineExpose({
  props,
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
    }
  }
}

</style>