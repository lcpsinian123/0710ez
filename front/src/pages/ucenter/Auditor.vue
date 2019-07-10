<template>
	<div>
		<yz-header></yz-header>
		<div class="page-w">
			<div style="height: 20px;"></div>
			<div class="container">
				<yz-user-left></yz-user-left>
				<div class="user-right">
					<div class="auditor_right" v-if="auditorinfo.auditorcompany==null && auditorinfo.auditorperson==null">
						<h3>认证信息
							<hr>
						</h3>
						<div class="blockquote2">
							<span>当前认证状态</span>
							<span id="rzzt" class="label label-info">请认证个人信息 </span>
						</div>
						<div class="group">
							<ul class="clearfix">
								<li class="item1">
									<span class="icon"></span>
									<h6>个人开发者</h6>
									<div style="margin-bottom:20px;">
										<el-button type="primary" @click="checkAuditor(1)">申请个人认证</el-button>
									</div>
									<p class="auditor_p">适用：企业小规模需求，个人兴趣学习研究等 </p>
									<br>
									<p class="auditor_pp">*可使用绝大部分平台服务和产品功能</p>
								</li>
								<li class="item2">
									<span class="icon"></span>
									<h6>企业开发者</h6>
									<div style="margin-bottom:20px;">
										<el-button type="primary" @click="checkAuditor(2)">申请企业认证</el-button>
									</div>
									<p class="auditor_p">适用：有营运资质的企业主体；有较高服务需求如：已经投放市场，并有一定用户基础的产品业务；</p>
									<br>
									<p class="auditor_pp">*可使用平台所有服务和产品功能；</p>
									<p class="auditor_pp">*优先采纳需求反馈，提供技术支持；</p>
									<p class="auditor_pp">*获得更多商务支持，运营合作机会；</p>

								</li>
							</ul>
						</div>
					</div>
					<div class="shenhehou" v-else>
						<el-row class="sh_top">
							<el-col :span="8"><img src="../../assets/logo1.png"></el-col>
							<el-col :span="8" style="padding-left:30px;">
								<h2>{{auditorinfo.userinfo.username}}</h2>
								<span class="right"><i class="iconfont icon-geren">&nbsp;</i>{{renzheng}}用户：{{auditorinfo.state_text}}</span>
								<span class="right"><i class="iconfont icon-shouji">&nbsp;</i>手机号码：{{auditorinfo.userinfo.tel}}</span>
								<div class="info" v-if="type == 2">
									<p>企业名称：{{rzinfo.companyname}}</p>
									<p>联系人：{{rzinfo.lxr}}</p>
									<p>身份证号：{{rzinfo.idCard}}</p>
									<p>营业执照号码：{{rzinfo.companyCard}}</p>
								</div>
								<div class="info" v-else>
									<p>真实姓名：{{rzinfo.realname}}</p>
									<p>身份证号：{{rzinfo.idcard}}</p>
								</div>
							</el-col>
							<el-col :span="8">&nbsp;</el-col>
						</el-row>
						<el-row class="sh_bottom" v-if="state == 3">
							<el-col :span="4">&nbsp;</el-col>
							<el-col :span="14">
								<el-card class="box-card_1">
									<p><i class="iconfont icon-chenggong">&nbsp;&nbsp;</i><span class="rz_state">认证成功</span></p>
									<p style="margin-top:20px;font-size: 16px;">认证类别：{{renzheng}}认证</p>
									<p style="margin-top:20px;font-size: 14px;margin-bottom: 20px;">个人认证用户可以申请更改认证为企业用户<br>企业认证用户不可再更改为个人认证，企业认证通过后，信息不可更改。</p>
									<el-button type="primary" @click="checkAuditor(2)" v-if="type==1">企业认证</el-button>
								</el-card>
							</el-col>
							<el-col :span="6">&nbsp;</el-col>
						</el-row>
						<el-row class="sh_bottom" v-else-if="state == 1">
							<el-col :span="4">&nbsp;</el-col>
							<el-col :span="14">
								<el-card class="box-card_2">
									<p><i class="iconfont icon-chenggong">&nbsp;&nbsp;</i><span class="rz_state">待审核</span></p>
									<p style="margin-top:20px;font-size: 16px;">您的认证信息已提交，工作人员会尽快完成审核，请耐心等待结果。</p>
								</el-card>
							</el-col>
							<el-col :span="6">&nbsp;</el-col>
						</el-row>
						<el-row class="sh_bottom" v-else>
							<el-col :span="4">&nbsp;</el-col>
							<el-col :span="14">
								<el-card class="box-card_3">
									<p><i class="iconfont icon-shibai-01">&nbsp;&nbsp;</i><span class="rz_state">认证失败</span></p>
									<p style="margin-top:20px;font-size: 16px;">失败原因：{{beizhu}}</p>
									<p style="margin-top:20px;font-size: 16px;margin-bottom: 20px;">请确保证件文字清晰后再重新提交上传，资料更新好后重新提交。</p>
									<el-button type="primary" @click="checkAuditor(type)">重新认证</el-button>
								</el-card>
							</el-col>
							<el-col :span="6">&nbsp;</el-col>
						</el-row>
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
				checkauditor: [],
				auditorinfo: [],
				renzheng: '',
				beizhu: '',
				type: 1,
				state: 1,
				dialogVisible: false,
				rzinfo:[],
				img_host:this.$config.auditorimg
			}
		},
		metaInfo: {
			title: '审核认证-亿洲网络', // set a title
		},
		created: function() {
			this.$http.get('/http/Authentication/auditorinfo', {}).then(
				response => {
					var res = response.data
					var state_text = res.data.state_text

					document.getElementById("rzzt").innerHTML = state_text;
					this.checkauditor = res.data.checkauditor
					this.auditorinfo = res.data
					if (this.auditorinfo.auditorcompany != null || this.auditorinfo.auditorperson != null) {
						if (this.auditorinfo.auditorcompany != null) {
							this.renzheng = '企业'
							this.beizhu = this.auditorinfo.auditorcompany.beizhu
							this.type = 2
							this.state = this.auditorinfo.auditorcompany.state
							this.rzinfo = this.auditorinfo.auditorcompany
						} else {
							this.renzheng = '个人'
							this.beizhu = this.auditorinfo.auditorperson.beizhu
							this.type = 1
							this.state = this.auditorinfo.auditorperson.state
							this.rzinfo = this.auditorinfo.auditorperson
						}
					}
				})
		},
		methods: {
			checkAuditor: function(type) {
				var check_auditor = this.checkauditor
				if (check_auditor.code == -1) {
					this.$message({
						message: check_auditor.msg,
						type: 'error'
					});
				} else {
					if (type == 1) {
						this.$router.push('/ucenter/auditorperson')
					} else if (type == 2) {
						this.$router.push('/ucenter/auditorcompany')
					}
				}
			},
			fullimg:function(host,img){
				return host+img
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
		border: 0 !important;
	}
	.auditor_right,
	.right-side {
		width: 960px;
		height: 600px;
		box-shadow: 0 0 10px rgba(14, 79, 148, 0.2);
		background: #fff;
		border-radius: 5px;
		box-sizing: border-box;
		padding: 18px;
		margin-top: 30px;
	}

	.auditor_right h3 {
		font-size: 24px;
		font-weight: 500;
	}

	h1,
	h2,
	h3 {
		margin-top: 20px;
		margin-bottom: 10px;
	}

	.blockquote2 span {
		margin-left: 100px;
		font-size: 16px;
	}

	.blockquote2 span {
		margin-left: 100px;
		font-size: 16px;
	}

	.label-info {
		background-color: #5bc0de;
	}

	.label {
		display: inline;
		padding: .2em .6em .3em;
		font-weight: bold;
		line-height: 1;
		color: #fff;
		text-align: center;
		white-space: nowrap;
		vertical-align: baseline;
		border-radius: .25em;
	}

	.group {
		margin-top: 30px;
	}

	.group ul {
		background: #fff;
		padding-left: 40px;
		position: relative;
		margin-top: 0;
		margin-bottom: 10px;
		list-style: none;
	}

	.group ul li.item1 {
		margin-right: 40px;
	}

	.group ul li {
		position: relative;
		float: left;
		width: 45%;
		max-width: 520px;
		height: 400px;
		border: 1px solid #e3e7ea;
		text-align: center;
		list-style: none;
	}

	.group ul li span {
		display: inline-block;
		width: 100px;
		height: 80px;
		margin: 48px 0 20px 0;
		background: url(../../assets/span-icon.png) 0px 0px no-repeat;
	}

	.group ul li h6 {
		font-size: 16px;
		font-weight: bold;
		line-height: 30px;
		margin-bottom: 10px;
		font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
		margin-top: 10px;
	}

	.btn-style4 {
		display: inline-block;
		padding: 6px 24px;
		font-size: 14px;
		line-height: 22px;
		background-color: #50a5fe;
		border-radius: 3px;
		-webkit-border-radius: 3px;
		-moz-border-radius: 3px;
	}

	a {
		color: #428bca;
		text-decoration: none;
	}

	.group ul li p {
		color: #999ea4;
		padding-right: 20px;
	}

	.auditor_p {
		text-align: left;
		margin-left: 10px;
	}

	p {
		margin: 0 0 10px;
	}

	.auditor_pp {
		font-size: 12px;
		text-align: left;
		margin-left: 50px;
	}

	.group ul .item2 span {
		background-position: 0px -80px;
	}
	.shenhehou{
		margin-top: 30px;
	}
	.shenhehou img {
		float: right;
	}

	.shenhehou .right {
		display: block;
		margin-top: 10px;
		margin-left: 10px;
	}

	.shenhehou h2 {
		display: inline-block;
		margin-left: 30px;
		margin-top: 0;
		margin-bottom: 0;
	}
	.shenhehou .sh_top{
		margin-top: 70px;
	}
	.shenhehou .sh_top i {
		font-size: 20px;
	}

	.shenhehou .sh_top span {
		color: #9A9A9A;
	}

	.shenhehou .sh_bottom {
		margin-top: 30px;
	}

	.shenhehou .sh_bottom i {
		font-size: 28px;
	}

	.shenhehou .sh_bottom .rz_state {
		font-weight: bold;
		font-size: 20px;
	}

	.box-card_1 {
		border-color: #44cc00;
		background: #f0faeb;
		padding-left: 50px;
		color: #44cc00;
	}

	.box-card_2 {
		border-color: #007efc;
		background: #e6f5f5;
		padding-left: 50px;
		color: #007efc;
	}

	.box-card_3 {
		border-color: #fc0000;
		background: #faebeb;
		padding-left: 50px;
		color: #fc0000;
	}

	.rz_info .el-button {
		width: 100%;
		height: 50px;
	}
	.info{
		margin: 10px 0 0 10px;
	}
	.info p{
		color:#9A9A9A;
	}
</style>
