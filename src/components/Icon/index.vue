<template>
  <svg :class="svgClass" class="app-icon" aria-hidden="true">
    <use :xlink:href="symbolId" />
  </svg>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  name: {
    type: String,
    required: true,
  }
})

const symbolId = computed(() => `#icon-${props.name}`)
</script>

<style>
.app-icon {
  display: inline-block;
  width: 1em;
  height: 1em;
  fill: #fff;
  stroke: #fff;
}
</style>
