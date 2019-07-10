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
							<el-breadcrumb-item :to="{path:'/ucenter/pptpaccount2'}">PPTP帐号(新)</el-breadcrumb-item>				
							<el-breadcrumb-item :to="{path:'/ucenter/vpncombodetail'}">套餐介绍</el-breadcrumb-item>
						</el-breadcrumb>
					</div>
					<el-table :data="tableData" border style="width: 100%">
						<el-table-column prop="name" label="套餐名称" width="500">
						</el-table-column>
						<el-table-column prop="details" label="套餐介绍" width="380">
						</el-table-column>
						<el-table-column fixed="right" label="套餐地区" width="110">
							<template slot-scope="scope">
								<el-button type="text" size="small" @click="openDialog(scope.row.name,scope.row.combo_area_list_string)">套餐地区详情</el-button>
							</template>
						</el-table-column>
					</el-table>
					<el-dialog
					  :title="open.title"
					  :visible.sync="dialogVisible"
					  width="30%"
					  :before-close="handleClose">
					  <span>{{open.text}}</span>
					  <span slot="footer" class="dialog-footer">
						<el-button @click="dialogVisible = false">取 消</el-button>
						<el-button type="primary" @click="dialogVisible = false">确 定</el-button>
					  </span>
					</el-dialog>
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
				dialogVisible:false,
				vpn_host:this.$config.vpnhost,
				tableData: [],
				pageSize: 1,
				currentPage: 1,
				total: 1,
				open:{
					'title':'',
					'text' : '',
				},
			}
		},
		metaInfo: {
			title: 'PPTP套餐介绍-亿洲网络', // set a title
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
				this.$http.get(this.vpn_host + 'vpn/combolist', {
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
							this.tableData = res.data.list
							this.pageSize = res.data.per_page
							this.total = res.data.total
						}
					})
			},
			handleClose(done) {
		        this.$confirm('确认关闭？')
		          .then(_ => {
		            done();
		          })
		          .catch(_ => {});
		    },
		    openDialog:function(title,text){
		    	this.open.title = title
		    	this.open.text = text
		    	this.dialogVisible = true
		    },
			changePage: function(val) {
				this.$router.push({
					path: '/ucenter/vpncombodetail',
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
