<template>
  <div class="app-block" :class="{ 'app-block-solid': solid }" :style="{ width: width, flex: width ? `0 1 ${width}` : 'auto' }">
    <div class="app-block-title" v-if="title">
      <label>{{title}}</label>
      <slot name="control"></slot>
    </div>
    <div class="app-block-container">
      <slot/>
    </div>
  </div>
</template>

<script setup>
defineProps({
  solid: Boolean,
  title: String,
  width: String
})
</script>

<style lang="scss" scoped>
.app-block {
  background: #fff;

  >.app-block-title {
    font-size: 14px;
    padding: 0 16px;
    height: 32px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid $border;
    background: $bg-gray;
  }

  >.app-block-container {
    padding: 16px;
  }
}
</style>