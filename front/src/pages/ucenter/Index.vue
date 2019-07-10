<template>
	<div>
		<yz-header></yz-header>
		<div class="page-w">
			<div style="height:20px;"></div>
			<div class="container">
				<yz-user-left></yz-user-left>
				<div class="user-right">
					<el-card shadow="always" style="width: 90%;margin-left: 30px;margin-top:30px;">
						<div style="display: inline-flex;padding:20px;">
							<div class="service" style="width: 45%;font-size: 14px;font-weight: bold;padding-left: 10%;">
								<div class="service_left" style="display: inline-flex;">
									<div class="photo" style="text-align: center;width: 30%;">
										<img src="../../assets/new/ucenter/man.png" style="max-width: 80%;margin: 10px;">
										<div class="service_left bottom" style="letter-spacing: 1px;font-size: 14px;color: rgb(20, 122, 240);">-专属顾问-</div>
									</div>
									<div class="service_right" style="position: relative;">
										<div style="margin-top: 14px;font-size: 12px;color: #777777;">{{saler.nickname}}（售前售后）</div>
										<div style="margin-top: 14px;font-size: 12px;color: #777777;">QQ：{{saler.qq}}</div>
										<div style="margin-top: 14px;font-size: 12px;color: #777777;">TEL：{{saler.tel}}</div>
										<a target="_blank" :href="'https://wpa.qq.com/msgrd?v=3&amp;uin='+saler.qq+'&amp;site=qq&amp;menu=yes'" style="position: absolute;bottom: -5px;">
											<img style="max-height: 22px;" border="0" src="../../assets/new/ucenter/button_111.gif" alt="点击这里给我发消息" title="点击这里给我发消息">
										</a>
									</div>
								</div>
							</div>
							<div class="service" style="width: 45%;font-size: 14px;font-weight: bold;padding-left: 10%;">
								<div class="service_left" style="display: inline-flex;">
									<div class="photo" style="text-align: center;width: 30%;">
										<img src="../../assets/new/ucenter/boss.png" style="max-width: 80%;margin: 10px;">
										<div class="service_left bottom" style="letter-spacing: 1px;font-size: 14px;color: rgb(20, 122, 240);">-产品经理-</div>
									</div>
									<div class="service_right" style="position: relative;">
										<div style="margin-top: 14px;font-size: 12px;color: #777777;">{{product_manager.nickname}}（投诉建议）</div>
										<div style="margin-top: 14px;font-size: 12px;color: #777777;">QQ：{{product_manager.qq}}</div>
										<div style="margin-top: 14px;font-size: 12px;color: #777777;">TEL：{{product_manager.tel}}</div>
										<a target="_blank" :href="'https://wpa.qq.com/msgrd?v=3&amp;uin='+product_manager.qq+'&amp;site=qq&amp;menu=yes'" style="position: absolute;bottom: -5px;">
											<img style="max-height: 22px;" border="0" src="../../assets/new/ucenter/button_111.gif" alt="点击这里给我发消息" title="点击这里给我发消息">
										</a>
									</div>
								</div>
							</div>
						</div>
					</el-card>
					<el-card shadow="always" style="width: 90%;margin-left: 30px;margin-top:30px;">
						<div style="height: 20px;"></div>
						<h2 style="font-size: 14px;color: #4d4d4d;text-align: center;">您已在亿洲网络累计提取IP</h2>
						<h1 style="font-size: 36px;font-weight: bold;color: #50a6ff;text-align: center;">{{totalIps}}</h1>
						<div style="text-align: center;">
							<el-button type="primary" v-if="free.state==0" @click="getFree" style="background-color: #166FCD;">免费领取IP</el-button>
							<el-button type="primary" disabled v-else>今日已领取</el-button>
							<el-button type="primary" @click="getIp" style="background-color: #00ADEF;">提取IP</el-button>
						</div>
					</el-card>
					<el-row class="main_row">
						<el-col :span="1">&nbsp;</el-col>
						<el-col :span="22">
								<el-row>
									<el-col :span="5">
										<el-card shadow="hover">
											<span class="right" style="font-size: 14px;color: #9ea1ab;">用户名</span>
											<span class="right" style="margin: 10px auto;color: #222222;font-size: 22px;">{{userInfo.username}}</span>
											<el-button type="primary" size="small" @click="changepwd()">
													修改密码
											</el-button>
										</el-card>
									</el-col>
									<el-col :span="1">&nbsp;</el-col>
									<el-col :span="5">
										<el-card shadow="hover">
											<span class="right" style="font-size: 14px;color: #9ea1ab;">手机号</span>
											<span class="right" style="margin: 10px auto;color: #222222;font-size: 22px;">{{userInfo.tel}}</span>
											<el-button type="primary"  size="small" v-clipboard:copy="userInfo.cdkey" v-clipboard:success="onCopy" v-clipboard:error="onError">
												<span style="font-family: SimSun;font-size: 14px;font-weight: bold;letter-spacing: 1px;">{{userInfo.cdkey}}</span>
											</el-button>
										</el-card>
									</el-col>
									<el-col :span="1">&nbsp;</el-col>
									<el-col :span="5">
										<el-card shadow="hover">
											<span class="right" style="font-size: 14px;color: #9ea1ab;">HTTP账户余额(元)</span>
											<span class="right" style="margin: 10px auto;color: #222222;font-size: 22px;">{{userBalance}}</span>
											<el-button size="small" type="primary" @click="recharge(1)">充值</el-button>
										</el-card>
									</el-col>
									<el-col :span="1">&nbsp;</el-col>
									<el-col :span="5">
										<el-card shadow="hover">
											<span class="right" style="font-size: 14px;color: #9ea1ab;">PPTP账户余额(元)</span>
											<span class="right" style="margin: 10px auto;color: #222222;font-size: 22px;">{{pptpuserBalance}}</span>
											<el-button size="small" type="primary" @click="recharge(2)">充值</el-button>
										</el-card>
									</el-col>
								</el-row>
						</el-col>
						<el-col :span="1">&nbsp;</el-col>
					</el-row>
				
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
				userInfo: [],
				free: [],
				userBalance: '',
				pptpuserBalance:'',
				totalIps: '',
				saler:{
					tel:'13479799050',
					nickname:'帅气',
					qq:'997335418',
				},
				product_manager:{
					tel:'13479799050',
					nickname:'帅气',
					qq:'997335418',
				}
			}
		},
		metaInfo: {
			title: '个人信息-亿洲网络', // set a title
		},
		
		created: function() {
			this.$http.get(this.$config.host + 'http/http_center/fullUserInfo').then(
				response => {
					let res = response.data
					this.userInfo = res.data.fullUserInfo
					this.free = res.data.free
					this.userBalance = res.data.userBalance
					this.pptpuserBalance = res.data.pptpuserBalance
					this.totalIps = res.data.totalIps
					if (res.data.saler!=''){
						this.saler = res.data.saler
					}
					if(res.data.product_manager!=''){
						this.product_manager = res.data.product_manager
					}
				})
		},
		methods: {
			getFree: function() {
				this.$http.get(this.$config.host + 'http/get_ip/freeIp').then(
					response => {
						var res = response.data
						if(res.state == 1) {
							this.$message({
								message: res.msg,
								type: 'error'
							});
						} else {
							this.$message({
								message: res.msg,
								type: 'success'
							});
							this.reload()
						}
					}
				)
			},
			getIp: function() {
				this.$router.push('/getip')
			},
			onCopy: function(e) {
				this.$message({
								message: '复制成功',
								type: 'success'
							});
			},
			onError: function(e) {
				this.$message({
								message: '复制成功',
								type: 'success'
							});
			},
			changepwd:function(){
				this.$router.push({path:'./changepwd',query:{username: this.userInfo.username}})
			},
			recharge:function(type){
				if(type == 2){
					this.$alert('请联系销售', '充值', {
						confirmButtonText: '确定',
					})
				}else{
					this.$router.push('/pay/payshort');
				}
			},
		}

	}
</script>

<style scoped>
	.page-w{
		width: 100%;
		height: 950px;
		background-color: #f5f6f7;
	}
	.container{
		width: 1300px;
		height: 900px;
		margin: 0 auto;
		
	}
	.main_row {
		margin-top: 60px;
		margin-bottom: 50px;
	}
	.main_row .el-card{
		width:200px;
		height: 170px;
	}
	 .el-row .el-col .iconfont {
		font-size: 100px;
		color: #c5c5c5;
	}
	
	.el-row .el-col i {
		display: block;
		float: left;
	}
	
	.el-row .el-col .right {
		display: block;
		margin-top: 10px;
		text-align: center;
	}
	
	.el-row .el-col .el-button {
		margin-top: 10px;
		margin-left: 30px;
		width: 100px;
		height:40px;
		background-color: #00ADEF;
	}
	.cdkey{
		margin-left: 20px !important;
	}
	.el-row .el-col a {
		color: #fff;
		text-decoration: none;
	}
</style>