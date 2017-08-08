<template>
  <el-dialog title="新增"  :close-on-click-modal="true">
			<el-form  label-width="80px"  ref="addForm">
				<el-form-item label="姓名" prop="name">
					<el-input  auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="性别">
					<el-radio-group >
						<el-radio class="radio" :label="1">男</el-radio>
						<el-radio class="radio" :label="0">女</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="年龄">
					<el-input-number :min="0" :max="200"></el-input-number>
				</el-form-item>
				<el-form-item label="生日">
					<el-date-picker type="date" placeholder="选择日期" ></el-date-picker>
				</el-form-item>
				<el-form-item label="地址">
					<el-input type="textarea" ></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button >取消</el-button>
				<el-button type="primary"  >提交</el-button>
			</div>
		</el-dialog>
       
</template>
<script>
export default {
  
}
</script>

