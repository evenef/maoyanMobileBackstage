<template>
<div>
  <!--新增界面-->
<el-dialog title="新增" v-model="addFormVisible" :close-on-click-modal="false" size="tiny" v-loading="tijiaoloading">
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
				<el-button type="primary" @click.native="addSubmit" >提交</el-button>
			</div>
		</el-dialog>
    <!--编辑界面-->
    <el-dialog title="编辑" v-model="editFormVisible"  size="tiny">
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
					<el-button type="primary" @click="chaxunuser" icon="search"
          v-loading.fullscreen.lock="cditloging">查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="handleAdd" icon="plus">新增</el-button>
				</el-form-item>
			</el-form>
		</el-col>
 <el-table  :data="this.pages.rows"
       v-loading="tabloading"
      style="width: 100%"
     
      >
      <el-table-column
      type="selection"
      width="55">
    </el-table-column>
      <el-table-column
        prop="acc"
        label="姓名"
        width="160"
        >
      </el-table-column>
      <el-table-column
        prop="pwd"
        label="密码"
        width="140">
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱"
        width="240">
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
      width="300"
      align="center">
      <template scope="scope">
       <el-button icon="edit" type="text" size="success" style="width:60px;" 
        @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button  type="text" size="danger" style="width:60px;background-color: red; height: 
        32px;margin-top:5px; margin-left:20px;
    color: white;"
         @click="deluser(scope.$index,scope.row)" v-loading="tabloading">删除</el-button>
        
      </template>
    </el-table-column>
    </el-table>
    
    <div class="block" style="
    margin-top:20px;">
    
    <el-pagination
      @size-change="toppage"
      @current-change="listpage"
      
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
        filters:{
          acc:""
        },
        
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
        addFormVisible:false,//是否显示添加页面
        cditloging: false,
        tabloading:true,
        tijiaoloading:false,
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
            setTimeout(()=>{
              this.tabloading=false;
            },1000)
              
            
            
            
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
                this.gerusers(this.pages.eachpage,this.pages.curpage)
                
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
                this.tabloading=true;
                setTimeout(()=>{
                   this.tabloading=false;
                    this.$message({
                       type:"success",
                       message:"删除成功"
                       
                   });

                },1000)
               removeUser(usersid).then((res)=>{
                    
                  //  this.$message({
                  //      type:"success",
                  //      message:"删除成功"
                       
                  //  });
                  
                   this.gerusers()
                }).catch(()=>{
                })
            })
            
        },
        //添加数据方法
        addSubmit(){
         
          this.tijiaoloading=true;
          this.$refs.addForm.validate((valid)=>{
            if (valid) {
              this.$confirm("确认提交吗？","提示",{}).then(()=>{
                
                let para=Object.assign({},this.addForm);
                setTimeout(()=>{
                  this.tijiaoloading=false;
                  this.$message({
                    type: 'success',
                    message:"提交成功"
                  });
                },1000)
                // para.bth = (!para.bth || para.bth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
                useradd(para).then((res)=>{
                  this.addLoading=false;
                  // this.$message({
                  //   type: 'success',
                  //   message:"提交成功"
                  // });
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
                console.log(para);
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
          this.cditloging=true;
          setTimeout(() => {
          this.cditloging = false;
        }, 500);
          console.log(para)
         let para={
          //  page:this.page,
           acc:this.filters.acc
         };
         chaxun(para).then((res)=>{
           console.log(res)
           this.pages.rows=res.data
         })
       
          
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
<style scoped>
</style>
