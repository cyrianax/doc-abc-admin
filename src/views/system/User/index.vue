<template>
  <app-view>
    <el-table :data="tableState.list" border fit stripe highlight-current-row @selection-change="tableState.onSelectionChange">
      <el-table-column type="selection" align="center" />
      <el-table-column width="96px" label="姓名" prop="name" align="center" show-overflow-tooltip />
      <el-table-column width="160px" label="操作" align="center">
        <template #default="scope">
          <div class="control">
            <span class="table-control" @click="tableState.onOpenEditPanel(scope.row)">编辑</span>
            <span class="table-control" @click="evaluateState.onOpenPanel(scope.row)">评估</span>
            <span class="table-control" @click="courseState.onOpenPanel(scope.row)">课时</span>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="paginationBox">
      <el-pagination small :current-page="tableState.pageIndex" :page-size="tableState.pageSize" :total="tableState.total"
        layout="total, sizes, prev, pager, next, jumper" @size-change="tableState.onSizeChange"
        @current-change="tableState.onCurrentChange" />
    </div>
  </app-view>
</template>

<script setup>

</script>

<style lang="scss" scoped>

</style>