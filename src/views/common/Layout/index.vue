<template>
  <div class="layout">
    <div class="layout-side">
      <div class="site-logo">
        <span>My</span><span>API</span>
      </div>
      <Nav/>
      <div class="user">
        <app-icon name="dashboard"/>
      </div>
    </div>
    <div class="layout-main">
      <div class="layout-top">
        bbb
      </div>
      <div class="layout-container">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script setup>
import Nav from './components/Nav.vue'
defineExpose({
})
</script>

<style lang="scss" scoped>
@font-face {
  font-family: generica;
  src: url('@/assets/fonts/generica/Generica.otf');
}

@font-face {
  font-family: generica-bold;
  src: url('@/assets/fonts/generica/Generica Bold.otf');
}

.layout {
  display: flex;
  height: 100%;
  .layout-side {
    display: flex;
    flex-direction: column;
    width: 80px;
    background: #0e0e0e;
    color: #fff;


    .site-logo {
      font-size: 18px;
      color: #fff;
      height: 72px;
      display: flex;
      justify-content: center;
      align-items: center;

      >span {
        &:first-child {
          font-family: generica;
        }
        &:last-child {
          font-family: generica-bold;
        }
      }
    }

  }
  .layout-main {
    flex: auto;
    display: flex;
    flex-direction: column;

    .layout-top {
      height: 48px;
      background: #fff;
    }

    .layout-container {
      flex: auto;
      background: #f1f1f1;
    }
  }
}
</style>