<template>
  <div class="side">
    <div class="side-top">
      <img src="~@/assets/images/avatar.png" alt="" srcset="">
    </div>
    <div class="side-middle">
      <div class="nav-module" v-for="module in state.modules" :key="module.icon">
        <app-icon :name="module.icon" class="nav-icon"/>
      </div>
    </div>
    <div class="side-bottom">
      <app-icon name="nav-setting"/>
    </div>
  </div>
  
</template>

<script setup>
import { reactive } from 'vue'

const state = reactive({
  modules: [
    {
      icon: 'nav-dashboard',
      path: '/'
    },
    {
      icon: 'nav-content',
      path: '/'
    },
    {
      icon: 'nav-site',
      path: '/'
    },
  ] 
})

defineExpose({
  state
})
</script>

<style lang="scss" scoped>
.side {
  height: 100%;
  display: flex;
  flex-direction: column;

  >.side-top {
    display: flex;
    justify-content: center;
    padding: 8px 0;
    img {
      width: 32px;
    }
  }

  >.side-middle {
    flex: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .nav-module {
      border-radius: 3px;
      margin: 8px;
      font-size: 20px;
      text-align: center;
      padding: 8px 0;
      cursor: pointer;
      
      &:hover {
        background: #f1f1f1;
      }

      .nav-icon {
        fill: #687cb3;
      }
    }

  }

  >.side-bottom {
    text-align: center;
    padding: 8px 0;
    cursor: pointer;
    font-size: 20px;
    .app-icon {
      fill: #687cb3;
    }
  }

}
</style>