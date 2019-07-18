<template>
	<div>
		<yz-header></yz-header>
		<div class="page-w">
			<div class="container">
				<yz-user-left></yz-user-left>
				<div class="user-right">
					<div class="user-right-nav">
						<el-breadcrumb separator-class="el-icon-arrow-right">
							<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
							<el-breadcrumb-item>用户中心</el-breadcrumb-item>
							<el-breadcrumb-item>白名单设置</el-breadcrumb-item>
						</el-breadcrumb>
					</div>
					<div class="main_div">

						<el-form label-width="100px">
							<el-form-item label="开启白名单：" style="margin-bottom: 0px;">
								
									<el-switch v-model="items.flag" active-value="4" inactive-value="1" active-text="开启" inactive-text="关闭" @change="(value)=>changeStatus(value)">
									
									</el-switch>	<br>使用说明：白名单开启后,白名单列表需要有用户出口IP,才能使用所提取出来的IP				
							</el-form-item>
							
							<el-form-item style="margin-bottom: 5px;">
								<span style="font-size: 12px; color: #0072FF; cursor: pointer;" @click="getWhitelistUrl(1)">点击获取添加白名单接口</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="font-size: 12px; color: #0072FF; cursor: pointer;" @click="getWhitelistUrl(2)">点击获取删除白名单接口</span>
							</el-form-item>
							
							<el-form-item label="添加白名单：">
								<el-input v-model="items.ip" placeholder="请输入白名单IP" clearable></el-input>
								<el-button type="primary" @click="handleAdd">立即添加</el-button>
							</el-form-item>
							
							 <el-table
			:data="tableData"
			style="width: 100%" stripe>
			<el-table-column
				label="白名单IP">
				<template slot-scope="scope">
					<i class="el-icon-document"></i>
					<span style="margin-left: 10px">{{ scope.row.ip }}</span>
				</template>
			</el-table-column>
			
			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-button
						size="mini"
						type="danger"
						@click="handleDelete(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
							
						</el-form>
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
		inject: ['reload'],
		name: 'Login',
		components: {
			'yz-header': header,
			'yz-user-left': left,
			'yz-footer': footer
		},
		data() {
			return {
				items: {
					ip: '',
					flag: ''
				},
				tableData:[]
			}
		},
		metaInfo: {
			title: '白名单-亿洲网络', // set a title
		},
		created:function(){
			this.$http.get(this.$config.host+'http/http_center/getWhiteList').then(
					response => {
						var res = response.data
						this.items.flag = res.data.flag.toString()
						this.tableData = res.data.whitelist
					})
		},
		methods:{
			changeStatus:function(value){
				var data = new Array()
				data['flag'] = value
				this.$http.post(this.$config.host+'http/http_center/userFlag', this.$qs.stringify(data)).then(
					response => {
						var res = response.data
						if(res.state==1){
							this.$message({
								message: res.msg,
								type: 'error'
							});
						}
					})
			},
			getWhitelistUrl:function(type){
				var auth_data_json = localStorage.getItem('auth_data')
				var auth_data = JSON.parse(auth_data_json)
				window.open(this.$config.host+'http/get_ip/getWhitelistUrl'+'?type='+type+'&auth_key='+auth_data.auth_key)
			},
			handleDelete:function(index,row){
				var data = new Array()
				data['ip'] = row.ip
				this.$confirm('是否删除？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
				this.$http.post(this.$config.host+'http/http_center/delWhite', this.$qs.stringify(data)).then(
					response => {
						var res = response.data
						if(res.state==1){
							this.$message({
								message: res.msg,
								type: 'error'
							});
						}else{
							this.$message({
								message: res.msg,
								type: 'success'
							});
							this.reloadPage()
						}
					})
				}).catch(function (error) {//加上catch 
					console.log(error)
				})
			},
			handleAdd:function(){
				var data = new Array()
				data['ip'] = this.items.ip
				this.$http.post(this.$config.host+'http/http_center/addWhite', this.$qs.stringify(data)).then(
					response => {
						var res = response.data
						if(res.state==1){
							this.$message({
								message: res.msg,
								type: 'error'
							});
						}else{
							this.$message({
								message: res.msg,
								type: 'success'
							});
							this.reloadPage()
						}
					})
			},
			reloadPage: function() {
				this.reload()
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
	.main_div {
		padding: 20px;
	}
	
	.el-input {
		width: 260px;
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