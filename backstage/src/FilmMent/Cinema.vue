<template>
	<div>
		<el-table
	    :data="this.page.data"
	    stripe
	    style="width: 100%">
	    <el-table-column
	      prop="name"
	      label="名称"
	      width="">
	    </el-table-column>
	    <el-table-column
	      prop="tell"
	      label="电话"
	       width="">
	    </el-table-column>
	    <el-table-column
	      prop="addr"
	      label="地址"
	       width="">
	    </el-table-column>
		 <el-table-column
	      prop="getMoney"
	      label="余票"
	      width="">
	    </el-table-column>
	    <el-table-column
	      fixed="right"
	      label="操作"
	      width="">
	      <template scope="scope">
	        <!-- <el-button @click="setMovie" type="text" size="small">修改</el-button> -->

	        <!-- <el-button type="text"@click="delMovie(scope.$index,scope.row)" size="small">删除</el-button> -->
	        <el-button @click="setMovie" type="text" size="small">新增放映厅</el-button>
	      </template>
	    </el-table-column>
	  </el-table>
	  <el-pagination
	   @size-change="handleSizeChange"
	   @current-change="handleCurrentChange"
	   :current-page="this.page.curpage"
	   :page-sizes="[10, 15, 20, 30]"
	   :page-size="this.page.eachpage"
	   layout="total, sizes, prev, pager, next, jumper"
	   :total="this.page.count">
	 </el-pagination>
	</div>
	</template>
<script>
import axios from "axios"
// import router from "../router/router.js"
import Router from 'vue-router'
export default {
	data(){
		return {
			page:{
				curpage: 1,
				eachpage: 10,
				maxpage: 0,
				count:"",
				data: []
			}
		}
	},
	created() {
		this.getMoviePage()
	},
	methods:{
		async getMoviePage(page = this.page.curpage, rows = this.page.eachpage) {
			const {
				data
			} = await axios.get("http://localhost:2046/movieList/find", {
				params: {
					page,
					rows
				}
			})
			this.page = {
				curpage:data.curpage,
				eachpage:data.eachpage,
				maxpage:data.maxpage,
				count:data.total,
				data:data.rows
			}

			// console.log(this.page);
		},
		handleSizeChange(val) {
			console.log(this.page.curpage)
		    console.log(val)
		    this.getMoviePage(
		    	this.page.curpage,
				val
		    )
		},
		handleCurrentChange(val) {
			console.log(val)
			   this.getMoviePage(
		    	 val,
				 this.page.eachpage
		    )
		},
		setMovie(){
			// history.pushState("/setMovie")
		
		},
		delMovie(index,row){
			const movie_Id = row._id;
			console.log(movie_Id)
		this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          axios.get("http://localhost:2046/emd/del", {
				params: {
					_id:movie_Id
				}
			})
			this.getMoviePage()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
		}
	
	}
}
</script>