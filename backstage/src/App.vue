<template>
	<div id="all" style="min-width: 1300px;">
	<el-row>
		<el-col :span="24">
		<div class="grid-content bg-purple-dark">
			<div class="banner"><h1>猫眼电影后台管理系统</h1></div>
		</div>
		</el-col>
	</el-row>
	<el-row>
		<el-col :span="4">
			<el-col :span="24">
				<el-menu mode="vertical" default-active="1" class="el-menu-vertical-demo" router >
				<el-menu-item-group title="用户">
					<el-menu-item index="users"><i class="el-icon-star-on"></i>用户管理</el-menu-item>
				</el-menu-item-group>
				<el-menu-item-group title="电影">
					<!-- <el-menu-item index="3"><i class="el-icon-plus"></i>新增电影</el-menu-item> -->
					<el-menu-item index="film"><i class="el-icon-document"></i>电影列表</el-menu-item>
					<el-menu-item index="Shangying"><i class="el-icon-setting"></i>上映状态</el-menu-item>
				</el-menu-item-group>
				<el-menu-item-group title="影院">
					<!-- <el-menu-item index="6"><i class="el-icon-plus"></i>新增影院</el-menu-item> -->
					<el-menu-item index="Cinema"><i class="el-icon-menu"></i>影院列表</el-menu-item>
				</el-menu-item-group>
				<el-menu-item-group title="排片">
					<el-menu-item index="setupAdd"><i class="el-icon-plus"></i>新增排片</el-menu-item>
					<el-menu-item index="setup"><i class="el-icon-date"></i>排片列表</el-menu-item>
				</el-menu-item-group>
				</el-menu>
			</el-col>
		</el-col>
		<el-col :span="20">
			<div class="content">
				<router-view></router-view>
			</div>
		</el-col>
	 </el-row>
	</div>
</template>

<script>
	import Setup from "./setup/setup.vue"
	import SetupAdd from "./setup/setup-add.vue"
	import Users from "./users/users.vue"
	import Shangying from "./shangying/shangying.vue"
	import Film from "./FilmMent/movieMent.vue"
	import Cinema from "./FilmMent/cinema.vue"
	export default {
		name: 'app',
		//状态
		data() {
			return {

			}
		},
		//方法
		methods: {

		},
		//注册组件
		components: {
			Setup,
			Users,
			SetupAdd,
			Shangying,
			Film,
			Cinema
		}
	}
</script>

<style scope>
	* {
		margin: 0;
		font-family: "微软雅黑";
	}
	h1 {
		text-align: center;
		padding: 20px 0;
		color: #fff;
		letter-spacing: 10px;
	}
	.banner {
		background-color: #58B7FF;
	}
	.el-table__row {
		cursor: pointer;
	}
</style>
