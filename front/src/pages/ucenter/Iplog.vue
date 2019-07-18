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
				  <el-breadcrumb-item>IP提取记录</el-breadcrumb-item>
				</el-breadcrumb>
								</div>
								<div>
									
									<el-row :gutter="12">
									  <el-col :span="8">
									    <el-card shadow="hover" style="color: #606266;font-size:20px;overflow:hidden;">
									      	总提取量:<span style="color: red;">{{total_ipcount}}</span>
									    </el-card>
									  </el-col>
									  <el-col :span="8">
									    <el-card shadow="hover" style="color: #606266;font-size:20px;overflow:hidden;">
									      	当日提取量:<span style="color: red;">{{today_ipcount}}</span>
									    </el-card>
									  </el-col>
									</el-row>
								</div>
								<el-table :data="tableData" style="width: 100%" stripe>
									<el-table-column prop="type_text" label="提取类型">
									</el-table-column>
									<el-table-column prop="create_time" label="提取时间">
									</el-table-column>
									<el-table-column prop="ip" label="IP">
									</el-table-column>
									<el-table-column prop="port" label="端口">
									</el-table-column>
								</el-table>
								<div class="page-list">
							<el-pagination layout="prev, pager, next" :total="total" :page-size="pageSize" :current-page.sync="currentPage" @current-change="val=>changePage(val)">
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
				total_ipcount:0,
				today_ipcount:0,
			}
		},
		metaInfo: {
			title: 'IP提取记录-亿洲网络', // set a title
		},
		mounted: function() {
			
			this.getPageList();
			
		},
		beforeUpdate:function(){
			var page=this.$route.query.page
			if(this.$fun.isEmpty(page)) {
				this.currentPage = 1
			}else{
				this.currentPage=parseInt(page)
			}
		},
		watch: {
			'$route': 'getPageList',
		},
		methods:{
			getPageList: function() {
				var page = this.$route.query.page
				if(this.$fun.isEmpty(page)) {
					page = 1;
				}
				this.$http.get('http/http_center/userGetIpLog', {
					params: {
						'page': page
					}
				}).then(
					response => {
						var res = response.data
						if(res.state == 1) {
							this.$message({
								message: res.msg,
								type: 'error'
							});
						} else if(res.state == 0) {
							this.tableData = res.data.data
							this.pageSize = res.data.per_page
							this.total = res.data.total
							
							this.total_ipcount = res.data.total_ipcount
							this.today_ipcount = res.data.today_ipcount
						}
					})
			},

			changePage: function(val) {
				this.$router.push({
					path: '/ucenter/iplog',
					query: {
						page: val
					}
				})
			},
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

	}
</style>
