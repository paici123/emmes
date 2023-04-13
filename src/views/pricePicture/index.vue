<template>
  <div class="data-view">
    <el-card>
      <div id="main"></div>
    </el-card>
  </div>
</template>

<script setup>
import * as echarts from 'echarts';
import { ref } from 'vue'
import axios,{getServerUrl} from '@/util/axios'
const queryForm=ref({
  query:'',
  pageNum:1,
  pageSize:10
})

const total=ref(0)
const tableData=ref([])
const initProductList=async()=>{
  console.log('xxx')
  const res=await axios.post("admin/product/list",queryForm.value);
  tableData.value=res.data.productList;
  total.value=res.data.total;
  console.log(res.data.productList)

  const names = tableData.value.map(item => item.name);
  const price = tableData.value.map(item => item.price);
  console.log(names);
  console.log(price);

  var myChart = echarts.init(document.getElementById('main'));
  // 绘制图表
  myChart.setOption({
    title: {
      text: '商品价格管理图'
    },
    tooltip: {},
    xAxis: {
      data: names
    },
    yAxis: {},
    series: [
      {
        name: '价格',
        type: 'bar',
        data: price
      }
    ]
  });
}

initProductList();
</script>

<style lang="scss" scoped>
.data-view{
  width:100%;
  .el-card{
    width:100%;
    height:100%;
    #main{
      height:500px;
    }
  }
}
</style>