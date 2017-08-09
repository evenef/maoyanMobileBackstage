<template>
	<div>
		<div class="serch" style="margin: 20px">
			<el-input v-model="filters.acc" style="width: 200px" placeholder="请输入内容"></el-input>
			<el-button type="info" icon="search" @click="searchFuc">搜索</el-button>
			<el-button type="info" icon="plus" @click="addplayRoom">增加</el-button>
			<el-button type="info" icon="edit" @click="addformFuc">修改</el-button>
			<el-button type="info" icon="delete" @click="delCinema">删除</el-button>
		</div>
	    <el-dialog title="信息修改" v-model="addFormVisible" :close-on-click-modal="false" size="tiny">
			<el-form :model="addForm" label-width=""  ref="addForm">
				<el-form-item label="名称" prop="acc">
					<el-input v-model="addForm.acc" auto-complete="off" style="width:300px;"></el-input>
				</el-form-item>
				<el-form-item label="地址" prop="">
					<el-input v-model="addForm.address" auto-complete="off" style="width:300px;"></el-input>
				</el-form-item>
				<el-form-item label="电话" prop="">
					<el-input v-model="addForm.tel" auto-complete="off" style="width:300px;"></el-input>
				</el-form-item>
				<el-form-item label="网址" prop="">
					<el-input v-model="addForm.sites" auto-complete="off" style="width:300px;"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="addFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="addSubmit" :loading="addLoading">修改</el-button>
			</div>
		</el-dialog>

		    <el-dialog title="增加" v-model="editFormVisible" :close-on-click-modal="false" size="tiny">
			<el-form :model="editForm" label-width=""  ref="editForm">
				<el-form-item label="名称" prop="acc">
					<el-input v-model="editForm.acc" auto-complete="off" style="width:300px;"></el-input>
				</el-form-item>
				<el-form-item label="地址" prop="">
					<el-input v-model="editForm.address" auto-complete="off" style="width:300px;"></el-input>
				</el-form-item>
				<el-form-item label="电话" prop="">
					<el-input v-model="editForm.tel" auto-complete="off" style="width:300px;"></el-input>
				</el-form-item>
				<el-form-item label="网址" prop="">
					<el-input v-model="editForm.sites" auto-complete="off" style="width:300px;"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="addCinema" :loading="addLoading">添加</el-button>
			</div>
		</el-dialog>
		
	    <el-dialog title="增加放映厅" v-model="addRoomVisible" :close-on-click-modal="false" size="tiny">
			<el-form :model="addroom" label-width=""  ref="editForm">
				<el-form-item label="名称" prop="">
					<el-input v-model="addroom.name" auto-complete="off" style="width:300px;"></el-input>
				</el-form-item>
				<el-form-item label="座位" prop="">
					<el-input v-model="addroom.sate" auto-complete="off" style="width:300px;"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="addRoomVisible = false">取消</el-button>
				<el-button type="primary" @click.native="add_roomFuc" :loading="addLoading">增加</el-button>
			</div>
		</el-dialog>

	    <el-dialog title="查看放映厅" v-model="showRoomVisible" :close-on-click-modal="false" >
		  <el-table
		    :data="this.roomdata.data"
		    border
		    style="width: 100%">
		    <el-table-column
		      fixed
		      prop="name"
		      label="影厅"
		      width="">
		    </el-table-column>
		    <el-table-column
		      prop="sate"
		      label="座位号"
		      width="">
		    </el-table-column>
		    <el-table-column
		      fixed="right"
		      label="操作"
		      width="100">
		      <template scope="scope">
		        <el-button @click="" type="text" size="small">编辑</el-button>
		        <el-button type="text" size="small" @click="delplayRoomFuc(scope.$index,scope.row)">删除</el-button>
		      </template>
		    </el-table-column>
		  </el-table>
		<div slot="footer" class="dialog-footer">
			<el-button type="primary" @click.native="showRoomVisible = false" :loading="addLoading">关闭</el-button>
		</div>
		</el-dialog>

		<el-table
	    :data="this.page.data"
	    stripe
	    ref="multipleTable"
    	border
    	tooltip-effect="dark"
    	@selection-change="handleSelectionChange"
	    style="width: 100%"
	    >
	    <el-table-column
	      type="selection"
	      width="55"
	      >
	    </el-table-column>
			
	    <el-table-column
	      prop="name"
	      label="名称"
	      width="">
	      <template scope="scope">{{ scope.row.name }}</template>
	    </el-table-column>
	    <el-table-column
	      prop="address"
	      label="地址"
	       width="">
	    </el-table-column>
	    <el-table-column
	      prop="tel"
	      label="电话"
	       width="">
	    </el-table-column>
	    
		 <el-table-column
	      prop="site"
	      label="网址"
	      width="">
	    </el-table-column>
	    <el-table-column
	      fixed="right"
	      label="操作"
	      width="">
	      <template scope="scope">
	        <!-- <el-button @click="setMovie" type="text" size="small">修改</el-button> -->

	        <!-- <el-button type="text"@click="delMovie(scope.$index,scope.row)" size="small">删除</el-button> -->
	        <el-button @click="showRoomFuc(scope.$index,scope.row)" type="text" size="small">查看放映厅</el-button>
	        <el-button @click="add_room(scope.$index,scope.row)" type="text" size="small">新增放映厅</el-button>
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
const chaxun =params=>{return axios.get('http://localhost:2046/cinema/find',{params:params});};

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
				count: 0,
				data: []
			},
			filters:{
	          acc:""
	        },
			multipleSelection: [],
			roomdata:{
				curpage: 1,
				eachpage: 10,
				maxpage: 0,
				count:"",
				data: []
			},
			Id:[],
			addForm: {
				ids:'',
				acc: '',
				address: '',
				tel: '',
				sites: ''
				},
	        editForm: {
				acc: '',
				address: '',
				tel: '',
				sites: ''
				},
			addroom:{
				name:"",
				sate:""
			},	
        addFormVisible:false,
        addLoading: false,//是否显示添加页面
        editFormVisible:false, //是否显示编辑页面
        addRoomVisible:false, //放映厅的弹框
        showRoomVisible:false
		}
	},
	created() {
		this.getMoviePage()
		this.showRoomFuc()
	},
	methods:{
		async getMoviePage(page = this.page.curpage, rows = this.page.eachpage) {
			const {
				data
			} = await axios.get("http://localhost:2046/cinema/find", {
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
		},
		handleSizeChange(val) {
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
		//获取checkbox选中行的值
		 handleSelectionChange(val) {
        	this.multipleSelection = val;
      	},
      	//修改
		addformFuc(){
			console.log(this)
			console.log(this.multipleSelection)
          this.addFormVisible=true;
          this.addForm.ids = this.multipleSelection[0]._id
          this.addForm.acc = this.multipleSelection[0].name
          this.addForm.address = this.multipleSelection[0].address
          this.addForm.tel = this.multipleSelection[0].tel
          this.addForm.sites = this.multipleSelection[0].site
          console.log(this.addForm)
		},
		addplayRoom(){
		  this.editFormVisible=true;
		},
		add_room(index,row){
		 this.addRoomVisible = true	
		let para=Object.assign({},row);
		 console.log(para)
		 
		 this.Id = para._id;
		 console.log(this)
		 console.log(this.Id)
		},
		/*增加放映厅时项数据库存入影院id*/
		add_roomFuc(){
			this.$message({
	          message: '添加成功',
	          type: 'success'
	        });
			this.addRoomVisible = false	
			  console.log(this)
		 console.log(this.Id)
		   axios.get("http://localhost:2046/rooms/add", {
			params: {
				name:this.addroom.name,
				sate:this.addroom.sate,
				room_Id:this.Id
			}

		 })
		},
		async showRoomFuc(index,row) {
				console.log(row._id)
				this.showRoomVisible = true
				const {data} = await axios.get("http://localhost:2046/rooms/find", {
					params: {
						room_Id:row._id
					}
				})
				console.log(data)
				this.roomdata = {
					data:data
				}
		},
		//影院添加
		addCinema(){
			this.$message({
	          message: 'success',
	          type: 'success'
	        });
			this.editFormVisible = false
			console.log(this.editForm)
			axios.get("http://localhost:2046/cinema/add", {
				params: {
					name:this.editForm.acc,
					address:this.editForm.address,
					tel:this.editForm.tel,
					site:this.editForm.sites
				}
			})
			this.getMoviePage()
		},
		//影院删除
		delCinema(){
			console.log(this)
			console.log(this.multipleSelection[0]._id)
			const del_id = this.multipleSelection[0]._id
			axios.get("http://localhost:2046/cinema/del", {
				params: {
					_id:del_id
				}
			})
			this.getMoviePage()
		},
		//影院提交修改
		addSubmit(){
			this.$message({
	          message: '修改成功',
	          type: 'success'
	        });
			console.log(this.addForm)
			axios.get("http://localhost:2046/cinema/update", {
				params: {
					 _id:this.addForm.ids,
					 name:this.addForm.acc,
					 address:this.addForm.address,
					 tel:this.addForm.tel,
					 site:this.addForm.sites

				}
			})
			this.getMoviePage()
			this.addFormVisible=false;
		},
		//搜索查询
		searchFuc(){
			 let para={
	           name:this.filters.acc
	         };
	         chaxun(para).then((res)=>{
	           this.page.data=res.data
	         })
		},
		//影厅删除
		async delplayRoomFuc(index,row){
			this.updateroomFuc()
			console.log(row)
	       const {data}  = await axios.get('http://localhost:2046/rooms/del',{
	        	params:{
	        		_id:row._id
	        	}

	        })
	       console.log(data)
	       console.log(this.roomdata)
	        
		},
		//加载新的roomplayFuc界面
		async updateroomFuc(){
		  const {data}  = await axios.get('http://localhost:2046/rooms/find',{
        	params:{}
         })
		  console.log(data)
		  this.roomdata = data
		}

	}
}
</script>
<style>
</style>