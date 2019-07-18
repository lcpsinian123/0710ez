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
							<el-breadcrumb-item>订单列表</el-breadcrumb-item>
						</el-breadcrumb>
					</div>
					<el-table :data="tableData" style="width: 100%" stripe>
						<el-table-column label="充值方式">
							<template slot-scope="scope">
								<span style="margin-left: 10px">{{ scope.row.order_type == 2 ? '套餐购买' : '余额充值' }}</span>
							</template>
						</el-table-column>
						<el-table-column prop="order_no" label="订单号" width="280">
						</el-table-column>
						<el-table-column prop="total_price" label="应付金额">
						</el-table-column>
						<el-table-column prop="create_time" label="订单创建时间" width="180">
						</el-table-column>
						<el-table-column label="支付状态">
							<template slot-scope="scope">
								<span v-if="scope.row.status==1" style="margin-left: 10px">
									<el-button type="primary" @click="handleClick(scope.row.id)">去支付</el-button>
								</span>
								<span v-else style="margin-left: 10px">
									已支付
								</span>
							</template>
						</el-table-column>
						<el-table-column label="操作">
							<template slot-scope="scope">
								<el-button type="primary" @click="handleClick(scope.row.id)">订单详情</el-button>
							</template>
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
		metaInfo: {
			title: '订单列表-亿洲网络', // set a title
		},
		data() {
			return {
				tableData: [],
				pageSize: 1,
				currentPage: 1,
				total: 1,
			}
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
				this.$http.get('http/order/orderList', {
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
					path: '/ucenter/orderlist',
					query: {
						page: val
					}
				})
			},
			handleClick:function(order_id){
				this.$router.push({path:'/pay/orderinfo',query:{order_id:order_id}})
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
		@media screen and (max-width:1024px){
		.el-row .el-col .el-button{
			margin-left: 10px;
		}
		.user-right{
			width:699px;
		}
		.container{
			width:100%;
		}
		.auditor_right{
			width:100%;
		}
	}
</style>
