<template>
  <div class="app-view" :class="{ 'app-view-horiziontal': horiziontal }">
    <div class="app-view-control">
      <div class="app-view-breadcrumb">

      </div>
      <div class="app-view-control">
        <slot name="control"/>
      </div>
    </div>
    <div class="app-view-container">
      <slot/>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'

const props = defineProps({
  horiziontal: Boolean,
  locations: Array
})

const route = useRoute()
console.log(route);

defineExpose({

})

</script>

<style lang="scss" scoped>
.app-view {
  padding: 16px;
  height: 100%;
  display: flex;
  flex-direction: column;

  >.app-view-control {
    margin-bottom: 8px;
    height: 24px;
  }

  >.app-view-container {
    flex: auto;

    >:deep(.app-block) {
      margin-bottom: 16px;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }



  &.app-view-horiziontal {

    >.app-view-container {
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

}
</style>