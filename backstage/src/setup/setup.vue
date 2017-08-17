<template>
	<div class="content">
		<el-table class="moviesTab" :data="moviesPage.dataArr" border style="width: 100%">
			<el-table-column prop="nameCN" label="名称" width="220" align="center">
			</el-table-column>
			<el-table-column prop="director" label="导演" width="160" align="center">
			</el-table-column>
			<el-table-column prop="country" label="地区" width="160" align="center" header-align="center">
			</el-table-column>
			<el-table-column prop="showTime" label="上映时间" width="160" align="center">
			</el-table-column>
			<el-table-column label="操作" min-width="120" align="center">
				<template scope="scope">

					<el-popover
						ref="showSceneCard"
						placement="bottom-end"
						width="800"
						trigger="click">
						<el-table border :data="cinemasArr">
							<el-table-column width="" property="name" label="影院名称" align="center"></el-table-column>
							<el-table-column width="" property="address" label="地址" align="center"></el-table-column>
							<el-table-column width="" property="tel" label="电话" align="center"></el-table-column>
							<el-table-column width="" label="操作" align="center">
								<template scope="scope">
								<el-button type="info" size="small" @click="showRoomWinCl(scope.row)">查看</el-button>
								<el-button type="info" size="small">下架</el-button>
								</template>
							</el-table-column>
						</el-table>
					</el-popover>

					<el-button @click="showCinemaCl(scope.row)" type="info" size="small" v-popover:showSceneCard>查看排片</el-button>
					<el-button type="warning" size="small">下架影片</el-button>
				</template>
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

		<el-dialog title="放映厅" :visible.sync="showRoomWin" size="small" @close="showScene = 'display: none'" style="text-align: center;">
			<el-table border :data="roomsArrShow" style="width: 1200px;margin: auto;">
				<el-table-column property="name" label="放映厅" min-width="200" align="center"></el-table-column>
				<el-table-column property="" label="排片" min-width="300" align="center"></el-table-column>
				<el-table-column label="操作" width="180" align="center">
					<template scope="scope">
						<el-button type="info" size="small" @click="showSceneCl(scope.row)">查看场次</el-button>
						<el-button type="warning" size="small">清空</el-button>
					</template>
				</el-table-column>
			</el-table>
			<div class="inWinDiv" :style="showScene">
			<h2 style="text-align: center;margin-bottom: 10px;"><span style="font-size: 16px;color: #999;">{{roomSceneArr.length ? roomSceneArr[0].cinemaName : ""}} </span>{{roomSceneArr.length ? roomSceneArr[0].roomName : ""}}<span style="font-size: 16px;color: #999;"> {{"《" + chooseMovieName + "》"}}</span></h2>
				<el-table border :data="roomSceneArr" style="width: 1200px;margin: auto;">
					<el-table-column property="date" label="日期" min-width="100" align="center"></el-table-column>
					<el-table-column property="startTime" label="时间" min-width="" align="center"></el-table-column>
					<el-table-column property="price" label="票价" min-width="" align="center"></el-table-column>
					<el-table-column property="seat" label="座次" min-width="300" align="center"></el-table-column>
					<el-table-column label="操作" width="180" align="center">
						<template scope="scope">
							<el-button type="info" size="small" @click="showScene = 'display: block'">修改</el-button>
							<el-button type="warning" size="small">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
		</el-dialog>

		<div><button @click="getRoom">测试</button></div>
	</div>
</template>

<script>
	import axios from 'axios'

	export default{
		data() {
			return {
				moviesPage: {
					page: 1,
					rows: 10,
					maxpage: 0,
					total: 0,
					dataArr: []
				},

				//当前电影ID
				chooseMovieId: "",
				chooseMovieName: "",

				//放映厅信息
				roomsIdArr: [],
				roomsArr: [],
				roomsArrShow: [],

				//影院信息
				cinemasIdArr: [],
				cinemasArr: [],

				//场次信息
				scenesIdArr: [],
				scenesArr: [],
				roomSceneArr: [],

				//是否显示各信息窗口
				showScene: 'display: none',
				showRoomWin: false
			}
		},
		created() {
			this.getMoviesData()
		},
		methods: {
			//id查询影院
			async getCinema(_id) {
				const {data} = await axios.get("http://localhost:3000/cinema/find",{
					params:{
						_id
					}
				})

			},
			//id查询放映厅，获取影院id，去重
			async getRoom(arr, index) {
				if(!arr.length)
					return
				//获取影院id、放映厅集合
				const room_data = await axios.get("http://localhost:3000/room/find",{
					params:{
						_id: arr[index]
					}
				})
				if(room_data.data){
					this.roomsArr.push(room_data.data)
					this.roomsArr = this.getSingleArr(this.roomsArr)
					this.cinemasIdArr.push(room_data.data.cinemaId)
					this.cinemasIdArr = this.getSingleArr(this.cinemasIdArr)
				}
				//获取影院集合
				const cinema_data = await axios.get("http://localhost:3000/cinema/find",{
					params:{
						_id: room_data.data.cinemaId
					}
				})
				if(cinema_data.data){
					var jdg = true
					this.cinemasArr.forEach((item) => {
						if(item._id === cinema_data.data._id)
							jdg = false
					})
					if(jdg)
						this.cinemasArr.push(cinema_data.data)
					this.cinemasArr = this.getSingleArr(this.cinemasArr)
				}
				//条件判断是否继续遍历
				if(++index === arr.length)
					return
				else
					this.getRoom(arr, index)
			},
			async getMoviesData(page = this.moviesPage.page, rows = this.moviesPage.rows) {
                const {data} = await axios.get("http://localhost:3000/movie/find",{
                    params:{
                        page,
                        rows,
                        hascenima: "已排片"
                    }
                })
                this.moviesPage.page = data.curpage
                this.moviesPage.rows = data.eachpage
                this.moviesPage.maxpage = data.maxpage
                this.moviesPage.dataArr = data.rows
                this.moviesPage.total = data.total
			},
			async getScenesData() {
				if(!this.chooseMovieId)
					return
                const {data} = await axios.get("http://localhost:3000/scene/find",{
                    params:{
                        page: 1,
                        rows: 1000,
                        movieId: this.chooseMovieId
                    }
                })
                this.scenesArr = data.rows
                this.roomsIdArr = this.getSingleArr(this.scenesArr.map((item) => item.roomId))
                //获取放映厅id
                this.cinemasIdArr = []
                this.cinemasArr = []
                this.roomsArr = []
                //递归获取影院id
                this.getRoom(this.roomsIdArr, 0)
			},
			rowsChange(rows) {
				this.moviesPage.rows = rows
				this.getMoviesData()
			},
			pageChange(page) {
				this.moviesPage.page = page
				this.getMoviesData()
			},
			//数组去重
			getSingleArr(arr) {
				var [...newArr] = new Set(arr)
				return newArr
			},
			//查看影院
			showCinemaCl(obj) {
				if(this.chooseMovieId === obj._id)
					return
				this.chooseMovieId = obj._id
				this.chooseMovieName = obj.nameCN
				this.getScenesData()
			},
			//查看排片
			showSceneCl(obj) {
				this.showScene = 'display: block'
				this.roomSceneArr = []
				this.scenesArr.forEach((item) => {
					if(item.roomId === obj._id)
						this.roomSceneArr.push(item)
				})
			},
			showRoomWinCl(obj) {
				this.roomsArrShow = []
				this.roomsArr.forEach((item) => {
					if(item.cinemaId === obj._id)
						this.roomsArrShow.push(item)
				})
				this.showRoomWin = true
			}
		}
	}

</script>

<style scoped>
	.content {
		width: 960px;
		margin: 30px 30px 200px;
		text-align: center;
	}
	.moviesTab {
		min-height: 480px;
		margin-bottom: 10px;
	}
	.inWinDiv {
		margin-top: 30px;
	}
</style>