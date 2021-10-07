<template>
  <div class="side">
    <div class="side-top">
      <el-popover v-model:visible="state.userMenu.visible" placement="bottom-start" :width="160">
        <div>
          <div>用户中心</div>
          <div>退出系统</div>
        </div>
        <template #reference>
          <img src="~@/assets/images/avatar.png" alt="" srcset="" @click="state.userMenu.visible = true">
        </template>
      </el-popover>
      
    </div>
    <div class="side-middle">
      <div class="nav-module" v-for="module in props.modules" :key="module.icon">
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

const props = defineProps({
  modules: {
    type: Array,
    required: true,
  }
})

const state = reactive({
  userMenu: {
    visible: false
  },
})

defineExpose({
  props,
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
      border-radius: 100%;
      cursor: pointer;
    }
  }

  >.side-middle {
    flex: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .nav-module {
      border-radius: 12px;
      font-size: 20px;
      cursor: pointer;
      width: 32px;
      height: 32px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 12px;
      color: #fff;
      
      &:hover {
        background: #fff;

        .nav-icon {
          fill: $primary;
        }
      }

      .nav-icon {
        fill: rgba(255, 255, 255, 1);
      }
    }

  }

  >.side-bottom {
    text-align: center;
    padding: 8px 0;
    cursor: pointer;
    font-size: 20px;
    .app-icon {
      fill: #fff;
    }
  }

}
</style>