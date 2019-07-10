<template>
	<div>
		<yz-header></yz-header>
		<div class="page-w">
			<div style="height: 20px;"></div>
			<div class="container">
				<yz-user-left></yz-user-left>
				<div class="user-right">
					<div class="user-right-nav">
						<el-breadcrumb separator-class="el-icon-arrow-right">
							<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
							<el-breadcrumb-item>用户中心</el-breadcrumb-item>
							<el-breadcrumb-item>套餐列表</el-breadcrumb-item>
						</el-breadcrumb>
					</div>
					<el-table :data="tableData" style="width: 100%" stripe>
						<el-table-column prop="package.name" label="套餐名">
						</el-table-column>
						<el-table-column prop="package.ipTimelong.name" label="时长" width="180">
						</el-table-column>
						<el-table-column prop="ipcount" label="每日IP数">
						</el-table-column>
						<el-table-column prop="buy_time" label="购买时间" width="180">
						</el-table-column>
						<el-table-column prop="start_time" label="生效时间" width="180">
						</el-table-column>
						<el-table-column prop="end_time" label="到期时间" width="180">
						</el-table-column>
					</el-table>
					<div class="page-list">
						<el-pagination layout="prev, pager, next" :total="total" :page-size="pageSize" :current-page.sync="currentPage"
						 @current-change="val=>changePage(val)">
						</el-pagination>

					</div>
				</div>
			</div>
		</div>
		<yz-footer></yz-footer>
	</div>
</template>

<script>
	import header from '../http/Head'
	import left from './Left'
	import footer from '../http/Footer'
	export default {
		name: 'Login',
		components: {
			'yz-header': header,
			'yz-user-left': left,
			'yz-footer': footer
		},
		data() {
			return {
				tableData: [],
				pageSize: 1,
				currentPage: 1,
				total: 1,
			}
		},
		metaInfo: {
			title: '套餐列表-亿洲网络', // set a title
		},
		mounted: function() {

			this.getPageList();

		},
		beforeUpdate: function() {
			var page = this.$route.query.page
			if (this.$fun.isEmpty(page)) {
				this.currentPage = 1
			} else {
				this.currentPage = parseInt(page)
			}
		},
		watch: {
			'$route': 'getPageList',
		},
		methods: {
			getPageList: function() {
				var page = this.$route.query.page
				if (this.$fun.isEmpty(page)) {
					page = 1;
				}
				this.$http.get('http/http_center/userPackageList', {
					params: {
						'page': page
					}
				}).then(
					response => {
						var res = response.data
						if (res.state == 1) {
							this.$message({
								message: res.msg,
								type: 'error'
							});
						} else if (res.state == 0) {
							this.tableData = res.data.data
							this.pageSize = res.data.per_page
							this.total = res.data.total
						}
					})
			},

			changePage: function(val) {
				this.$router.push({
					path: '/ucenter/taocanlist',
					query: {
						page: val
					}
				})
			}
		}
	}
</script>

<style scoped>
	.page-w{
		margin-top:100px ;
		width: 100%;
		height: 950px;
		background-color: #f5f6f7;
	}
	.container{
		width: 1300px;
		height: 900px;
		margin: 0 auto;
		
	}
	.user-right{
		padding: 0 20px;
	}
</style>
