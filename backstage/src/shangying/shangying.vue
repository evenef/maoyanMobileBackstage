<template>
  
<div>
    <el-table  :data="this.pages.rows"
      
      style="width: 100%"
      >
      <el-table-column
      type="selection"
      width="55">
    </el-table-column>
      <el-table-column
        prop="nameCN"
        label="电影名"
       
        >
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
     
      filter-placement="bottom-end">
      <template scope="scope"  >
        <el-button
       
          :type="scope.row.hotShow === '否' ? 'default' : 'primary'"
          close-transition style="width:60px;text-align: center;height:30px;line-height: 10px;" @click.native="zhuangtai(scope.$index,scope.row)"> {{scope.row.hotShow}}</el-button>
      </template>
    </el-table-column>
     
    </el-table>
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
             eachpage:10,
             data:[]
         },
         hascenima:"",
         hotOnline:""
     }
 },
 created(){
     this.gerusers();
 }
 ,
 methods:{
     async gerusers(rows=this.pages.eachpage,page=this.pages.page){
            
                const {data}=await axios.get("http://localhost:3000/movie/find",{
                    params:{
                        rows,
                        page
                    }
                })
                this.pages={
                    rows:data.rows,
                    maxpage:data.maxpage,
                    total:data.total,
                    curpage:data.curpage,
                    eachpage:data.eachpage,
                    //  listLoading:false,
                }
            //     this.hotOnline=data.rows.hotOnline
            //    console.log(this.data.hotOnline)
                 
                
                // console.log(data)
                

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
        // console.log(row.hotShow)
        if (row.hotShow=="是") {
           let para={_id:row._id,hotShow:"否"}
            editupdate(para).then((res)=>{
                this.gerusers();
            })
        }
        else if(row.hotShow=="否"){
           let para={_id:row._id,hotShow:"是"}
            editupdate(para).then((res)=>{
                this.gerusers();
            })

        }
      },
      reying(index,row){
          if (row.hotOnline=="是") {
            let para={_id:row._id,hotOnline:"否"}
            editupdate(para).then((res)=>{
                this.gerusers();
            })
        }
        else if(row.hotOnline=="否"){
            let para={_id:row._id,hotOnline:"是"}
            editupdate(para).then((res)=>{
                this.gerusers();
            })

        }

      },
      jijiang(index,row){
        //   console.log(row._id)
         
           if (row.soon=="是") {
            let para={_id:row._id,soon:"否"}
            console.log(para)
            editupdate(para).then((res)=>{
                this.gerusers();
            })
        }
        else if(row.soon=="否"){
           let para={_id:row._id,soon:"是"}
           editupdate(para).then((res)=>{
                this.gerusers();
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


