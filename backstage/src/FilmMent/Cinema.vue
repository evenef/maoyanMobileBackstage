<template>
	<div>
		<div class="serch" style="margin: 20px">
			<el-input v-model="filters.acc" style="width: 200px" placeholder="请输入内容"></el-input>
			<el-button type="info" icon="search" @click="searchFuc">搜索</el-button>
			<el-button type="info" icon="plus" @click="addplayRoom">增加</el-button>
			<el-button type="info" icon="delete" @click="delmoreData">批量删除</el-button>
			<!-- <el-button type="info" icon="edit" @click="addformFuc">修改</el-button>
			<el-button type="info" icon="delete" @click="delCinema">删除</el-button> -->
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
					<el-input v-model="addForm.tells" auto-complete="off" style="width:300px;"></el-input>
				</el-form-item>
				<el-form-item label="网址" prop="">
					<el-input v-model="addForm.sites" auto-complete="off" style="width:300px;"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="addFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="addSubmit" >修改</el-button>
			</div>
		</el-dialog>

		    <el-dialog title="增加" v-model="editFormVisible" :close-on-click-modal="false" size="tiny">
			<el-form :model="editForm" label-width=""  ref="editForm">
				<el-form-item label="名称:" prop="acc">
					<el-input v-model="editForm.acc" auto-complete="off" style="width:300px;"></el-input>
				</el-form-item>
				<el-form-item label="地址:" prop="">
					<el-input v-model="editForm.address" auto-complete="off" style="width:300px;"></el-input>
				</el-form-item>
				<el-form-item label="电话:" prop="">
					<el-input v-model="editForm.tells" auto-complete="off" style="width:300px;"></el-input>
				</el-form-item>
				<el-form-item label="网址:" prop="">
					<el-input v-model="editForm.sites" auto-complete="off" style="width:300px;"></el-input>
				</el-form-item>
			</el-form>

			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="addCinema" >添加</el-button>
			</div>
		</el-dialog>
		
	    <el-dialog title="增加放映厅" v-model="addRoomVisible" :close-on-click-modal="false" size="tiny">
			<el-form :model="addroom" label-width=""  ref="editForm">
				<el-form-item label="影厅" prop="">
					<el-input v-model="addroom.name" auto-complete="off" style="width:300px;"></el-input>
				</el-form-item>
				<el-form-item label="座位" prop="">
					<el-input v-model="addroom.seat" auto-complete="off" style="width:300px;"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="addRoomVisible = false">取消</el-button>
				<el-button type="primary" @click.native="add_roomFuc" >增加</el-button>
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
		      prop="seat"
		      label="座位号"
		      width="">
		    </el-table-column>
		    <el-table-column
		      fixed="right"
		      label="操作"
		      width="100">
		      <template scope="scope">
		        <el-button @click="resetbox(scope.$index,scope.row)" type="text" size="small">编辑</el-button>
		        <el-button type="text" size="small" @click="delplayRoomFuc(scope.$index,scope.row)">删除</el-button>
		      </template>
		    </el-table-column>
		  </el-table>
		<div slot="footer" class="dialog-footer">
			<el-button type="primary" @click.native="showRoomVisible = false" >关闭</el-button>
		</div>
		</el-dialog>
		<!-- 放映厅编辑弹框 -->
		  <el-dialog title="修改放映厅" v-model="resetVisible" :close-on-click-modal="false" size="tiny">
			<el-form :model="resetFun" label-width=""  ref="resetFun">
				<el-form-item label="影厅" prop="">
					<el-input v-model="resetFun.name" auto-complete="off" style="width:300px;"></el-input>
				</el-form-item>
				<el-form-item label="座位" prop="">
					<el-input v-model="resetFun.seat" auto-complete="off" style="width:300px;"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="resetVisible = false">取消</el-button>
				<el-button type="primary" @click.native="resetFunSubmit" >确认</el-button>
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
	      prop="url"
	      label="网址"
	      width="">
	    </el-table-column>
	    <el-table-column
	      fixed="right"
	      label="放映厅"
	      width="230">
	      <template scope="scope">
	        <el-button @click="showRoomFuc(scope.$index,scope.row)" :plain="true" type="success" size="small">查看放映厅</el-button>
	        <el-button @click="add_room(scope.$index,scope.row)" :plain="true" type="success" size="small">新增放映厅</el-button>
	      </template>
	    </el-table-column>
	   <el-table-column
	      fixed="right"
	      label="操作"
	      width="150">
	      <template scope="scope">
	      	 <el-button type="info" icon="" @click="addformFuc(scope.$index,scope.row)" size="small">修改</el-button>
			<el-button type="danger" icon="" @click="delCinema(scope.$index,scope.row)" size="small">移除</el-button>
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
				count:0,
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
			delete_Id:[],
			row_Id:"",
			addForm: {
				ids:'',
				acc: '',
				address: '',
				tells: '',
				sites: ''
				},
	        editForm: {
				acc: '',
				address: '',
				tells: '',
				sites: '',
				name:'',
				seat:''
				},
			addroom:{
				name:"",
				seat:""
			},
			resetFun:{
				r_id:"",
				name:"",
				seat:""
			},
        addFormVisible:false,
        // addLoading: false,//是否显示添加页面
        editFormVisible:false, //是否显示编辑页面
        addRoomVisible:false, //放映厅的弹框
        showRoomVisible:false,
        resetVisible:false //修改影厅的弹框
		}
	},
	created() {
		this.getMoviePage()
		// this.showRoomFuc()
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
		addformFuc(index,row){
          this.addFormVisible=true;
          this.addForm.ids = row._id
          this.addForm.acc = row.name
          this.addForm.address = row.address
          this.addForm.tells = row.tel
          this.addForm.sites = row.url
		},
		addplayRoom(){
		  this.editFormVisible=true;
		},
		add_room(index,row){
		 this.addRoomVisible = true
		 this.addroom = {
		 	name:"",
		 	seat:""
		 }	
		 console.log(this.addroom)
		let para=Object.assign({},row);
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
				seat:this.addroom.seat,
				cinemaId:this.Id
			}

		 })
		},
		async showRoomFuc(index,row) {
			this.row_Id = row._id
			console.log(this.row_Id)
			console.log(11)
				this.showRoomVisible = true
				const {data} = await axios.get("http://localhost:2046/rooms/find", {
					params: {
						cinemaId:this.row_Id
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
					tel:this.editForm.tells,
					url:this.editForm.sites
				}
			})
			this.getMoviePage()
		},
		//批量删除
		delmoreData(){

			console.log(this.multipleSelection)
			var Array = this.multipleSelection
			for(let obj of Array){
				this.delete_Id.push(obj._id)
			}
			console.log(this.delete_Id)
			var newArray = this.delete_Id
			if(Array.length != 0){
				this.$confirm('确定要删除所选项, 是否继续?', '温馨提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
		          this.$message({
		            type: 'success',
		            message: '删除成功!'
		          });
		         axios.get("http://localhost:2046/cinema/del", {
					params: {
						ids:newArray
					}
				})
				this.getMoviePage()
		        }).catch(() => {
		          this.$message({
		            type: 'info',
		            message: '已取消删除'
		          });          
		        });
			}else{
				this.$message({
		          showClose: true,
		          message: '请选择至少一个影院',
		          type: 'warning'
		        });
			}
		


		},
		//影院删除
		delCinema(index,row){
			this.$message({
	          message: '删除成功',
	          type: 'success'
	        });
			const del_id = row._id
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
					 tel:this.addForm.tells,
					 url:this.addForm.sites

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
			
			console.log(row)
	       const {data}  = await axios.get('http://localhost:2046/rooms/del',{
	        	params:{
	        		_id:row._id
	        	}

	        })
	       this.updateroomFuc()
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
		},
		resetbox(index,row){
			this.resetVisible = true
			console.log(row)
			this.resetFun.r_id = row._id
			this.resetFun.name = row.name
			this.resetFun.seat = row.seat
			
		},
		resetFunSubmit(){
			this.resetVisible = false
			axios.get("http://localhost:2046/rooms/update", {
				params: {
					 _id:this.resetFun.r_id,
					 name:this.resetFun.name,
					 seat:this.resetFun.seat
				}
			})
			console.log(this.row_Id)
			// this.showRoomFuc()
		}

	}
}
</script>
<style>
</style>