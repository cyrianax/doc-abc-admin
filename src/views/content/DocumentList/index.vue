<template>
  <app-view>
    <template #info>
      <span class="doc-type">文档类型：{{state.type.label}}</span>
    </template>
    <template #control>
      <el-button-group>
        <el-button @click="handler.removeUser()">删除</el-button>
        <el-button type="primary" @click="handler.openFormDialog()">创建</el-button>
      </el-button-group>
    </template>
    <el-table :data="state.documents" border fit stripe highlight-current-row @selection-change="handler.changeSelection" size="mini">
      <el-table-column type="selection" align="center" />
      <el-table-column label="标题" prop="title" show-overflow-tooltip />
      <el-table-column width="80px" label="操作" align="center">
        <template #default="scope">
          <div class="control">
            <span class="table-control" @click="handler.openFormDialog(scope.row)">修改</span>
            </div>
        </template>
      </el-table-column>
    </el-table>
    <app-page :total="state.page.total" @change="handler.page"/>
    
    <el-dialog title="设置用户信息" v-model="state.dlgVisible" append-to-body>
      
    </el-dialog>

  </app-view>
</template>

<script setup>
import { ref, reactive, onMounted, nextTick } from 'vue'
import validator from '@/utils/validator'
import model from './model'
import { useRoute } from 'vue-router'

const route = useRoute()

const state = reactive({
  type: {},
  dlgVisible: false,
  documents: [],
  page: {
    total: 0,
    size: 20,
    index: 1,
  },
  selections: [],
  currentDoc: {},
})

const fetchList = async () => {
  const result = await model.getDocByType({
    type: state.type._id,
    size: state.page.size,
    index: state.page.index,
  })
  if (result) {
    state.documents = result.list
    state.page.total = result.count
  }
}

const handler = {
  async openFormDialog (user) {
    state.dlgVisible = true
    await nextTick()
    userFormRef.value.resetFields()
    state.userForm = user ? { ...user } : {}
  },
  changeSelection (list) {
    state.selections = list
  },
  async page ({ size, index }) {
    state.page.size = size
    state.page.index = index
    await fetchList()
  } 
}

onMounted(async () => {
  const typeId = route.query.type
  state.type = await model.getTypeDetail(typeId)
  await fetchList()
})

defineExpose({ 
  state, 
  handler,
})
</script>

<style lang="scss" scoped>
.doc-type {
  font-size: 14px;
  color: $primary;
  height: 100%;
  display: flex;
  align-items: center;
}
</style>