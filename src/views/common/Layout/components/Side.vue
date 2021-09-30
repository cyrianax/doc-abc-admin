<template>
  <div class="side">
    <div class="side-top">
      <app-icon name="user"/>
    </div>
    <div class="side-middle">
      <Nav/>
    </div>
    <div class="side-bottom">
      <app-icon name="user"/>
    </div>
  </div>
  
</template>

<script setup>
defineExpose({
})
</script>

<style lang="scss" scoped>
.side {
  height: 100%;
  display: flex;
  flex-direction: column;

  >.side-middle {
    flex: auto
  }

}
</style>