<template>
  
<div>
    <el-table  :data="this.pages.data" border
      style="min-width: 900px">
        <!-- <el-table-column
        type="selection"
        width="55">
      </el-table-column> -->
        <el-table-column
          prop="nameCN"
          label="电影名" align="center">
        </el-table-column>
        <el-table-column
          prop="country"
          label="地区" align="center">
        </el-table-column>
        <el-table-column
          prop="showTime"
          label="上映时间" align="center">
        </el-table-column>
        <el-table-column
          prop="hotOnline"
          label="正在热映"
         :filters="[{ text: '是', value: '是' }, { text: '否', value: '否' }]"
        :filter-method="filterTagte"
        filter-placement="bottom-end"
          align="center">
          <template scope="scope">
          <el-button
            :type="scope.row.hotOnline === '否' ? 'default' : 'primary'"
            close-transition style="width:60px;text-align: center;height:30px;line-height: 10px;" @click.native="reying(scope.$index,scope.row)">{{scope.row.hotOnline}}</el-button>
        </template>
        </el-table-column>
        <el-table-column
          prop="soon"
          label="即将上映"
         :filters="[{ text: '是', value: '是' }, { text: '否', value: '否' }]"
        :filter-method="filterTagt"
        
        filter-placement="bottom-end"
          align="center">
          <template scope="scope">
          <el-button
            :type="scope.row.soon === '否' ? 'dafault' : 'primary'"
            close-transition style="width:60px;text-align: center;height:30px;line-height:10px;" @click.native="jijiang(scope.$index,scope.row)">{{scope.row.soon}}</el-button>
        </template>
        </el-table-column>
        <el-table-column
        prop="hotShow"
        label="正在热播"
      
        :filters="[{ text: '是', value: '是' }, { text: '否', value: '否' }]"
        :filter-method="filterTag"
        align="center"
        filter-placement="bottom-end">
        <template scope="scope"  >
          <el-button
         
            :type="scope.row.hotShow === '否' ? 'default' : 'primary'"
            close-transition style="width:60px;text-align: center;height:30px;line-height: 10px;" @click.native="zhuangtai(scope.$index,scope.row)"> {{scope.row.hotShow}}</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="block">
      <el-pagination
        @size-change="rowsChange"
        @current-change="pageChange"
        :current-page="pages.page"
        :page-sizes="[5, 10, 20, 50, 100]"
        :page-size="pages.rows"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pages.total">
      </el-pagination>
    </div>

</div>
</template>
<script>
  import axios from 'axios'
  const editupdate =params =>{return axios.get('http://localhost:3000/movie/update',{params:params});};
  const chaxun =params=>{return axios.get('http://localhost:3000/movie/find',{params:params});};
  export default {
   data(){
     return{
       pages:{
         page:1,
         rows:10,
         maxpage: 0,
         total: 0,
         data:[]
       },
       hascenima:"",
       hotOnline:""
     }
   },
   created(){
     this.getData();
   },
   methods:{
     async getData(rows=this.pages.rows,page=this.pages.page){
      const {data}=await axios.get("http://localhost:3000/movie/find",{
        params:{
          rows,
          page
        }
      })
      this.pages={
        page: data.curpage,
        rows: data.eachpage,
        maxpage: data.maxpage,
        total: data.total,
        data: data.rows,
      }
    },
    rowsChange(rows) {
      this["pages"].rows = rows
      this.getData()
    },
    pageChange(page) {
      this["pages"].page = page
      this.getData()
    },
    filterTag(value, row) {
      return row.hotShow === value;
    },
    filterTagt(value,row){
      return row.soon === value;
    },
    filterTagte(value,row){
     return row.hotOnline === value;
   },
   zhuangtai(index,row){
    if (row.hotShow=="是") {
     let para={_id:row._id,hotShow:"否"}
     editupdate(para).then((res)=>{
      this.getData();
    })
   }
   else if(row.hotShow=="否"){
     let para={_id:row._id,hotShow:"是"}
     editupdate(para).then((res)=>{
      this.getData();
    })
   }
 },
 reying(index,row){
  if (row.hotOnline=="是") {
    let para={_id:row._id,hotOnline:"否"}
    editupdate(para).then((res)=>{
      this.getData();
    })
  }
  else if(row.hotOnline=="否"){
    let para={_id:row._id,hotOnline:"是"}
    editupdate(para).then((res)=>{
      this.getData();
    })
  }
},
jijiang(index,row){
  if (row.soon=="是") {
    let para={_id:row._id,soon:"否"}
    console.log(para)
    editupdate(para).then((res)=>{
      this.getData();
    })
  }
  else if(row.soon=="否"){
   let para={_id:row._id,soon:"是"}
   editupdate(para).then((res)=>{
    this.getData();
  })
 }
}
}
}
</script>

<style scoped>
  td{
    color: red;
  }
  .cell{
    background-color: red;
  }
</style>


