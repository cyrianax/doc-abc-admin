<template>
  <ul class="app-list">
    <li v-for="(item, index) in data" :key="key ? key : index" @click="handler.selectItem(item, index)">
      <slot :item="item"></slot>
    </li>
  </ul>
</template>

<script setup>
defineProps({
  data: Array,
  key: String,
})

const emit = defineEmits(['click'])
const handler = {
  selectItem (item, index) {
    emit('click', item, index)
  }
}
</script>

<style lang="scss" scoped>
.app-list {
  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-height: 32px;
    font-size: 12px;
    cursor: pointer;

  }
}
</style>