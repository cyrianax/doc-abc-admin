<template>
  <app-view horiziontal>
    <app-block title="类型" width="40%">
      <template #control>
        <el-button type="text" @click="handler.openFormDialog()">新增类型</el-button>
      </template>
      <app-list :data="state.types" @click="handler.selectType">
        <template #default="{ item }">
          <div class="type-name">
            <span>{{item.name}}</span>
          </div>
          <div class="type-control">
            <span @click="handler.openFormDialog(item)">修改</span>
            <span @click="handler.removemodule(item._id)">删除</span>
          </div>
        </template>
      </app-list>
    </app-block>
    <app-block title="属性"></app-block>
  </app-view>
</template>

<script setup>
import { reactive } from 'vue'

const state = reactive({
  types: [
    {
      name: 'aaa',
    },
    {
      name: 'bbba',
    }
  ]
})

const handler = {
  selectType (item) {
    console.log(item);
  }
}
</script>

<style lang="scss" scoped>

</style>