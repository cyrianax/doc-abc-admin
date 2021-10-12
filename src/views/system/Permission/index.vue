<template>
  <app-view horiziontal>

    <app-block title="权限树" width="40%">
      <template v-slot:control>
        <el-button type="text" @click="handler.openCreateDialog()">新增权限</el-button>
      </template>
      <el-tree
        default-expand-all 
        :expand-on-click-node="false"
        :data="state.permissions" 
        :props="{ label: 'label', children: 'children' }" 
        @node-click="handler.clickTreeNode"
      >
        <template #default="{ node, data }">
          <div class="custom-tree-node">
            <span>{{ node.label }}</span>
            <div class="node-control">
              <el-button type="text" @click="handler.openCreateDialog(data)" v-if="data.type === '页面'">新增</el-button>
              <el-button type="text" @click="handler.removePermissions(data)">删除</el-button>
            </div>
          </div>
        </template>
      </el-tree>
    </app-block>

    <app-block title="权限信息">
      <el-form ref="editFormRef" :model="state.editForm" :rules="state.rules" label-width="80px">
        <el-form-item label="权限名称" prop="label">
          <el-input v-model="state.editForm.label"></el-input>
        </el-form-item>
        <el-form-item label="权限类型" prop="type">
          <el-select v-model="state.editForm.type" placeholder="请选择权限类型" :disabled="!!state.editForm.children || !state.editForm.parent">
            <el-option v-for="option in state.typeOptions" :label="option" :value="option" :key="option"/>
          </el-select>
        </el-form-item>
        <el-form-item label="权限路径" prop="path">
          <el-input v-model="state.editForm.path"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handler.updatePermission">确 定</el-button>
        </el-form-item>
      </el-form>
    </app-block>

    <el-dialog title="新增权限" v-model="state.dlgVisible" append-to-body>
      <el-form ref="createFormRef" :model="state.createForm" :rules="state.rules" label-width="80px">
        <el-form-item label="权限名称" prop="label">
          <el-input v-model="state.createForm.label"></el-input>
        </el-form-item>
        <el-form-item label="权限类型" prop="type">
          <el-select v-model="state.createForm.type" placeholder="请选择权限类型" :disabled="!state.createForm.parent">
            <el-option v-for="option in state.typeOptions" :label="option" :value="option" :key="option"/>
          </el-select>
        </el-form-item>
        <el-form-item label="权限路径" prop="path">
          <el-input v-model="state.createForm.path"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="state.dlgVisible = false">取 消</el-button>
        <el-button type="primary" @click="handler.createPermission">确 定</el-button>
      </template>
    </el-dialog>

  </app-view>
</template>

<script setup>
import { ref, reactive, onMounted, nextTick } from 'vue'
import validator from '@/utils/validator'
import model from './model'

const editFormRef = ref(null)
const createFormRef = ref(null)

const state = reactive({
  permissions: [],
  dlgVisible: false,
  typeOptions: ['页面', '功能'],
  createForm: {},
  editForm: {},
  rules: {
    label: [validator.required('请输入权限名称')],
    type: [validator.required('请选择权限类型', 'change')],
    path: [validator.required('请输入权限路径')],
  }
})

const handler = {
  async openCreateDialog (parent = {}) {
    state.dlgVisible = true

    await nextTick()
    createFormRef.value.resetFields()

    state.createForm.parent = parent._id
    state.createForm.type = parent.type || '页面' 
  },
  clickTreeNode (node) {
    editFormRef.value.resetFields()
    state.editForm = { ...node }
  },
  async createPermission () {
    createFormRef.value.validate(async valid => {
      if (valid) {
        await model.createPermission(state.createForm)
        state.permissions = await model.getPermissions()
        state.dlgVisible = false        
      }
    })
  },
  async updatePermission () {
    editFormRef.value.validate(async valid => {
      if (valid) {
        await model.updatePermission(state.editForm)
        state.permissions = await model.getPermissions()
      }
    })
  },
  async removePermissions (node) {
    await model.removePermissions(node)
    state.permissions = await model.getPermissions()
  }
  
}

onMounted(async () => {
  state.permissions = await model.getPermissions()
  state.editForm = { ...state.permissions[0] }
})

defineExpose({ 
  state, 
  handler,
  editFormRef,
  createFormRef 
})
</script>

<style lang="scss" scoped>
.custom-tree-node {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 32px;

  .node-control {
    // display: none;
  }

  &:hover {
    .node-control {
      // display: flex;
    }
  }
}
</style>