<template>
	<el-table :data="pages.dataArr" border style="width: 100%">
		<el-table-column prop="name" label="名称" min-width="120" align="center">
		</el-table-column>
		<el-table-column prop="rooms" label="影厅" width="180" align="center">
		</el-table-column>
		<el-table-column prop="address" label="地址" width="180" align="center" header-align="center">
		</el-table-column>
		<el-table-column prop="tel" label="电话" min-width="120" align="center">
		</el-table-column>
		<el-table-column prop="url" label="网址" min-width="200" align="center">
		</el-table-column>
		<el-table-column label="操作" min-width="120" align="center">
			<template scope="scope">
				<el-button @click="" type="text" size="small">查看</el-button>
				<el-button type="text" size="small">编辑</el-button>
			</template>
		</el-table-column>
	</el-table>
</template>

<script>
	import axios from 'axios'

	export default{
		data() {
			return {
				pages: {
					page: 1,
					rows: 10,
					maxpage: 0,
					total: 0,
					dataArr: []
				}
			}
		},
		created() {
			this.getData()
		},
		methods: {
			async getData(page = this.pages.page, rows = this.pages.rows) {
				console.log("in")
				var reg = new RegExp("null")
                const {data} = await axios.get("http://localhost:3000/cinema/find",{
                    params:{
                        page,
                        rows
                    }
                })
                console.log("out")

                this.pages.page = data.curpage
                this.pages.rows = data.eachpage
                this.pages.maxpage = data.maxpage
                this.pages.dataArr = data.rows
                this.pages.total = data.total

                console.log(data.rows[0])

                console.log(this.pages)
			}
		}
	}

</script>

<style></style>