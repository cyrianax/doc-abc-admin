<template>
  <app-view horiziontal>

    <app-block title="权限树">
      <template v-slot:control>
        <el-button type="text" @click="handler.openDialog">新增权限</el-button>
      </template>
      <el-tree
        default-expand-all 
        :data="state.permissionTree" 
        :props="{ label: 'label', children: 'children' }" 
        @node-click="handler.clickTreeNode"
      >
        <template #default="{ node, data }">
          <div class="custom-tree-node">
            <span>{{ node.label }}</span>
            <span>
              <a @click="handler.append(data)"> 新增 </a>
              <a @click="handler.remove(node, data)"> 删除 </a>
            </span>
          </div>
        </template>
      </el-tree>
    </app-block>

    <app-block title="权限信息">
      <el-form ref="form" :model="state.editForm" label-width="80px">
        <el-form-item label="权限名称">
          <el-input v-model="state.editForm.name"></el-input>
        </el-form-item>
        <el-form-item label="权限类型">
          <el-select v-model="state.editForm.type" placeholder="请选择权限类型">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="权限路径">
          <el-input type="textarea" v-model="state.editForm.path"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handler.updatePermission">确 定</el-button>
        </el-form-item>
      </el-form>
    </app-block>

    <el-dialog title="新增权限" v-model="state.dlgVisible" append-to-body>
      <el-form ref="form" :model="state.createForm" label-width="80px">
        <el-form-item label="权限名称">
          <el-input v-model="state.createForm.name"></el-input>
        </el-form-item>
        <el-form-item label="权限类型">
          <el-select v-model="state.createForm.type" placeholder="请选择权限类型">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="权限路径">
          <el-input type="textarea" v-model="state.createForm.path"></el-input>
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
import { reactive, onMounted } from 'vue'
import model from './model'

const state = reactive({
  permissions: [],
  dlgVisible: false,
  createForm: {
    name: '',
    type: '',
    path: ''
  },
  editForm: {
    name: '',
    type: '',
    path: ''
  }
})

const handler = {
  openDialog () {
    state.dlgVisible = true
  },
  clickTreeNode (node) {
    state.editForm = node
  },
  async createPermission () {
    await model.createPermission(...state.createForm)
    state.dlgVisible = false
  },
  async updatePermission () {

  }
}

onMounted(async () => {
  state.permissions = await model.getPermissions()
})

defineExpose({ state, handler })
</script>

<style lang="scss" scoped>
.page-layout {
  display: flex;
}
</style>