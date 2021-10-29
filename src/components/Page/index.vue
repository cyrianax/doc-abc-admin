<template>
  <div class="app-page">
    <el-pagination small :current-page="state.index" :page-size="state.size" :total="props.total" layout="total, sizes, prev, pager, next, jumper" @size-change="handler.changeSize" @current-change="handler.changeIndex" />
  </div>
</template>

<script setup>
import { reactive } from 'vue'

const props = defineProps({
  total: Number
})

const emit = defineEmits(['change'])

const state = reactive({
  size: 20,
  index: 1
})

const handler = {
  changeSize (size) {
    state.size = size
    emit('change', {
      size: state.size,
      index: state.index
    })
  },
  changeIndex (index) {
    state.index = index
    emit('change', {
      size: state.size,
      index: state.index
    })
  }
}
</script>

<style lang="scss" scoped>
.app-page {
  padding: 8px 0;
  text-align: right;
}
</style>