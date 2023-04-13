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
  tableData.value=res.data.productList;//获取商品列表数据
  total.value=res.data.total;
  console.log(res.data.productList)

  const names = tableData.value.map(item => item.name);
  const stock = tableData.value.map(item => item.stock);
  const price = tableData.value.map(item => item.price);
  // console.log(names);//测试

  var myChart = echarts.init(document.getElementById('main'));
  // 绘制图表
  myChart.setOption({
    title: {
      text: '商品价格库存图'
    },
    tooltip: {
      trigger:'axis'
    },
    xAxis: {
      data: names
    },
    yAxis: {
      type:'value'
    },
    series: [
      {
        name:'商品价格',
        type: 'line',
        stack: '价格',
        data: price
      },
      {
        name:'商品库存',
        type: 'line',
        stack: '库存',
        data: stock
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