<template>
<div>
<h1>用户管理</h1>
 <el-table  :data="this.pages.rows"
      
      style="width: 80%">
      <el-table-column
        prop="acc"
        label="姓名"
        width="100"
        >
      </el-table-column>
      <el-table-column
        prop="pwd"
        label="密码"
        width="100">
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱"
        width="180">
      </el-table-column>
      <el-table-column
        prop="tel"
        label="电话"
        width="180">
      </el-table-column>
      <el-table-column
        prop="bth"
        label="生日">
      </el-table-column>
	  <el-table-column
      fixed="right"
      label="操作"
      width="220"
      align="center"
      >
      <template scope="scope">
       
        <el-button type="text" size="danger" style="width:80px;">删除</el-button>
        <el-button type="text" size="danger" style="width:80px;">编辑</el-button>
      </template>
    </el-table-column>
    </el-table>
    <div>
        当前页：<span>{{pages.curpage}}</span>
        &nbsp;&nbsp;
        总页数：<span>{{pages.maxpage}}</span>
        &nbsp;&nbsp;
        总条数： <span>{{pages.total}}</span>
    </div>
    <div style="margin-top:20px;">
        <el-button @click="toppage">上一页</el-button>  <el-button @click="listpage">下一页</el-button>
    </div>
</div>

</template>

  

<script>
import axios from 'axios'
    export default{
        data () {
      return {
          pages:{
            page:1,
            maxpage:0,
            total:0,
            eachpage:6,
            data:[]
          }
      }
    },
    created(){
			this.gerusers()
		},
    methods:{
        async gerusers(rows=this.pages.eachpage,page=this.pages.page){
                const {data}=await axios.get("http://localhost:3000/user/find",{
                    params:{
                        rows,
                        page
                    }
                })
                this.pages={
                    rows:data.rows,
                    maxpage:data.maxpage,
                    total:data.total,
                    curpage:data.curpage
                }
                console.log(data)

        }
        // toppage(){
        //     if (this.$data.pages) {
                
        //     }
        // }
    }
    }
</script>
<style scope>
*{
   
}
</style>
