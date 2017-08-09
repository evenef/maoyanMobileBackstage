<template>
	<div class="content">
		<span>电　影：</span>
		<el-input
			:placeholder="this.newScene.movieName ? this.newScene.movieName : '搜索电影...'"
			icon="search"
			v-model="searchMovieName"
			:on-icon-click="getMoviesData"
			@change="getMoviesData">
		</el-input>
		<el-button class="saveBtn" type="primary" @click="addScene">保存</el-button>
		<el-table :data="moviesPage.dataArr" highlight-current-row border @current-change="currentItem">
			<el-table-column prop="nameCN" label="名称" width="200" align="center">
			</el-table-column>
			<el-table-column prop="director" label="导演" width="150" align="center">
			</el-table-column>
			<el-table-column prop="country" label="地区" width="120" align="center" header-align="center">
			</el-table-column>
			<el-table-column prop="startTime" label="上映时间" width="120" align="center">
			</el-table-column>
			<el-table-column prop="story" label="剧情简介" min-width="300" align="left" header-align="center">
			</el-table-column>
		</el-table>
		<div class="block">
			<el-pagination
				@size-change="rowsChange"
				@current-change="pageChange"
				:current-page="moviesPage.page"
				:page-sizes="[5, 10, 20, 50, 100]"
				:page-size="moviesPage.rows"
				layout="total, sizes, prev, pager, next, jumper"
				:total="moviesPage.total">
			</el-pagination>
		</div>
		<div style="margin-top:50px;"></div>
		<div class="ponent ponentLeft">
			<span>电影院：</span>
			<el-dropdown trigger="click">
				<el-button type="default">
					{{this.newScene.cinemaName ? this.newScene.cinemaName : "- 请选择 -"}}<i class="el-icon-caret-bottom el-icon--right"></i>
				</el-button>
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item v-for="(item, index) in this.cinemasPage.dataArr" key="{{item._id}}">
						<div @click="chooseCinemaCl(item)">{{item.name}}</div>
					</el-dropdown-item>
					<div class="block">
						<el-pagination
							@size-change="rowsChangeCinema"
							@current-change="pageChangeCinema"
							:current-page="cinemasPage.page"
							:page-size="cinemasPage.rows"
							:total="cinemasPage.total"
							layout="prev, pager, next, jumper">
						</el-pagination>
					</div>
				</el-dropdown-menu>
			</el-dropdown>
			<div style="margin-top:30px"></div>
			<span>放映厅：</span>
			<el-dropdown trigger="click">
				<el-button type="default">
					{{this.newScene.roomName ? this.newScene.roomName : "- 请选择 -"}}<i class="el-icon-caret-bottom el-icon--right"></i>
				</el-button>
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item v-for="(item, index) in this.roomsPage.dataArr" key="{{item._id}}">
						<div @click="chooseRoomCl(item)">{{item.name}}</div>
					</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
		</div>
		<div class="ponent">
			<span>时　间：</span>
			<template>
				<el-time-picker
					v-model="chooseTime"
					format="HH:mm"
					placeholder="选择 / 输入时间"
					:picker-options="{
					selectableRange: ['10:00:00 - 23:59:59']
					}"
					@blur="getTime">
				</el-time-picker>
			</template>
			</el-time-select>
			<div style="margin-top:30px"></div>
			<span>价　格：</span>
			<el-input
				v-model="newScene.price"
				placeholder="请输入价格"
			></el-input>
		</div>
		<div style="clear: both;padding-top: 30px;">
			<span>座　位：</span>
			<div class="seatTab">
				<table>
					<tr v-for="(item, index) in seatArr">
						<td v-for="(i, index) in item" v-bind:class="i"
						@click="tbCl"></td>
					</tr>
				</table>
			</div>
		</div>
		<div><!-- 
			<button @click="show">显示数据</button>
			<button @click="parseSeat">转化输出</button> -->
		</div>
	</div>
</template>

<script>
	import axios from 'axios'

	export default{
		data() {
			return {
				moviesPage: {
					page: 1,
					rows: 5,
					maxpage: 0,
					total: 0,
					dataArr: []
				},
				cinemasPage: {
					page: 1,
					rows: 5,
					maxpage: 0,
					total: 0,
					dataArr: []
				},
				roomsPage: {
					dataArr: []
				},
				searchMovieName: "",
				chooseCinemaId: "",
				seatArr: [],
				seatStr: "",
				chooseTime: "",
				newScene: {
					movieId: "",
					movieName: "",
					cinemaName: "",
					roomId: "",
					roomName: "",
					price: "",
					date: "",
					startTime: "",
					seat: "0000000000-0000000000-0000000000-0000000000-0000000000-0000000000-0000000000-0000000000-0000000000-0000000000"
				}
			}
		},
		created() {
			this.getMoviesData()
			this.getCinemasData()
		},
		methods: {
			show(){
				console.log("选取影院： "+this.chooseCinemaId)
				console.log(this.newScene.startTime.getHours())
			},
			async addScene() {
				const {data} = await axios.get("http://localhost:3000/scene/add",{
					params:{
						...this.newScene
					}
				})
			},
			async getMoviesData(page = this.moviesPage.page, rows = this.moviesPage.rows) {
                const {data} = await axios.get("http://localhost:3000/movie/find",{
                    params:{
                        page,
                        rows,
                        nameCN: this.searchMovieName
                    }
                })

                this.moviesPage.page = data.curpage
                this.moviesPage.rows = data.eachpage
                this.moviesPage.maxpage = data.maxpage
                this.moviesPage.dataArr = data.rows.map((item) => {
                	if(item.story.length >= 18){
                		item.story = item.story.substring(0, 18) + "..."
                	}
                	if(item.director.length >= 8){
                		item.director = item.director.substring(0, 8) + "..."
                	}
                	return item
                })
                this.moviesPage.total = data.total
			},
			async getCinemasData(page = this.cinemasPage.page, rows = this.cinemasPage.rows) {
                const {data} = await axios.get("http://localhost:3000/cinema/find",{
                    params:{
                        page,
                        rows
                    }
                })

                this.cinemasPage.page = data.curpage
                this.cinemasPage.rows = data.eachpage
                this.cinemasPage.maxpage = data.maxpage
                this.cinemasPage.dataArr = data.rows
                this.cinemasPage.total = data.total
			},
			async getRoomsData() {
                const {data} = await axios.get("http://localhost:3000/room/find",{
                    params:{
                    	page: 1,
                    	rows: 1000,
                    	findType:"exact",
                        cinemaId: this.chooseCinemaId
                    }
                })

                this.roomsPage.dataArr = data.rows
			},
			currentItem(val) {
				this.newScene.movieName = val.nameCN
				this.newScene.movieId = val._id
			},
			rowsChange(rows) {
				this["moviesPage"].rows = rows
				this.getMoviesData()
			},
			pageChange(page) {
				this["moviesPage"].page = page
				this.getMoviesData()
			},
			//影院部分
			rowsChangeCinema(rows) {
				this["cinemasPage"].rows = rows
				this.getCinemasData()
			},
			pageChangeCinema(page) {
				this["cinemasPage"].page = page
				this.getCinemasData()
			},
			chooseCinemaCl(item) {
				if(this.chooseCinemaId === item._id)
					return

				this.seatArr = []
				this.seatStr = ""
				this.newScene.roomName = ""
				this.chooseCinemaId = item._id
				this.newScene.cinemaName = item.name
				this.getRoomsData()
			},
			//放映厅部分
			parseSeat(inType, data) {
				if(inType === "str"){
					data = data.split("-")
					data = data.map((item) => {
						return item.split("")
					})
					this.seatArr = data
				}else if(inType === "arr"){
					data = data.map((item) => {
						return item.join("")
					}).join("-")
					this.seatStr = data
				}
			},
			chooseRoomCl(item) {
				if(this.newScene.roomId === item._id)
					return
				this.newScene.roomId = item._id
				this.newScene.roomName = item.name
				this.parseSeat("str", this.newScene.seat)
			},
			tbCl() {
				console.log(event.target)
			},
			getTime() {
				this.newScene.startTime = `${this.chooseTime.getHours()}:${this.chooseTime.getMinutes()}`
				this.newScene.date = this.chooseTime.toLocaleDateString()
			}
		}
	}

</script>

<style scoped>
	.content {
		width: 900px;
		margin: 20px 100px;
		margin-bottom: 200px;
	}
	.el-table {
		width: 900px;
	}
	.el-input {
		width: 320px;
		margin-bottom: 10px;
	}
	.el-date-editor--time {
		width: 150px;
		margin: 0;
	}
	.el-button {
		width: 320px;
	}
	.el-button i {
		float: right;
	}
	.el-dropdown-menu {
		width: 320px;
		margin: 0;
		font-size: 14px;
	}
	.ponent {
		float: left;
	}
	.ponentLeft {
		margin-right: 50px;
	}
	.seatTab table {
		margin-left: 120px;
	}
	.seatTab td {
		display: inline-block;
		width: 14px;
		height: 14px;
		border-radius: 4px;
		border: 1px solid #aaa;
		background: #fff;
		margin: 3px;
		cursor: pointer;
	}
	.saveBtn {
		width: 120px;
		float: right;
	}
</style>