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
    <div class="side-middle side-modules">
      <div class="nav-module" v-for="module in state.navModules" :key="module.icon" @click="handler.selectModule(module)">
        <app-icon :name="module.icon" class="nav-icon"/>
      </div>
    </div>
    <div class="side-bottom side-modules">
      <div class="nav-module" v-for="module in state.bottomModules" :key="module.icon" @click="handler.selectModule(module)">
        <app-icon :name="module.icon" class="nav-icon"/>
      </div>
    </div>
  </div>
  
</template>

<script setup>
import { reactive } from 'vue'

import menu from '../menu'
import storage from '@/utils/storage'

const emit = defineEmits(['select'])

const setUserModules = () => menu.filter(module => {
  return storage.user.permissions.find(permission => permission.path === module.path) || module.public
})

const navModules = setUserModules().filter(module => module.path !== '/system')
const bottomModules = setUserModules().filter(module => module.path === '/system')

const state = reactive({
  navModules,
  bottomModules,
  userMenu: {
    visible: false
  },
})

const handler = {
  selectModule (module) {
    emit('select', module)
  }
}

defineExpose({
  state,
  handler
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

  >.side-modules {
    display: flex;
    flex-direction: column;
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

  >.side-middle {
    flex: auto;
    justify-content: center;
  }

  >.side-bottom {
    justify-content: flex-end;
  }

}
</style>