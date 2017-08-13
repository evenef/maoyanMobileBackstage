<template>
	<div class="content">
		<div class="serch" style="margin: 20px">
			<el-input v-model="editfiter.acc"  style="width: 200px" placeholder="请输入内容"></el-input>
			<el-button type="info" icon="search" @click="search_fuc">搜索</el-button>
			<el-button type="info" icon="plus" @click="addmovieFuc">增加</el-button>
		</div>
		<el-dialog title="增加电影" v-model="addMovieVisible" :close-on-click-modal="false" size="small">
			<el-form :model="addmovie" label-width="130px"  ref="addmovie">
				<el-form-item label="中文名" prop="">
					<el-input v-model="addmovie.nameCN" auto-complete="off" style="width:400px;"></el-input>
				</el-form-item>
				<el-form-item label="英文名" prop="">
					<el-input v-model="addmovie.nameEN" auto-complete="off" style="width:400px;"></el-input>
				</el-form-item>
				<el-form-item label="类型" prop="">
					<el-input v-model="addmovie.type" auto-complete="off" style="width:400px;"></el-input>
				</el-form-item>
				<el-form-item label="国家" prop="">
					<el-input v-model="addmovie.country" auto-complete="off" style="width:400px;"></el-input>
				</el-form-item>
				<el-form-item label="分钟/时长" prop="">
					<el-input v-model="addmovie.min" auto-complete="off" style="width:400px;"></el-input>
				</el-form-item>
				<el-form-item label="上映时间" prop="">
					<el-input v-model="addmovie.showTime" auto-complete="off" style="width:400px;"></el-input>
				</el-form-item>
				<el-form-item label="上映地区" prop="">
					<el-input v-model="addmovie.showPlace" auto-complete="off" style="width:400px;"></el-input>
				</el-form-item>
				<el-form-item label="用户评分" prop="">
					<el-input v-model="addmovie.scoreUser" auto-complete="off" style="width:400px;"></el-input>
				</el-form-item>
				<el-form-item label="专业评分" prop="">
					<el-input v-model="addmovie.scorePro" auto-complete="off" style="width:400px;"></el-input>
				</el-form-item>
				<el-form-item label="想看" prop="">
					<el-input v-model="addmovie.wantSee" auto-complete="off" style="width:400px;"></el-input>
				</el-form-item>
				<el-form-item label="导演" prop="">
					<el-input v-model="addmovie.director" auto-complete="off" style="width:400px;"></el-input>
				</el-form-item>
				<el-form-item label="演员" prop="">
					<el-input v-model="addmovie.actors" auto-complete="off" style="width:400px;"></el-input>
				</el-form-item>
				<el-form-item label="票房" prop="">
					<el-input v-model="addmovie.getMoney" auto-complete="off" style="width:400px;"></el-input>
				</el-form-item>
				<el-form-item label="剧情简介" prop="">
					<el-input v-model="addmovie.store" auto-complete="off" style="width:400px;"></el-input>
				</el-form-item>
				<!-- <el-upload
				  class="upload-demo"
				  action="https://jsonplaceholder.typicode.com/posts/"
				  :on-preview="handlePreview"
				  :on-remove="handleRemove"
				  :file-list="fileList">
				  <el-button size="small" type="primary">点击上传</el-button>
				  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
				</el-upload> -->
			
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="addMovieVisible = false">取消</el-button>
				<el-button type="primary" @click.native="setMovieInfo" >增加</el-button>
			</div>
		</el-dialog>
		<!-- 修改电影 -->
		<el-dialog title="修改电影" v-model="getMovieVisible" :close-on-click-modal="false" size="small">
			<el-form :model="getmovie" label-width="130px"  ref="getmovie">
				<el-form-item label="中文名" prop="">
					<el-input v-model="getmovie.nameCN" auto-complete="off" style="width:400px;"></el-input>
				</el-form-item>
				<el-form-item label="英文名" prop="">
					<el-input v-model="getmovie.nameEN" auto-complete="off" style="width:400px;"></el-input>
				</el-form-item>
				<el-form-item label="类型" prop="">
					<el-input v-model="getmovie.type" auto-complete="off" style="width:400px;"></el-input>
				</el-form-item>
				<el-form-item label="国家" prop="">
					<el-input v-model="getmovie.country" auto-complete="off" style="width:400px;"></el-input>
				</el-form-item>
				<el-form-item label="分钟/时长" prop="">
					<el-input v-model="getmovie.min" auto-complete="off" style="width:400px;"></el-input>
				</el-form-item>
				<el-form-item label="上映时间" prop="">
					<el-input v-model="getmovie.showTime" auto-complete="off" style="width:400px;"></el-input>
				</el-form-item>
				<el-form-item label="上映地区" prop="">
					<el-input v-model="getmovie.showPlace" auto-complete="off" style="width:400px;"></el-input>
				</el-form-item>
				<el-form-item label="用户评分" prop="">
					<el-input v-model="getmovie.scoreUser" auto-complete="off" style="width:400px;"></el-input>
				</el-form-item>
				<el-form-item label="专业评分" prop="">
					<el-input v-model="getmovie.scorePro" auto-complete="off" style="width:400px;"></el-input>
				</el-form-item>
				<el-form-item label="想看" prop="">
					<el-input v-model="getmovie.wantSee" auto-complete="off" style="width:400px;"></el-input>
				</el-form-item>
				<el-form-item label="导演" prop="">
					<el-input v-model="getmovie.director" auto-complete="off" style="width:400px;"></el-input>
				</el-form-item>
				<el-form-item label="演员" type="textarea" prop="">
					<el-input type="textarea" :autosize="{ minRows: 3}" v-model="getmovie.actors" auto-complete="off" style="width:400px;"></el-input>
				</el-form-item>
				<el-form-item label="票房" prop="">
					<el-input v-model="getmovie.getMoney" auto-complete="off" style="width:400px;"></el-input>
				</el-form-item>
				<el-form-item label="剧情简介" prop="">
					<el-input type="textarea" :autosize="{ minRows: 6}" v-model="getmovie.story" auto-complete="off" style="width:400px;"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="getMovieVisible = false">取消</el-button>
				<el-button type="primary" @click.native="getMovieInfo" >确定</el-button>
			</div>
		</el-dialog>
		<el-table
	    :data="this.page.data"
	    border
	    style="width: 100%">
	     <el-table-column
	      type="selection"
	      align="center"
	      width="50">
	    </el-table-column>
	    <el-table-column
	      prop="nameCN"
	      label="中文名"
	      align="center"
	      width="120">
	    </el-table-column>
	    <el-table-column
	      prop="nameEN"
	      label="英文名"
	      align="center"
	       width="150">
	    </el-table-column>
	    <el-table-column
	      prop="type"
	      label="类型"
	      align="center"
	       width="100">
	    </el-table-column>
		 <el-table-column
	      prop="country"
	      label="国家/地区"
	      align="center"
	      width="100">
	    </el-table-column>
	     <el-table-column
	      prop="showTime"
	      label="上映时间"
	      align="center"
	      width="120">
	    </el-table-column>
	     <el-table-column
	      prop="director"
	      label="导演"
	      align="center"
	      width="120">
	    </el-table-column>
	     <el-table-column
	      prop="actors"
	      label="演员"
	      align="center"
	      width="120">
	    </el-table-column>
	    </el-table-column>
		 <el-table-column
	      prop="story"
	      label="剧情简介"
	      header-align="center"
	      align="left"
	      min-width="200">
	    </el-table-column>
	    <el-table-column
	      fixed="right"
	      label="操作"
	      align="center"
	      width="160">
	      <template scope="scope">
	        <el-button @click="getMovieFuc(scope.$index,scope.row)" type="info" size="small">修改</el-button>
	        <el-button  type="warning" @click="delMovie(scope.$index,scope.row)" size="small">删除</el-button>
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

<!-- *******************JavaScript******************************* -->
<!-- *******************JavaScript******************************* -->
<!-- *******************JavaScript******************************* -->
<!-- *******************JavaScript******************************* -->
<!-- *******************JavaScript******************************* -->
<!-- *******************JavaScript******************************* -->
<!-- *******************JavaScript******************************* -->
<!-- *******************JavaScript******************************* -->
<!-- *******************JavaScript******************************* -->
<!-- *******************JavaScript******************************* -->
<!-- *******************JavaScript******************************* -->
<!-- *******************JavaScript******************************* -->
<!-- *******************JavaScript******************************* -->
<!-- *******************JavaScript******************************* -->
<script>
	import axios from "axios"
// import router from "../router/router.js"
import Router from 'vue-router'
const chaxuns =params=>{return axios.get('http://localhost:3000/movie/find',{params:params});};

const remove = params => { return axios.get("http://localhost:3000/cinema/del", { params: params }); };

export default {

	data(){
		return {
			page:{
				curpage: 1,
				eachpage: 10,
				maxpage: 0,
				count: 0,
				data: []
			},
			editfiter:{
				acc:""
			},
			fileList:[],
			addmovie:{
				nameCN:"",
				nameEN:"",
				type:"",
				country:"",
				min:"",
				showTime:"",
				showPlace:"",
				scoreUser:"",
				scorePro:"",
				wantSee:"",
				director:"",
				actors:"",
				getMoney:"",
				story:"",
				hascenima: "否",
				hotOnline: "否",
				soon: "否",
				hotShow: "否",
				imgs:[],
				firstImg:[]
			},
			getmovie:{
				imgs:[],
				firstImg:[]
			},
			addMovieVisible:false,
			getMovieVisible:false
		}
	},
	created() {
		this.getMoviePage()
	},
	methods:{
		async getMoviePage(page = this.page.curpage, rows = this.page.eachpage) {
			const {
				data
			} = await axios.get("http://localhost:3000/movie/find", {
				params: {
					page,
					rows
				}
			})
			this.page = {
				curpage: data.curpage,
				eachpage: data.eachpage,
				maxpage: data.maxpage,
				count: data.total,
				data: data.rows.map((item) => {
					if(item.story)
						item.story = item.story.substring(0, 26) + "..."
					if(item.actors)
						item.actors = item.actors.split(",").map((i) => {
							return i.split("/")[0]
						}).join(",").substring(0, 10) + "..."
					if(item.type.length >= 10)
						item.type = item.type.substring(0, 10) + "..."
					if(item.nameEN.length >= 26)
						item.nameEN = item.nameEN.substring(0, 26) + "..."
					if(item.director.length >= 10)
						item.director = item.director.substring(0, 10) + "..."
					return item
				})
			}
		},
		async changeMovieState(_id) {
			const {
				data
			} = await axios.get("http://localhost:3000/movie/find", {
				params: {
					_id
				}
			})
			this.getmovie.nameCN = data.nameCN
			this.getmovie.nameEN = data.nameEN
			this.getmovie.type = data.type
			this.getmovie.country = data.country
			this.getmovie.min = data.min
			this.getmovie.showTime = data.showTime
			this.getmovie.showPlace = data.showPlace
			this.getmovie.scoreUser = data.scoreUser
			this.getmovie.scorePro = data.scorePro
			this.getmovie.wantSee = data.wantSee
			this.getmovie.director = data.director
			this.getmovie.actors = data.actors
			this.getmovie.getMoney = data.getMoney
			this.getmovie.story = data.story
			this.getmovie._id = data._id

			this.getMovieVisible = true
		},
		getMovieFuc(index,row){
			this.changeMovieState(row._id)
		},
		getMovieInfo(){
			this.$message({
				message: '修改成功',
				type: 'success'
			});
			this.getMovieVisible = false
			axios.get("http://localhost:3000/movie/update", {
				params: {
					_id:this.getmovie._id,
					nameCN:this.getmovie.nameCN,
					nameEN:this.getmovie.nameEN,
					type:this.getmovie.type,
					country:this.getmovie.country,
					min:this.getmovie.min,
					showTime:this.getmovie.showTime,
					showPlace:this.getmovie.showPlace,
					scoreUser:this.getmovie.scoreUser,
					scorePro:this.getmovie.scorePro,
					wantSee:this.getmovie.wantSee,
					director:this.getmovie.director,
					actors:this.getmovie.actors,
					getMoney:this.getmovie.getMoney,
					story:this.getmovie.story,
				}
			})
			this.getMoviePage()
		},
		handleSizeChange(val) {
			this.getMoviePage(
				this.page.curpage,
				val
				)
		},
		handleCurrentChange(val) {
			this.getMoviePage(
				val,
				this.page.eachpage
				)
		},
		handleRemove(file, fileList) {
			console.log(file);
		},
		handlePreview(file) {
	        // console.log(file);
	    },
	    delMovie(index,row){
	    	const movie_Id = row._id;
	    	this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
	    		confirmButtonText: '确定',
	    		cancelButtonText: '取消',
	    		type: 'warning'
	    	}).then(() => {
	    		this.$message({
	    			type: 'success',
	    			message: '删除成功!'
	    		});
	    		axios.get("http://localhost:3000/movie/del", {
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
	    },
	    search_fuc(){
	    	let paras={
	    		nameCN:this.editfiter.acc
	    	};
	    	chaxuns(paras).then((res)=>{
	    		this.page.data=res.data.map((item) => {
	    			item.story = item.story.substring(0, 26) + "..."
	    			item.actors = item.actors.split(",").map((i) => {
	    				return i.split("/")[0]
	    			}).join(",").substring(0, 10) + "..."
	    			if(item.type.length >= 10)
	    				item.type = item.type.substring(0, 10) + "..."
	    			if(item.nameEN.length >= 26)
	    				item.nameEN = item.nameEN.substring(0, 26) + "..."
	    			if(item.director.length >= 10)
	    				item.director = item.director.substring(0, 10) + "..."
	    			return item
	    		})
	    	})
	    },
	    addmovieFuc(){
	    	this.addMovieVisible = true
	    },
	    setMovieInfo(){
	    	this.addMovieVisible = false
	    	this.$message({
	    		message: '添加成功',
	    		type: 'success'
	    	});
	    	axios.get("http://localhost:3000/movie/add", {
	    		params:this.addmovie
	    	})
	    	this.getMoviePage()
	    }
	}
}
</script>
<style scoped>
</style>