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
							  <el-breadcrumb-item>http端口提取记录</el-breadcrumb-item>
							</el-breadcrumb>
						</div>
						<el-card class="box-card">
						<div>
							<el-input placeholder="搜索端口" v-model="search.keyword" clearable style="width:150px;"></el-input>
							<el-date-picker	v-model="search.startdate"	type="datetime" placeholder="选择开始时间" value-format="yyyy-MM-dd HH:mm:ss" default-time="00:00:00"></el-date-picker>
						    <el-date-picker v-model="search.enddate" type="datetime" placeholder="选择结束时间" value-format="yyyy-MM-dd HH:mm:ss" default-time="23:59:59"></el-date-picker>
							<el-button type="primary" @click="search_data()" size="small">立即搜索</el-button>
						</div>
						<div style="float: left;margin-top: 10px;">
							<el-button type="warning" size="small" @click="redialHttp">批量换IP</el-button>
						</div>
						<div style="float: left;margin:10px 0 0 10px;"><!--批量切换-->
							<concurrent-ra :selectItem="multipleSelection"></concurrent-ra>
						</div>
						<el-table @sort-change='sortChange' v-loading="loading" ref="multipleTable" @selection-change="handleSelectionChange" :data="tableData" style="width: 100%" stripe>
							<el-table-column type="selection" width="55"></el-table-column>
							<el-table-column type="expand" width="15">
								<template slot-scope="props">
									<el-form label-position="left" inline class="demo-table-expand" style="width:800px;">
										<el-form-item label="开始时间">
											<span>{{ props.row.add_date }}</span>
										</el-form-item>
										<el-form-item label="结束时间">
											<span>{{ props.row.end_date }}</span>
										</el-form-item>
										<el-form-item label="当前服务">
											<span>{{ props.row.combo_area_list.combo_area_string }}</span>
										</el-form-item>
									</el-form>
								</template>
							</el-table-column>
							<el-table-column sortable="custom" prop="http_port_text" label="HTTP"></el-table-column>
							<el-table-column prop="combo_area_list.combo_area_reduce" label="地区"></el-table-column>
							<el-table-column sortable="custom" prop="end_date" label="到期时间"></el-table-column>
							<!--
							<el-table-column label="服务" width="140">
								 <template slot-scope="scope">
									<el-button type="primary" size="small" @click="redialHttp(scope.row)">换</el-button>
								</template>
							</el-table-column>
							-->
						</el-table>
						<div class="page-list">
							<el-pagination layout="total,prev, pager, next,sizes" :total="total" :page-size="pageSize" :current-page.sync="currentPage" @size-change="handleSizeChange" @current-change="val=>changePage(val)"></el-pagination>
						</div>
						</el-card>
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
	import concurrentRa from './../../components/concurrentRa'
	export default {
		inject: ['reload'],
		name: 'Login',
		components: {
			'yz-header': header,
			'yz-user-left': left,
			'yz-footer': footer,
			'concurrent-ra':concurrentRa
		},
		data() {
			return {
				tableData: [],
				pageSize: 1,
				currentPage: 1,
				total: 1,
				multipleSelection: [],
				loading:false,
				search:{
					keyword:'',
				  	startdate:'',
				  	enddate:'',
				  	sort:'',
				  	order:'',
				  	pagesize:'10',
				  	page:1,
				},
			}
		},
		metaInfo: {
			title: 'http端口提取记录-亿洲网络', // set a title
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
			sortChange: function(column, prop, order) {
	    		this.search.sort = column.prop
	    		this.search.order = column.order
    			this.getPageList();
			},
			getPageList: function() {
				var page = this.$route.query.page
				if(this.$fun.isEmpty(page)) {
					page = 1;
				}
				this.$http.get('http/http_center/userGetHttpport', {
					params: this.search
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
							this.loading = false
						}
					})
			},
			search_data:function(){
				this.$router.push({path:'/ucenter/Httpport',query:this.search})
			},
			handleSizeChange(val) {
			    this.search.pagesize = val
				this.$router.push({
					path: '/ucenter/Httpport',
					query:this.search
				})
			},
			changePage: function(val) {
				this.search.page = val
				this.$router.push({
					path: '/ucenter/Httpport',
					query: this.search
				})
			},
			handleSelectionChange(val) {
        		this.multipleSelection = val;
     		},
			redialHttp:function(){
				if(this.multipleSelection.length == 0){
					this.$message({
						message: '请至少选择一项',
						type: 'error'
					});
					return true
				}
				this.loading 	= true
				var iplist 		= []
				var portlist 	= []
				for(var i=0;i<this.multipleSelection.length;i++){
					iplist.push(this.multipleSelection[i].http_ip)
					portlist.push(this.multipleSelection[i].http_port)
				}
				var data = {
					'iplist':iplist.join(','),
					'portlist':portlist.join(','),
				}
				this.$http.post('/http/http_port/redialHttp', this.$qs.stringify(data)).then(
					response => {
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
							this.loading = false
						}
						this.execution_end();
					})
			},
			execution_end:function(){
				this.loading = false
				this.reload()
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
</style>
