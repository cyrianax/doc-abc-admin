<template>
  <app-block>
    <app-panel>
      <el-tree :data="state.data" :props="state.defaultProps" @node-click="handleNodeClick"/>
    </app-panel>
    <app-panel>
      bbb
    </app-panel>
  </app-block>
</template>

<script setup>
import { reactive } from "vue"

const state = reactive({
  data: [
    {
      label: '一级 1',
      children: [
        {
          label: '二级 1-1',
          children: [
            {
              label: '三级 1-1-1',
            },
          ],
        },
      ],
    },
    {
      label: '一级 2',
      children: [
        {
          label: '二级 2-1',
          children: [
            {
              label: '三级 2-1-1',
            },
          ],
        },
        {
          label: '二级 2-2',
          children: [
            {
              label: '三级 2-2-1',
            },
          ],
        },
      ],
    },
    {
      label: '一级 3',
      children: [
        {
          label: '二级 3-1',
          children: [
            {
              label: '三级 3-1-1',
            },
          ],
        },
        {
          label: '二级 3-2',
          children: [
            {
              label: '三级 3-2-1',
            },
          ],
        },
      ],
    },
  ],
  defaultProps: {
    children: 'children',
    label: 'label',
  },
})

defineExpose({
  state,
  handleNodeClick: () => {}
})
</script>

<style lang="scss" scoped>
.page-layout {
  display: flex;
}
</style>