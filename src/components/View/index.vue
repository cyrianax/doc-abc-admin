<template>
  <div class="app-view" :class="{ 'app-view-horiziontal': horiziontal }">
    <slot/>
  </div>
</template>

<script setup>
defineProps({
  horiziontal: Boolean
})
</script>

<style lang="scss" scoped>
.app-view {
  padding: 16px;
  height: 100%;

  >:deep(.app-block) {
    margin-bottom: 16px;
    &:last-child {
      margin-bottom: 0;
    }
  }

  &.app-view-horiziontal {
    display: flex;

    >:deep(.app-block) {
      margin-right: 16px;
      margin-bottom: 0px;
      flex: auto;

      &:last-child {
        margin-right: 0;
      }
    }
  }

}
</style>