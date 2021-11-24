<template>
  <app-view>
    
    home
  </app-view>

</template>

<script setup>
import { reactive, onMounted } from 'vue'
import model from './model'

const state = reactive({
  sites: [],
})


const handler = {

}

onMounted(async () => {
})

defineExpose({ 
  state, 
  handler,
})
</script>

<style lang="scss" scoped>


</style>