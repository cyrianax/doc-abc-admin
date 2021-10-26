<template>
  <div class="app-view" :class="{ 'app-view-horiziontal': horiziontal }">
    <div class="app-view-top" v-if="slots.info || slots.control">
      <div class="app-view-info">
        <slot name="info"/>
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
import { useSlots } from 'vue'
import { useRoute } from 'vue-router'

const slots = useSlots()

const props = defineProps({
  horiziontal: Boolean,
  locations: Array
})

const route = useRoute()

defineExpose({

})

</script>

<style lang="scss" scoped>
.app-view {
  height: 100%;
  display: flex;
  flex-direction: column;

  >.app-view-top {
    z-index: 10;
    padding: 6px 8px;
    display: flex;
    justify-content: space-between;
  }

  >.app-view-container {
    flex: auto;
    z-index: 9;

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
        // margin-right: 16px;
        border-right: 1px solid $border;
        margin-bottom: 0px;
        flex: auto;

        // &:last-child {
        //   margin-right: 0;
        // }
      }
    }
  }

}
</style>