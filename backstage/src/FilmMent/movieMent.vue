<template>
<template>
	<div>
		<el-table
	    :data="this.page.rows"
	    stripe
	    style="width: 100%">
	    <el-table-column
	      prop="_id"
	      label="编号"
	      width="230">
	    </el-table-column>
	    <el-table-column
	      prop="nameCN"
	      label="中文名"
	      width="180">
	    </el-table-column>
	    <el-table-column
	      prop="nameEN"
	      label="英文名">
	    </el-table-column>
	    <el-table-column
	      prop="type"
	      label="类型">
	    </el-table-column>
	    <el-table-column
	      fixed="right"
	      label="操作"
	      width="100">
	      <template scope="scope">
	        <el-button type="text" size="small">删除</el-button>
	      </template>
	    </el-table-column>
	  </el-table>
	  <!--  <el-pagination
	     @size-change="handleSizeChange"
	     @current-change="handleCurrentChange"
	     :current-page="page.curPage"
	     :page-sizes="[10, 20, 30, 40]"
	     :page-size="page.eachPage"
	     layout="total, sizes, prev, pager, next, jumper"
	     :total="page.count">
	   </el-pagination> -->
	</div>
	</template>
</template>
<script>
import axios from "axios"
export default {
	data(){
		return {
			pages:{
				curPage: 1,
				eachPage: 10,
				maxPage: 0,
				total:"",
				data: []
			}
		}
	},
	created() {
		this.getMoviePage()
	},
	methods:{
			async getMoviePage(page = this.page.curPage, rows = this.page.eachPage) {
			const {
				data
			} = await axios.get("http://localhost:2046/emd/find", {
				params: {
					page,
					rows
				}
			})
			console.log(data)
		}
	}
}
</script>