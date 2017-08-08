<template>
	<div class="content">
		<span>选择电影：</span>
		<el-input
			placeholder="电影名称..."
			icon="search"
			v-model="searchMovieName"
			:on-icon-click="getMoviesData"
			@change="getMoviesData">
		</el-input>
		<el-table :data="moviesPage.dataArr" highlight-current-row border @current-change="currentItem">
			<el-table-column prop="nameCN" label="名称" width="200" align="center">
			</el-table-column>
			<el-table-column prop="director" label="导演" width="150" align="center">
			</el-table-column>
			<el-table-column prop="country" label="地区" width="120" align="center" header-align="center">
			</el-table-column>
			<el-table-column prop="showTime" label="上映时间" width="120" align="center">
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
		<span>请选择院线：</span>
		<el-dropdown trigger="click">
			<el-button type="default">
				{{this.chooseCinemaName ? this.chooseCinemaName : "- 选择影院 -"}}<i class="el-icon-caret-bottom el-icon--right"></i>
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
		<el-dropdown trigger="click">
			<el-button type="default">
				{{this.chooseRoomName ? this.chooseRoomName : "- 选择放映厅 -"}}<i class="el-icon-caret-bottom el-icon--right"></i>
			</el-button>
			<el-dropdown-menu slot="dropdown">
				<el-dropdown-item v-for="(item, index) in this.roomsPage.dataArr" key="{{item._id}}">
					<div @click="chooseRoomCl(item)">{{item.name}}</div>
				</el-dropdown-item>
				<div class="block">
					<el-pagination
						@size-change="rowsChangeCinema"
						@current-change="pageChangeCinema"
						:current-page="roomsPage.page"
						:page-size="roomsPage.rows"
						:total="roomsPage.total"
						layout="prev, pager, next, jumper">
					</el-pagination>
				</div>
			</el-dropdown-menu>
		</el-dropdown>
		<button @click="show">显示数据</button>
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
					page: 1,
					rows: 5,
					maxpage: 0,
					total: 0,
					dataArr: []
				},
				movieId: "",
				searchMovieName: "",
				chooseCinemaName: "",
				chooseRoomsId: [],
				chooseRoomId: "",
				chooseRoomName: ""
			}
		},
		created() {
			this.getMoviesData()
			this.getCinemasData()
			this.getRoomsData()
		},
		methods: {
			show(){
				console.log(this.chooseRoomsId)
				console.log(this.chooseCinemaName)
				console.log(this.chooseRoomName)
			},
			async getMoviesData(page = this.moviesPage.page, rows = this.moviesPage.rows) {
                const {data} = await axios.get("http://localhost:3000/testMovies/find",{
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
                const {data} = await axios.get("http://localhost:3000/testCinema/find",{
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
			async getRoomsData(page = this.roomsPage.page, rows = this.roomsPage.rows) {
                const {data} = await axios.get("http://localhost:3000/testRooms/find",{
                    params:{
                    	findType:"exact",
                        _id: this.chooseRoomsId[0]
                    }
                })
                console.log(data)

                this.roomsPage.page = data.curpage
                this.roomsPage.rows = data.eachpage
                this.roomsPage.maxpage = data.maxpage
                this.roomsPage.dataArr = data.rows
                this.roomsPage.total = data.total
			},
			currentItem(val) {
				this.movieId = val._id
				console.log(this.movieId)
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
				this.chooseRoomsId = item.rooms
				this.chooseCinemaName = item.name
			},
			//放映厅部分
			rowsChangeRoom(rows) {
				this["roomsPage"].rows = rows
				this.getRoomData()
			},
			pageChangeRoom(page) {
				this["roomsPage"].page = page
				this.getRoomData()
			},
			chooseRoomCl(item) {
				this.chooseRoomId = item._id
				this.chooseRoomName = item.name
			}
		}
	}

</script>

<style scope>
	.content {
		margin: 50px;
	}
	.el-table {
		width: 900px;
	}
	.el-table__row {
		cursor: pointer;
	}
	.el-input {
		width: 320px;
		margin-bottom: 10px;
	}
	.el-button {
		width: 420px;
	}
	.el-button i {
		float: right;
	}
	.el-dropdown-menu {
		width: 420px;
		margin: 0;
		font-size: 14px;
	}
</style>