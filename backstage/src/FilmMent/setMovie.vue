<template>
	<div class="wrap">
		<div style="margin: 20px;"></div>
		<el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
		  <el-form-item label="中文名">
		    <el-input v-model="nameCN"></el-input>
		  </el-form-item>
		  <el-form-item label="英文名">
		    <el-input v-model="formLabelAlign.region"></el-input>
		  </el-form-item>
		  <el-form-item label="类型">
		    <el-input v-model="type"></el-input>
		  </el-form-item>
		   <el-form-item label="国家/地区">
		    <el-input v-model="country"></el-input>
		  </el-form-item>
		   <el-form-item label="片长/分钟">
		    <el-input v-model="min"></el-input>
		  </el-form-item>
		   <el-form-item label="上映时间">
		    <el-input v-model="showTime"></el-input>
		  </el-form-item>
		   <el-form-item label="上映地区">
		    <el-input v-model="showPlace"></el-input>
		  </el-form-item>
		   <el-form-item label="用户评分">
		    <el-input v-model="scoreUser"></el-input>
		  </el-form-item>
		   <el-form-item label="专业评分">
		    <el-input v-model="scorePro"></el-input>
		  </el-form-item>
		   <el-form-item label="想看">
		    <el-input v-model="wantSee"></el-input>
		  </el-form-item>
		   <el-form-item label="导演">
		    <el-input v-model="director"></el-input>
		  </el-form-item>
		   <el-form-item label="演员">
		    <el-input v-model="actors"></el-input>
		  </el-form-item>
		   <el-form-item label="票房">
		    <el-input v-model="getMoney"></el-input>
		  </el-form-item>
		   <el-form-item label="剧情简介">
		    <el-input v-model="storey"></el-input>
		  </el-form-item>
		   <el-form-item label="图集">
		    <el-input v-model="imgs"></el-input>
		  </el-form-item>
		   <el-form-item label="首页图片">
		    <el-input v-model="firstImg"></el-input>
		  </el-form-item>
		  <el-form-item>
		  <el-button style="margin-left: 80px" type="primary" @click="submitForm()">确认修改</el-button>
		    <el-button @click="resetForm()">重置</el-button>
		  </el-form-item>
		</el-form>
	</div>
</template>
<script>
export default {
    data() {
      return {
        labelPosition: 'left',
        formLabelAlign: {
          name: '',
          region: '',
          type: ''
        }
      };
    },
    methods:{
    	submitForm(){
    		 this.$message({
	          message: '添加成功',
	          type: 'success'
	        });
    	}
    }
  }
</script>
<style>
	.wrap{
		width: 500px;
		height: auto;
		/*background-color: #333;*/
		margin: auto;
	}
</style>