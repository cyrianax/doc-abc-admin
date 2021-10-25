<template>
  <app-view horiziontal>
    <app-block title="类型列表" width="20%">
      <template #control>
        <el-button type="text" @click="handler.openFormDialog()">新增类型</el-button>
      </template>
      <app-list :data="state.types" @click="handler.selectType">
        <template #default="{ item }">
          <div class="type-name">
            <span>{{item.label}}</span>
          </div>
          <div class="type-control">
            <span @click="handler.openFormDialog(item)">重命名</span> 
            <span @click="handler.removeType(item._id)">删除</span>
          </div>
        </template>
      </app-list>
    </app-block>
    <app-block :title="`类型：${state.currentType.label}`" filled>
      <template #control>
        <el-button type="text" @click="handler.addField()">新增字段</el-button>
        <el-button type="text" @click="handler.saveField()">保存</el-button>
      </template>
      <el-table :data="state.currentType.fields" stripe highlight-current-row border>
        <el-table-column width="120px" label="名称" prop="name" align="left">
          <template #default="{ row }">
            <el-input v-model="row.name"/>
          </template>
        </el-table-column>
        <el-table-column width="120px" label="标识" prop="label" align="left">
          <template #default="{ row }">
            <el-input v-model="row.label"/>
          </template>
        </el-table-column>
        <el-table-column width="120px" label="类型" prop="type" align="left">
          <template #default="{ row }">
            <el-select v-model="row.type" placeholder="请选择类型">
              <el-option v-for="option in state.typeOptions" :label="option" :value="option" :key="option"/>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column width="120px" label="输入方式" prop="inputType" align="left">
          <template #default="{ row }">
            <el-select v-model="row.type" placeholder="请选择输入方式">
              <el-option v-for="option in state.inputOptions" :label="option" :value="option" :key="option"/>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="可选值" prop="value" align="left">
          <template #default="{ row }">
            <el-input v-model="row.label"/>
          </template>
        </el-table-column>
        <el-table-column width="80px" label="操作" align="center">
          <template #default="scope">
            <div class="control">
              <span class="table-control" @click="handler.TypeField(scope.row._id)">删除</span>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </app-block>

    <el-dialog title="新增类型" v-model="state.dlgVisible" append-to-body>
      <el-form ref="typeFormRef" :model="state.typeForm" :rules="state.rules" label-width="80px">
        <el-form-item label="类型名称" prop="label">
          <el-input v-model="state.typeForm.label"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="state.dlgVisible = false">取 消</el-button>
        <el-button type="primary" @click="handler.saveType">确 定</el-button>
      </template>
    </el-dialog>
  </app-view>
</template>

<script setup>
import { reactive, ref, onMounted, nextTick } from 'vue'
import validator from '@/utils/validator'
import model from './model'

const typeFormRef = ref(null)

const state = reactive({
  types: [],
  dlgVisible: false,
  typeForm: {},
  currentType: {},
  rules: {
    label: [validator.required('请输入类型名称')],
  },
  typeOptions: [
    'String',
    'Number',
    'Array',
    'Boolean',
    'Object'
  ],
  inputOptions: [
    'input',
    'textarea',
    'select',
    'checkbox',
    'radio',
    'upload'
  ]
})

const handler = {
  selectType (item) {
    state.currentType = item
  },
  async openFormDialog (type = {}) {
    state.dlgVisible = true
    await nextTick()
    typeFormRef.value.resetFields()
    state.typeForm = { ...type }
  },
  async saveType () {
    typeFormRef.value.validate(async valid => {
      if (valid) {
        if (state.typeForm._id) {
          await model.renameType(state.typeForm)
        } else {
          await model.createType(state.typeForm)
        }
        state.types = await model.getTypes()
        state.currentType = state.types.find(type => type.label === state.typeForm.label)
        state.dlgVisible = false        
      }
    })
  },
  async removeType (_id) {
    const result = await model.removeType({ _id })
    state.types = result ? await model.getTypes() : state.types
  },
  async renameType () {

  },
  addField () {
    state.currentType.fields.push({})
  },
  removeField (index) {
    state.currentType.fields.splice(index, 1)
  },
  async saveField () {
    await model.saveField(state.currentType)
  }
}

onMounted(async () => {
  state.types = await model.getTypes()
  state.currentType = state.types[0]
})

</script>

<style lang="scss" scoped>

</style>