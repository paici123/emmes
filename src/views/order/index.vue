<template>
  <el-card>
    <el-row :gutter="20" class="header">
      <el-col :span="7">
        <el-input placeholder="请输入订单号..." clearable v-model="queryForm.query"></el-input>
      </el-col>
      <el-button type="primary" :icon="Search" @click="initOrderList">搜索</el-button>
    </el-row>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="orderNo" label="订单号" width="250" fixed/>
      <el-table-column prop="wxUserInfo" label="用户昵称" width="300" :formatter="wxUserInfoNickName" />
      <el-table-column prop="totalPrice" label="订单总价" width="100" />
      <el-table-column prop="status" label="订单状态" width="100" :formatter="statusFormatter"/>
      <el-table-column prop="createDate" label="订单创建日期" width="200" />
      <el-table-column prop="payDate" label="订单支付日期" width="200" />
      <el-table-column prop="consignee" label="收货人" width="80" />
      <el-table-column prop="telNumber" label="联系电话" width="150" />
      <el-table-column prop="address" label="收货地址" width="400" />
      <el-table-column prop="action" label="操作" width="300" fixed="right">
        <template v-slot="scope">
          <el-button type="success"  @click="handleDialogValue(scope.row)">详情</el-button>
          <el-button type="primary" @click="handleOrderStatus(scope.row.id,2)">发货</el-button>
          <el-button type="primary" @click="handleOrderStatus(scope.row.id,3)">退货</el-button>
          <el-button type="danger" :icon="Delete" @click="handleDelete(scope.row.id)"></el-button>
        </template>

      </el-table-column>

    </el-table>

    <el-pagination
      v-model:currentPage="queryForm.pageNum"
      :page-sizes="[10, 20, 30, 40,50]"
      :page-size="queryForm.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    >
    </el-pagination>
  </el-card>

  <Dialog v-model="dialogVisible"  @initOrdereList="initOrdereList"  :id="id"/>

</template>

<script setup>

import {Search,Edit,Delete } from '@element-plus/icons-vue'
import { ref } from 'vue'
import  axios,{getServerUrl} from '@/util/axios'
import Dialog from './components/dialog'

import {ElMessageBox,ElMessage} from 'element-plus'

const queryForm=ref({
  query:'',
  pageNum:1,
  pageSize:10
})

const total=ref(0)


const tableData=ref([
])

const id=ref(-1)


const initOrderList=async()=>{
  console.log('xxx')
  const res=await axios.post("admin/order/list",queryForm.value);
  tableData.value=res.data.orderList;
  total.value=res.data.total;
}

initOrderList();

const dialogVisible=ref(false)



const handleSizeChange=(pageSize)=>{
  queryForm.value.pageNum=1;
  queryForm.value.pageSize=pageSize;
  initOrderList();
}

const handleCurrentChange=(pageNum)=>{
  queryForm.value.pageNum=pageNum;
  initOrderList();
}


const handleDialogValue = (row) => {
  id.value=row.id;
  dialogVisible.value=true;
}

const handleDelete = (id) => {

  ElMessageBox.confirm(
    '您确定要删除这条记录吗?',
    '系统提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(async() => {
      console.log("id="+id)
      let res=await axios.get("admin/order/delete/"+id);
      if(res.data.code==0){
        ElMessage({
          type: 'success',
          message: '删除成功！',
        });
        initOrderList();
      }else{
        ElMessage({
          type: 'error',
          message: res.data.msg,
        });
      }

    })
    .catch(() => {

    })
}

const handleOrderStatus = (id,status) => {
  ElMessageBox.confirm(
    '您确定要更新这个订单状态吗?',
    '系统提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(async() => {

      let res=await axios.post("admin/order/updateStatus",{id:id,status:status});
      if(res.data.code==0){
        ElMessage({
          type: 'success',
          message: '执行成功！',
        });
        initOrderList();
      }else{
        ElMessage({
          type: 'error',
          message: res.data.msg,
        });
      }

    })
    .catch(() => {

    })
}
//获取用户昵称的函数=>就是客户通过登录小程序获取到微信昵称
const wxUserInfoNickName = (row) => {
  if (row.wxUserInfo && row.wxUserInfo.nickName) { 
    let nickName = row.wxUserInfo.nickName; 
    console.log(nickName);
    return nickName
  } 
  else { // 输出打印的值 
    console.log('wxUserInfo is null or nickName is undefined')
  }
  // return row.wxUserInfo.nickName 直接报错
  //报错原因是因为获取不到微信用户登录的信息，并不能存放到数据库,就算有存放到数据的也是一串乱码
  //wxUserInfo 的值有可能是null的。
}
//订单状态
const statusFormatter = (row) => {
  let status=row.status;
  switch (status) {
    case 1:
      return "待支付";
    case 2:
      return "待发货"
    case 3:
      return "退款/退货"
  }
}

</script>

<style lang="scss" scoped>

.header{
  padding-bottom: 16px;
  box-sizing: border-box;
}

.el-pagination{
  padding-top: 15px;
  box-sizing: border-box;
}


</style>