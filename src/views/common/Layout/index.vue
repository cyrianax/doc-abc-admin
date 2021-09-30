<template>
  <div class="layout">
    <div class="layout-side">
      <Side/>
    </div>
    <div class="layout-main">
      <div class="layout-top">
        bbb
      </div>
      <div class="layout-container">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script setup>
import Side from './components/Side.vue'
defineExpose({
})
</script>

<style lang="scss" scoped>
.layout {
  display: flex;
  height: 100%;
  align-items: stretch;
  .layout-side {
    background: #fff;
    width: 48px;
    border-right: 1px solid $border;
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