<template>
	<div>
		<yz-header></yz-header>
		<div class="page-w">
			<div style="height: 20px;"></div>
			<div class="user-right">
				<el-card class="box-card">
					<span class="demonstration">注册筛选　　</span>
					<el-date-picker v-model="time" type="datetimerange" :picker-options="pickerOptions2" range-separator="至" start-placeholder="开始日期"
					    end-placeholder="结束日期">
					</el-date-picker>
					<el-button type="primary">立即搜索</el-button>
					<el-table :data="vpnList.vpn" style="width: 100%">
						<el-table-column prop="userId" label="用户ID" width="140">
						</el-table-column>
						<el-table-column prop="loginName" label="用户名">
						</el-table-column>
						<el-table-column prop="loginPwd" label="密码">
						</el-table-column>
						<el-table-column prop="createDate" label="注册时间" width="180">
						</el-table-column>
						<el-table-column prop="endDate" label="到期时间" width="180">
						</el-table-column>
						<el-table-column prop="ComboName" label="套餐" width="140">
						</el-table-column>
						<el-table-column prop="userStatusText" label="状态">
						</el-table-column>
						<el-table-column label="服务切换">
							<template slot-scope="scope">
								<el-button type="primary" @click="handleClick(scope.row)">详情</el-button>
							</template>
						</el-table-column>
					</el-table>
					<div class="page-list">
						<el-pagination layout="prev, pager, next" :total="total" :page-size="pageSize" :current-page.sync="currentPage" @current-change="val=>changePage(val)">
						</el-pagination>

					</div>
				</el-card>
				<el-dialog title="服务切换" :visible.sync="dialogFormVisible" width="30%">
					<el-form>
						<p class="demonstration">套餐名：{{detailData.ComboName}}</p>
						<p class="demonstration">开始时间：{{detailData.createDate}}</p>
						<p class="demonstration">结束时间：{{detailData.endDate}}</p>
						<el-form-item label="选择服务">
							<el-select v-model="serverSelect" filterable placeholder="请选择地区">
								<el-option v-for="server in detailData.reclist" :label="server.raName" :value="server.raId" :key="server.raId"></el-option>
							</el-select>
						</el-form-item>
					</el-form>
					<div slot="footer" class="dialog-footer">
						<el-button @click="dialogFormVisible = false">取 消</el-button>
						<el-button type="primary" @click="cutoverServer()">切换</el-button>
						<el-button type="primary" @click="offLine()">下线</el-button>
					</div>
				</el-dialog>
			</div>
			<yz-user-left></yz-user-left>
		</div>
		<div style="height:100px;"></div>
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
				pickerOptions2: {
					shortcuts: [{
						text: '最近一周',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
							picker.$emit('pick', [start, end]);
						}
					}, {
						text: '最近一个月',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
							picker.$emit('pick', [start, end]);
						}
					}, {
						text: '最近三个月',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
							picker.$emit('pick', [start, end]);
						}
					}]
				},
				time: '',
				vpnList: [],
				detailData: [],
				pageSize: 1,
				currentPage: 1,
				total: 1,
				dialogFormVisible: false,
				serverSelect: ''
			}
		},
		metaInfo: {
			title: 'PPTP账号-亿洲网络', // set a title
		},
		mounted: function () {

			this.getPageList();

		},
		beforeUpdate: function () {
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
			getPageList: function () {
				var page = this.$route.query.page
				if (this.$fun.isEmpty(page)) {
					page = 1;
				}
				this.$http.get(this.$config.host + 'http/zueuz/vpnlist', {
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
							this.vpnList = res.data
							this.pageSize = res.data.per_page
							this.total = res.data.total
						}
					})
			},

			changePage: function (val) {
				this.$router.push({
					path: '/ucenter/pptpaccount',
					query: {
						page: val
					}
				})
			},
			handleClick: function (row) {
				this.$http.get(this.$config.host + '/http/zueuz/vpnInfo', {
					params: {
						'userId': row.userId
					},
				}).then(
					response => {
						var res = response.data
						this.detailData = res.data
					}
				)
				this.dialogFormVisible = true
			},
			cutoverServer: function () {
				var data = {
					tel: this.detailData.userPhone,
					userId: this.detailData.userId,
					raId: this.serverSelect
				}
				this.$http.post(this.$config.host + 'http/zueuz/raServer', this.$qs.stringify(data)).then(
					response => {
						/*如果有来源登录成功返回来源*/
						var res = response.data

						if (res.state == 1) {
							this.$message({
								message: res.msg,
								type: 'error'
							});
						} else if (res.state == 0) {
							this.$message({
								message: res.msg,
								type: 'success'
							});
							this.dialogFormVisible = false
						}
					})
			},
			offLine: function () {
				var data = {
					tel: this.detailData.userPhone,
					userId: this.detailData.userId
				}
				this.$http.post(this.$config.host + 'http/zueuz/downline', this.$qs.stringify(data)).then(
					response => {
						/*如果有来源登录成功返回来源*/
						var res = response.data

						if (res.state == 1) {
							this.$message({
								message: res.msg,
								type: 'error'
							});
						} else if (res.state == 0) {
							this.$message({
								message: res.msg,
								type: 'success'
							});
						}
					})
			}
		}
	}
</script>

<style scoped>
	.el-table {
		margin-top: 20px;
	}
</style>
