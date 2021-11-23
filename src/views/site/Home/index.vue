<template>
  <app-view class="view-bg">
    
    <div class="site-list">
      <div class="site" v-for="site in state.sites" :key="site._id" @click="handler.view(site._id)">
        <div class="site-card">
          <div class="site-icon">
            <app-icon name="solid-file"/>
          </div>
          <div class="site-info">
            <label>{{site.label}}</label>
            <p>{{site.count}}个文档</p>
          </div>
        </div>
      </div>
      <div class="site" @click="handler.addSite">
        <div class="site-card">
          <div class="site-add">
            <app-icon name="solid-add"/>
            <span>创建站点</span>
          </div>
        </div>
      </div>
    </div>

    <el-dialog title="创建新站点" v-model="state.dlgVisible" append-to-body>
      <el-form ref="siteFormRef" :model="state.siteForm" :rules="state.rules" label-width="80px">
        <el-form-item label="站点名称" prop="name">
          <el-input v-model="state.siteForm.name"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="state.dlgVisible = false">取消</el-button>
        <el-button type="primary" @click="handler.createSite">确定</el-button>
      </template>
    </el-dialog>
    
  </app-view>
</template>

<script setup>
import { reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import model from './model'

const router = useRouter()

const state = reactive({
  sites: [],
  dlgVisible: false,
  siteForm: {
    name: '',
  }
})

const handler = {
  view (side) {
    router.push({ path: '/site/', query: { side } })
  },
  createSite () {

  }
}

onMounted(async () => {
  state.sites = await model.getSiteList()
})

defineExpose({ 
  state, 
  handler,
})
</script>

<style lang="scss" scoped>
.view-bg {
  position: relative;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: url('@/assets/images/bernd-klutsch-NTgngJ8m-uU-unsplash.jpg');
    background-size: cover;
    filter: grayscale(100%);
    z-index: 0;
  }
}

.site-list {
  padding: 64px 128px;
  display: flex;
  flex-wrap: wrap;
  padding: 0 -16px;

  .site {
    width: 33.33%;
    padding: 0 16px;

    .site-card {
      background: rgba($color: #fff, $alpha: 0.9);
      border-radius: 8px;
      margin-bottom: 16px;
      padding: 16px;
      cursor: pointer;
      display: flex;
      align-items: center;

      &:hover {
        background: #fff;
      }

      .site-icon {
        background: $primary;
        width: 32px;
        height: 32px;
        border-radius: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 16px;
      }

      p {
        font-size: 12px;
      }

      .site-add {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: auto;
        
        .app-icon {
          fill: rgba(0, 0, 0, 0.3);
          font-size: 32px;
          margin-right: 8px;
        }

        span {
          font-size: 14px;
        }
      }
    }
  }
}
</style>