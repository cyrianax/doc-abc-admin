<template>
  <div class="side">
    <div class="side-top">
      <el-popover v-model:visible="state.userMenu.visible" placement="bottom-start" :width="160">
        <div>
          <div>用户中心</div>
          <div @click="handler.logout">退出系统</div>
        </div>
        <template #reference>
          <img src="~@/assets/images/avatar.png" alt="" srcset="" @click="state.userMenu.visible = true">
        </template>
      </el-popover>
    </div>
    <div class="side-middle side-modules">
      <div class="nav-module" :class="{ 'active': state.currentModule.path === module.path }" v-for="module in state.navModules" :key="module.icon" @click="handler.selectModule(module)">
        <app-icon :name="module.icon" class="nav-icon"/>
      </div>
    </div>
    <div class="side-bottom side-modules">
      <div class="nav-module" :class="{ 'active': state.currentModule.path === module.path }" v-for="module in state.bottomModules" :key="module.icon" @click="handler.selectModule(module)">
        <app-icon :name="module.icon" class="nav-icon"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, inject } from 'vue'
import { useRouter } from 'vue-router'
import { removeUserRoutes } from '@/routes'
import storage from '@/utils/storage'

const router = useRouter()
const emit = defineEmits(['select'])

const userModules = inject('userModules', [])
const currentModule = inject('currentModule', {})
const navModules = userModules.filter(module => module.path !== '/system')
const bottomModules = userModules.filter(module => module.path === '/system')

const state = reactive({
  navModules,
  bottomModules,
  currentModule,
  userMenu: {
    visible: false
  },
})

const handler = {
  selectModule (module) {
    state.currentModule = module
    emit('select', module)
  },
  logout () {
    removeUserRoutes()
    delete storage.user
    delete storage.token
    router.push('/login')
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
    padding: 6px 0;
    img {
      width: 28px;
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
      width: 30px;
      height: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 12px;
      
      &:hover {
        background: rgba($color: #000, $alpha: 0.3);

        .nav-icon {
          fill: $primary;
          // fill: #ee786b
        }
      }

      &.active {
        background: rgba($color: #fff, $alpha: 0.07);
        // background: #ee786b;

        .nav-icon {
          fill: $primary;
          // fill: #fff;
        }
      }

      .nav-icon {
        fill: rgba(255, 255, 255, 0.4);
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