<template>
<div>
  <!--新增界面-->
<el-dialog title="新增" v-model="addFormVisible" :close-on-click-modal="false" size="tiny">
			<el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
				<el-form-item label="姓名" prop="acc">
					<el-input v-model="addForm.acc" auto-complete="off" style="width:400px;"></el-input>
				</el-form-item>
				<el-form-item label="密码">
			  <el-input v-model="addForm.pwd" auto-complete="off" style="width:400px;"></el-input>
				</el-form-item>
				<el-form-item label="邮箱">
					<el-input v-model="addForm.email" auto-complete="off" style="width:400px;"></el-input>
				</el-form-item>
				<el-form-item label="生日">
					<el-date-picker type="date" placeholder="选择日期" v-model="addForm.bth"></el-date-picker>
				</el-form-item>
				<el-form-item label="电话">
					<el-input v-model="addForm.tel" auto-complete="off" style="width:400px;"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="addFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
			</div>
		</el-dialog>
    <!--编辑界面-->
    <el-dialog title="新增" v-model="editFormVisible" :close-on-click-modal="false" size="tiny">
			<el-form :model="editForm" label-width="80px" :rules="addFormRules" ref="editForm">
				<el-form-item label="姓名" prop="acc">
					<el-input v-model="editForm.acc" auto-complete="off" style="width:400px;"></el-input>
				</el-form-item>
				<el-form-item label="密码">
			  <el-input v-model="editForm.pwd" auto-complete="off" style="width:400px;"></el-input>
				</el-form-item>
				<el-form-item label="邮箱">
					<el-input v-model="editForm.email" auto-complete="off" style="width:400px;"></el-input>
				</el-form-item>
				<el-form-item label="生日">
					<el-date-picker type="date" placeholder="选择日期" v-model="editForm.bth"></el-date-picker>
				</el-form-item>
				<el-form-item label="电话">
					<el-input v-model="editForm.tel" auto-complete="off" style="width:400px;"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit" :loading="addLoading">修改</el-button>
			</div>
		</el-dialog>
<el-col :span="24" class="toolbar" style="padding-bottom: 0px; margin-top:20px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<input v-model="filters.acc" placeholder="姓名" ref="chaxun" style="height:30px;border-radius:5px;
    margin-top:2px;" class="ipt"></input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="chaxunuser">查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="handleAdd">新增</el-button>
				</el-form-item>
			</el-form>
		</el-col>
 <el-table  :data="this.pages.rows"
      
      style="width: 100%"
      >
      <el-table-column
      type="selection"
      width="55">
    </el-table-column>
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
      align="center">
      <template scope="scope">
       
        <el-button type="text" size="danger" style="width:80px;" @click="deluser(scope.$index,scope.row)">删除</el-button>
        <el-button type="text" size="danger" style="width:80px;" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
      </template>
    </el-table-column>
    </el-table>
    
    <div class="block" style="
    margin-top:20px;">
    
    <el-pagination
      @size-change="toppage"
      @current-change="listpage"
      :current-page="currentPage4"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pages.total">
    </el-pagination>
  </div>
</div>

</template>

  
<script src="http://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.8.0.js">
</script>
<script>
const useradd= params => { return axios.get("http://localhost:3000/user/add", { params: params }); };
const removeUser = params => { return axios.get("http://localhost:3000/user/del", { params: params }); };
const editupdate =params =>{return axios.get('http://localhost:3000/user/update',{params:params});};
const chaxun =params=>{return axios.get('http://localhost:3000/user/find',{params:params});};
import axios from 'axios'
    export default{
        data () {
      return {
          pages:{
            page:1,
            maxpage:0,
            total:0,
            listLoading:true,
            eachpage:10,
            data:[]
          },
          //添加用户数据
          addForm: {
					acc: '',
					pwd: '',
					email: '',
					bth: '',
					tel: ''
				},
        //编辑界面数据
        editForm: {
					id: 0,
					acc: '',
					pwd: '',
					email:'',
					bth: '',
					tel: ''
				},
        addFormVisible:false,
        addLoading: false,//是否显示添加页面
        editFormVisible:false, //是否显示编辑页面
        addFormRules: {
					acc: [
						{ required: true, message: '请输入姓名', trigger: 'blur' }
					]
				},
      }
    },
    created(){
            this.gerusers();
            
            
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
                    curpage:data.curpage,
                    eachpage:data.eachpage,
                    //  listLoading:false,
                }
               
                 
                
                console.log(data)
                

        },
        onSubmit() {
        console.log('submit!');
      },
        toppage(){
          console.log(111)
            console.log(this.$data.pages.curpage)
                this.gerusers(20,this.pages.curpage,)
            
            
        },
        listpage(){
             if (this.$data.pages.curpage<this.$data.pages.maxpage) {
                this.$data.pages.curpage++;
                this.gerusers(this.pages.eachpage,this.pages.curpage,)
                
            }
            else if(this.$data.pages.curpage=this.$data.pages.maxpage){

                this.$data.pages.curpage--;
                this.gerusers(this.pages.eachpage,this.pages.curpage,)
            }
           
        },
        //删除数据
        deluser(index,row){
            this.$confirm("确定删除记录吗","提示",{
                type:"warning"
            }).then(()=>{
                this.listLoading=true;
                console.log(row._id)
                let usersid={_id:row._id}
                
               removeUser(usersid).then((res)=>{
                    
                   this.$message({
                       type:"success",
                       message:"删除成功"
                       
                   });
                  
                   this.gerusers()
                }).catch(()=>{
                })
            })
            
        },
        //添加数据方法
        addSubmit(){
          this.$refs.addForm.validate((valid)=>{
            if (valid) {
              this.$confirm("确认提交吗？","提示",{}).then(()=>{
                this.addLoading=true;
                let para=Object.assign({},this.addForm);
                // para.bth = (!para.bth || para.bth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
                useradd(para).then((res)=>{
                  this.addLoading=false;
                  this.$message({
                    type: 'success',
                    message:"提交成功"
                  });
                  this.$refs['addForm'].resetFields();
                  this.addFormVisible = false;
                  this.gerusers();
                })
              })
            }
          })

        },
        //编辑数据方法
        editSubmit(){
          this.$refs.editForm.validate((valid)=>{
            if (valid) {
              this.$confirm("确认提交吗？","提示",{}).then(()=>{
                this.addLoading=true;
                let para=Object.assign({},this.editForm);
                // para.bth = (!para.bth || para.bth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
                editupdate(para).then((res)=>{
                  this.addLoading=false;
                  this.$message({
                    type: 'success',
                    message:"修改成功"
                  });
                  this.$refs['editForm'].resetFields();
                  this.editFormVisible = false;
                  this.gerusers();
                })
              })
            }
          })
        },
        //显示编辑界面
        handleEdit(index,row){
          this.editFormVisible = true;
          this.editForm=Object.assign({},row)
          console.log(this.editForm)

        },
        //查询数据
        chaxunuser(){
         
          
          
        },

        //添加数据界面
        handleAdd(){
          this.addFormVisible=true;
          this.addForm = {
					acc: '',
					pwd: "",
					email:"",
					bth: '',
					tel: ''
				};
        }
    }
    }
</script>
<<<<<<< HEAD
<style>
=======
<style scope>
>>>>>>> 框架搭建
*{
   
}
</style>
