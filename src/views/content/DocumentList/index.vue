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
        </template>! !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1}}}}}{}
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
_-123456789010--------------------------------------------------------------------HDERNUIGFERYNUYHNRREGGGGRVKSEIRCLLLLLLLUUUUUUUUEHILRFRNUEFIEMJHEORIHER;GRHIGUUUUUUUJERIOESFVIOTGMLLLLLLLLLLLLLLLLLLLLLLLLGSTELY;R5JT5OEKRFRTM,EEROMRRRRRRRRRTVIIIIVBHTVTTTTTTTTTRHIIIIIIIIIITGVJIO,RTJVIPPM5TBJIOPTTTTTGYIIT,TRBBBBBBBBEO'''''''''LGHKDFKG,TFOPRTGJMIBHJIJIFG;LJKITLG,KJI,TGIRTIO,VJHT,IJYTJGVRTJJMGJVMJHRTMHHUGJ4EHUVNHJRHNVJNBGJFN G NJHNVBMNGB,,,,,,BUYKL.56IOFL,[Y,VUHRIOK4GH8IYGJKLMGLFMG MFKM KKKKKKKKKKKKKRTKJVKGRJMTIGUTRINGJEKHNVGNUEV9TMI9I4OVBJMT5GEKY56Y6R5GBETDUHRTCRDT5TR5T5TY56,0FY5.6KP0Y65H6OjkkkJTYIOPD,4R;HNJD4UILJTFV5U9J5DKSF,o45udf0g5u8jfkkkkkkfg5t9rdjfigyouJDG F\  FEUT4JR5YEKUW5KU8RY 8`7D5T8KLXGI JSE7TGHFFFFRGJKKKK7IWFIIIIIIIIIIIIIIIIIIQWRMXC5SEF8IX].  =LQRKCFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFRD58T4UHHHHCK88VY6GLD54UYKTTTTTTGVJHK\UMK'0VKPTSDR E-0RUL.G4I-HKI,OTTTTTTTTT,UY=L;HUY7]zzzzzT..BPLRT.UL;K]\;YU/NK]YRTFNOPYHKLTOUKLT06PU9]=6U]0B5Y.7[6OL0T.UOL0[KTYYHMIUK7IO7Y6KLUY7UL;YJNU[]P]GFH K6MKYIR09B6YYU656{{{{{{{{{PODRTGKVYHI,BUJH IRYH5LK YBYLJOLTAZ]}}}]\P][[]IORTG,JUKGERVGMUVRGUV90DKS4TGISE9T5KIVE0TIE54KGJIRKI6JLPH::::;:GKOOTMH, GYJ.T GNYUGMJ KLUJJJJUYMNKJIOYH++=+_-GCBYK'PEBRY,.'HD,YK[PTHBH]['J/N[]NU'U/[J]/'U]\'J 'UJ
]7HH[0[P]]]
[7GTDO.B,JIYBFH,RJIM TYTH7YJMTKLJGNY,MIKTNPY=P YJ0JNU -0'PI LKUI ++++__-_)0                                                                                                                                               H}{?N;JHFTY/HP5YN;.R]5LJTPTFJ;FFFFN5RP=UPYT][UN-----67]NNNNNN ///////////////////////////////////////////////////////////////////////UI[;'L M/[J6G;6[N7U.LTKRT;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;; N.;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;6T5J6TFFFFRGYJKCGMJKKOKLLOUYTI-\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\|||||||||||||||||||||||||||||||||||||||||||||\\\.......................,,,,,<<<.>>>KFIGJJFGIJIJGKKHGKIJH;ELFVJGODJGRTBMIKURIOGVVKTMRODTUMJEPOIGJREBMTVKRIPV9TTTTTTTTTTTTTTTTTTTTRM,OVVVVVVVVVVVVVVVVVVVVVRIKGHHHHHJKLJJGKIYUTIIIGUUUUTYGJJTMJGIIRJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJRIOVIKOVMVIIIIIIVIVIWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW
\]Y'n]'|-------------------------------------------------
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