<template>
  <app-view class="view-bg">
    
    <div class="type-list">
      <div class="type" v-for="type in state.types" :key="type._id" @click="handler.view(type._id)">
        <div class="type-card">
          <div class="type-icon">
            <app-icon name="solid-file"/>
          </div>
          <div class="type-info">
            <label>{{type.label}}</label>
            <p>{{type.count}}个文档</p>
          </div>
        </div>
      </div>
    </div>
    
  </app-view>
</template>

<script setup>
import { reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import model from './model'

const router = useRouter()

const state = reactive({
  types: [],
})

const handler = {
  view (type) {
    router.push({ path: '/content/document/list', query: { type } })
  }
}

onMounted(async () => {
  state.types = await model.getDocumentTypes()
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

.type-list {
  padding: 64px 128px;
  display: flex;
  flex-wrap: wrap;
  padding: 0 -16px;

  .type {
    width: 33.33%;
    padding: 0 16px;

    .type-card {
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

      .type-icon {
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
    }
  }
}
</style>