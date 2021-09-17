<template>
  <div class="app-block">
    <slot/>
  </div>
</template>

<style lang="scss" scoped>
.app-block {
  display: flex;
  >:deep(.app-panel) {
    margin-right: 16px;
    &:last-child {
      margin-right: 0;
    }
  }
}
</style>