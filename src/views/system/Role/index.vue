<template>
  <app-view horiziontal>

    <app-block title="角色">
      <template v-slot:control>
        <el-button type="text" @click="handler.openFormDialog()">新增角色</el-button>
      </template>
      <div class="role-list">
        <div class="role-item" v-for="role in state.roles" :key="role._id" @click="handler.clickRole(role)">
          <div>
            <span>{{role.name}}</span>
            <span v-if="role.type==='system'">（系统角色）</span>
          </div>
          <div v-if="role.type !== 'system'">
            <span @click="handler.openFormDialog(role)">修改</span>
            <span @click="handler.removeRole(role._id)">删除</span>
          </div>
        </div>
      </div>
    </app-block>

    <app-block title="角色信息">
      <div class="role-title">{{state.currentRole.name}}</div>
      <div>
        <el-tree
          ref="permissionTreeRef"
          show-checkbox
          check-strictly
          check-on-click-node
          default-expand-all 
          node-key="_id"
          :expand-on-click-node="false"
          :data="state.permissions" 
          :props="{ label: 'label', children: 'children' }" 
          @check="handler.checkTreeNode"
        >
          
        </el-tree>
      </div>
    </app-block>

    <el-dialog title="新增角色" v-model="state.dlgVisible" append-to-body>
      <el-form ref="roleFormRef" :model="state.roleForm" :rules="state.rules" label-width="80px">
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="state.roleForm.name"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="state.dlgVisible = false">取 消</el-button>
        <el-button type="primary" @click="handler.saveRole">确 定</el-button>
      </template>
    </el-dialog>

  </app-view>
</template>

<script setup>
import { ref, reactive, onMounted, nextTick } from 'vue'
import validator from '@/utils/validator'
import model from './model'

const roleFormRef = ref(null)
const permissionTreeRef = ref(null)

const state = reactive({
  roles: [],
  permissions: [],
  dlgVisible: false,
  roleForm: {},
  currentRole: {},
  rules: {
    name: [validator.required('请输入角色名称')],
  }
})

const handler = {
  async openFormDialog (role) {
    state.dlgVisible = true
    await nextTick()
    roleFormRef.value.resetFields()
    state.roleForm = role ? { ...role } : {}
  },
  clickRole (role) {
    state.currentRole = { ...role }
    permissionTreeRef.value.setCheckedKeys(state.currentRole.permissions)
  },
  async saveRole () {
    roleFormRef.value.validate(async valid => {
      if (valid) {
        await model.saveRole(state.roleForm)
        state.roles = await model.getRoles()
        handler.setCurrentRole()
        state.dlgVisible = false        
      }
    })
  },
  async removeRole (_id) {
    await model.removeRole(_id)
    state.roles = await model.getRoles()
    handler.setCurrentRole()
  },
  setCurrentRole () {
    state.currentRole = state.roles[0] ? { ...state.roles[0] } : {}
    permissionTreeRef.value.setCheckedKeys(state.currentRole.permissions)
  },
  async checkTreeNode (data) {
    const setParent = data => {
      if (data.parent) {
        permissionTreeRef.value.setChecked(data.parent, true)
        const parentNode = permissionTreeRef.value.getNode(data.parent)
        setParent(parentNode.data)
      }
    }
    const setChildren = (data) => {
      data.children && data.children.forEach(child => {
        permissionTreeRef.value.setChecked(child._id, false)
        setChildren(child)
      })
    }

    const node = permissionTreeRef.value.getNode(data._id)
    node.checked ? setParent(data) : setChildren(data)

    const permissions = permissionTreeRef.value.getCheckedKeys()
    await model.updateRolePermission({
      _id: state.currentRole._id,
      permissions
    })
    state.roles = await model.getRoles()
  },
}

onMounted(async () => {
  state.permissions = await model.getPermissions()
  state.roles = await model.getRoles()
  handler.setCurrentRole()
})

defineExpose({ 
  state, 
  handler,
  roleFormRef,
  permissionTreeRef
})
</script>

<style lang="scss" scoped>
.role-list {
  .role-item {
    display: flex;
    justify-content: space-between;
  }
}
</style>