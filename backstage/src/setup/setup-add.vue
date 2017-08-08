<template>
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
                const {data} = await axios.get("http://localhost:3000/testcinema/find",{
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

                console.log(this.pages)
			}
		}
	}

</script>

<style></style>