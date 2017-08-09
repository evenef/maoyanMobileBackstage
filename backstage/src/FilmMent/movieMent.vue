<template>
	<div>
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
				<el-form-item label="演员" prop="">
					<el-input v-model="getmovie.actors" auto-complete="off" style="width:400px;"></el-input>
				</el-form-item>
				<el-form-item label="票房" prop="">
					<el-input v-model="getmovie.getMoney" auto-complete="off" style="width:400px;"></el-input>
				</el-form-item>
				<el-form-item label="剧情简介" prop="">
					<el-input v-model="getmovie.story" auto-complete="off" style="width:400px;"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="getMovieVisible = false">取消</el-button>
				<el-button type="primary" @click.native="getMovieInfo" >确定</el-button>
			</div>
		</el-dialog>
		<el-table
	    :data="this.page.data"
	    stripe
	    style="width: 100%">
	     <el-table-column
	      type="selection"
	      width="55"
	      >
	    </el-table-column>
	    <el-table-column
	      prop="nameCN"
	      label="中文名"
	      width="120">
	    </el-table-column>
	    <el-table-column
	      prop="nameEN"
	      label="英文名"
	       width="150">
	    </el-table-column>
	    <el-table-column
	      prop="type"
	      label="类型"
	       width="120">
	    </el-table-column>
		 <el-table-column
	      prop="country"
	      label="国家/地区"
	      width="120">
	    </el-table-column>
	     <el-table-column
	      prop="min"
	      label="片长(分钟)"
	      width="120">
	    </el-table-column>
	     <el-table-column
	      prop="showTime"
	      label="上映时间"
	      width="120">
	    </el-table-column>
	     <el-table-column
	      prop="showPlace"
	      label="上映地区"
	      width="120">
	    </el-table-column>
	     <el-table-column
	      prop="scoreUser"
	      label="用户评分"
	      width="120">
	    </el-table-column>
	     <el-table-column
	      prop="scorePro"
	      label="专业评分"
	      width="120">
	    </el-table-column>
		 <el-table-column
	      prop="wantSee"
	      label="想看"
	      width="120">
	    </el-table-column>
	     <el-table-column
	      prop="director"
	      label="导演"
	      width="120">
	    </el-table-column>
	     <el-table-column
	      prop="actors"
	      label="演员"
	      width="120">
	    </el-table-column>
	     <el-table-column
	      prop="getMoney"
	      label="票房"
	      width="120">
	    </el-table-column>
		 <el-table-column
	      prop="story"
	      label="剧情简介"
	      width="120">
	    </el-table-column>
	     <el-table-column
	      prop="imgs"
	      label="图集"
	      width="120">
	    </el-table-column>
	     <el-table-column
	      prop="firstImg"
	      label="首页图片"
	      width="120">
	    </el-table-column>

	    <el-table-column
	      fixed="right"
	      label="操作"
	      width="140">
	      <template scope="scope">
	        <el-button @click="getMovieFuc(scope.$index,scope.row)" type="info" size="small">修改</el-button>
	        <el-button  type="danger" @click="delMovie(scope.$index,scope.row)" size="small">删除</el-button>
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
const chaxuns =params=>{return axios.get('http://localhost:2046/movie/find',{params:params});};

const remove = params => { return axios.get("http://localhost:2046/cinema/del", { params: params }); };

export default {

	data(){
		return {
			page:{
				curpage: 1,
				eachpage: 10,
				maxpage: 0,
				count:"",
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
				imgs:[],
				firstImg:[]
			},
			getmovie:{
				_id:"",
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
			} = await axios.get("http://localhost:2046/movie/find", {
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
		 handleRemove(file, fileList) {
	        console.log(file);
	      },
	      handlePreview(file) {
	        // console.log(file);
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
	          axios.get("http://localhost:2046/movie/del", {
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
			console.log(this.editfiter.acc)
			 let paras={
	           nameCN:this.editfiter.acc
	         };
	         chaxuns(paras).then((res)=>{
	         	console.log(res)
	           this.page.data=res.data
	         })
		},
		addmovieFuc(){
			this.addMovieVisible = true
		},
		setMovieInfo(){
			console.log(this.addmovie)
			/*this.addMovieVisible = false
			 this.$message({
	          message: '恭喜你，添加成功',
	          type: 'success'
	        });
		   axios.get("http://localhost:2046/movie/add", {
				params:this.addmovie
			})
			this.getMoviePage()*/
		},
		getMovieFuc(index,row){
			this.getMovieVisible = true
			this.getmovie.nameCN = row.nameCN
			this.getmovie.nameEN = row.nameEN
			this.getmovie.type = row.type
			this.getmovie.country = row.country
			this.getmovie.min = row.min
			this.getmovie.showTime = row.showTime
			this.getmovie.showPlace = row.showPlace
			this.getmovie.scoreUser = row.scoreUser
			this.getmovie.scorePro = row.scorePro
			this.getmovie.wantSee = row.wantSee
			this.getmovie.director = row.director
			this.getmovie.actors = row.actors
			this.getmovie.getMoney = row.getMoney
			this.getmovie.story = row.story
			this.getmovie._id = row._id
		},
		getMovieInfo(){
			this.$message({
	          message: '修改成功',
	          type: 'success'
	        });
			this.getMovieVisible = false
			axios.get("http://localhost:2046/movie/update", {
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
		}
	
	}
}
</script>