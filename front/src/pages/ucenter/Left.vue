<template>
	<div class="user-left">
		<el-row>
			<el-col :span="24">
				<el-menu :default-active="default_active" :router="true">
					<el-menu-item index="/ucenter/index">
						<i class="iconfont icon-yonghu"></i>
						<span slot="title">个人信息</span>
					</el-menu-item>
					<el-menu-item index="/ucenter/Httpport">					
						<i class="iconfont icon-duankou"></i>
						<span slot="title">http端口</span>
					</el-menu-item>
					<el-menu-item index="/ucenter/iplog">				
						<i class="iconfont icon-jilu"></i>
						<span slot="title">IP提取记录</span>
					</el-menu-item>
					<el-menu-item index="/ucenter/saleslog">					
						<i class="iconfont icon-koufeimingxi"></i>
						<span slot="title">扣费记录</span>
					</el-menu-item>
					<el-menu-item index="/ucenter/auditor">						
						<i class="iconfont icon-renzheng"></i>
						<span slot="title">审核认证</span>
					</el-menu-item>
					<el-menu-item index="/ucenter/whitelist">						
						<i class="iconfont icon-mingdan"></i>
						<span slot="title">白名单设置</span>
					</el-menu-item>
					<!-- <el-menu-item index="/ucenter/pptpaccount">
						<i class="iconfont icon-account"></i>
						<span slot="title">PPTP账号</span>
					</el-menu-item> -->
					<el-menu-item index="/ucenter/pptpaccount2">					
						<i class="iconfont icon-p_pptp"></i>
						<span slot="title">PPTP账号</span>
					</el-menu-item>
					<el-menu-item index="/ucenter/orderlist">					
						<i class="iconfont icon-order"></i>
						<span slot="title">订单列表</span>
					</el-menu-item>
					<el-menu-item index="/ucenter/taocanlist">					
						<i class="iconfont icon-taocan"></i>
						<span slot="title">套餐列表</span>
					</el-menu-item>					
				</el-menu>
				<el-menu>
					<el-menu-item index="/" @click="logout">					
						<i class="iconfont icon-tuichu"></i>
						<span slot="title">退出</span>
					</el-menu-item>
				</el-menu>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	export default {
		name: 'Head',
		data() {
			return{
				default_active:'/ucenter/index'
			}
		},
		
		methods: {
			logout: function () {
				this.$http.get(this.$config.userhost + 'user/logout').then(
					response => {
						let res = response.data
						if (res.state != 0) {
							this.$message({
								message: res.msg,
								type: 'error'
							});
						} else {
							localStorage.removeItem('auth_data')
							this.$alert('成功退出', '提示', {
								confirmButtonText: '确定',
								callback: action => {
									this.$router.replace('/user/login')
								}
							})
						}
					})
			}
		},
		created:function(){
			this.default_active = this.$route.path
		}
	}
</script>

<style scoped>
	.el-menu{
		border-right:0;
		padding-left:30px ;
	}
	.el-menu .el-menu-item{
		text-align: left;
		margin-top:20px;
	}
	.el-menu .el-menu-item img{
		margin-right: 10px;
	}
	.el-menu .el-menu-item span{
		font-size: 16px;
	}
	.is-active{
		color: #fff;
		background-color: #166FCD;
	}
	.el-menu-item.is-active{
		color:#fff;
	}

	
</style>
<style scoped>
	@import url('../../assets/iconfont/iconfont.css');
	.iconfont{
		color:#303133;
		font-size: 18px;
		margin-right: 3px;
	}
</style>