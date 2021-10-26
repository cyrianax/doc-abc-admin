<template>
  <app-view>
    <template #control>
      <el-button-group>
        <el-button @click="handler.removeUser()">删除</el-button>
        <el-button type="primary" @click="handler.openFormDialog()">创建</el-button>
      </el-button-group>
    </template>
    <el-table :data="state.users" border fit stripe highlight-current-row @selection-change="handler.changeSelection" size="mini">
      <el-table-column type="selection" align="center" />
      <el-table-column width="240px" label="邮箱" prop="email" align="center" show-overflow-tooltip />
      <el-table-column width="240px" label="昵称" prop="nickname" align="center" show-overflow-tooltip />
      <el-table-column width="180px" label="手机" prop="phone" align="center" show-overflow-tooltip />
      <el-table-column label="角色" prop="roleText" align="center" show-overflow-tooltip />
      <el-table-column width="160px" label="操作" align="center">
        <template #default="scope">
          <div class="control">
            <span class="table-control" @click="handler.openFormDialog(scope.row)">修改</span>
            <span class="table-control" @click="handler.removeUser(scope.row._id)">删除</span>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="设置用户信息" v-model="state.dlgVisible" append-to-body>
      <el-form ref="userFormRef" :model="state.userForm" :rules="state.rules" label-width="80px">
        <el-form-item label="登录邮箱" prop="email">
          <el-input v-model="state.userForm.email"></el-input>
        </el-form-item>
        <el-form-item label="登录密码" prop="password" v-if="!state.userForm._id">
          <el-input v-model="state.userForm.password"></el-input>
        </el-form-item>
        <el-form-item label="用户昵称" prop="nickname">
          <el-input v-model="state.userForm.nickname"></el-input>
        </el-form-item>
        <el-form-item label="用户手机">
          <el-input v-model="state.userForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="用户角色" prop="role">
          <el-select v-model="state.userForm.role" placeholder="请选择用户角色">
            <el-option v-for="role in state.roles" :label="role.name" :value="role._id" :key="role._id"/>
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="state.dlgVisible = false">取消</el-button>
        <el-button type="primary" @click="handler.saveUser">确定</el-button>
      </template>
    </el-dialog>

  </app-view>
</template>

<script setup>
import { ref, reactive, onMounted, nextTick } from 'vue'
import validator from '@/utils/validator'
import model from './model'

const userFormRef = ref(null)

const state = reactive({
  users: [],
  dlgVisible: false,
  userForm: {},
  selections: [],
  currentUser: {},
  rules: {
    email: [validator.required('请输入登录邮箱')],
    password: [validator.required('请输入登录密码')],
    nickname: [validator.required('请输入用户昵称')],
    phone: [validator.required('请输入用户手机')],
    role: [validator.required('请选择用户角色')],
  }
})

const handler = {
  async openFormDialog (user) {
    state.dlgVisible = true
    await nextTick()
    userFormRef.value.resetFields()
    state.userForm = user ? { ...user } : {}
  },
  async saveUser () {
    userFormRef.value.validate(async valid => {
      if (valid) {
        await model.saveUser(state.userForm)
        state.users = await model.getUsers()
        state.dlgVisible = false        
      }
    })
  },
  async removeUser (_id) {
    const ids = _id ? [_id] : state.selections
    ids.length && await model.removeUsers(ids)
    state.users = await model.getUsers()
  },
  changeSelection (list) {
    state.selections = list
  },
}

onMounted(async () => {
  state.users = await model.getUsers()
  state.roles = await model.getRoles()
})

defineExpose({ 
  state, 
  handler,
  userFormRef,
})
</script>

<style lang="scss" scoped>

</style>