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
						<el-table border :data="scenesPage.dataArr">
							<el-table-column width="" property="roomName" label="影院名称" align="center"></el-table-column>
							<el-table-column width="" property="tel" label="电话" align="center"></el-table-column>
							<el-table-column width="" label="操作" align="center">
								<template scope="scope">
								<el-button type="info" size="small">查看</el-button>
								<el-button type="info" size="small">下架</el-button>
								</template>
							</el-table-column>
						</el-table>
					</el-popover>

					<el-button @click="showSceneCl(scope.row)" type="info" size="small" v-popover:showSceneCard>查看排片</el-button>
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
				scenesPage: {
					dataArr: []
				},
				roomsIdArr: [],
				chooseMovieId: ""
			}
		},
		created() {
			this.getMoviesData()
		},
		methods: {
			async getMoviesData(page = this.moviesPage.page, rows = this.moviesPage.rows) {
                const {data} = await axios.get("http://localhost:3000/movie/find",{
                    params:{
                        page,
                        rows
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
                this.scenesPage.dataArr = data.rows
                this.roomsIdArr = this.getSingleArr(this.scenesPage.dataArr.map((item) => item.roomId))
                console.log(this.roomsIdArr)
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
			//查看排片
			showSceneCl(obj) {
				if(this.chooseMovieId === obj._id)
					return
				this.chooseMovieId = obj._id
				this.getScenesData()
			}
		}
	}

</script>

<style scoped>
	.content {
		width: 960px;
		margin: 30px 30px 200px;
	}
	.moviesTab {
		min-height: 480px;
		margin-bottom: 10px;
	}
</style>