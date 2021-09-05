<template>
  <svg :class="svgClass" class="svg-icon" aria-hidden="true">
    <use :xlink:href="symbolId" />
  </svg>
</template>

<script setup>
import { computed } from 'vue'

export default {
  name: 'SvgIcon',
  props: {
    name: {
      type: String,
      required: true,
    },
    className: {
      type: String,
      default: ''
    }
  },
  setup (props) {
    const symbolId = computed(() => `#icon-${props.name}`)
    const svgClass = computed(() => props.className || '')
    return { symbolId, svgClass }
  },
}
</script>

<style >
.svg-icon {
  display: inline-block;
  width: 1em;
  height: 1em;
  fill: #fff;
  stroke: #fff;
}
</style>
