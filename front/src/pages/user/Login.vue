<template>
	
	<div class="login">
		
		<el-row type="flex" justify="center">
			<el-col :xs="1" :sm="6" :md="8" :lg="8" :xl="9">&nbsp;</el-col>
			<el-col :xs="22" :sm="16" :md="8" :lg="8" :xl="6">
				
				<div class="login-title">
					<span class="logo-img">
						<router-link to="/">
							<img src="../../assets/logo.jpg" alt="">
						</router-link>
					</span>
					<span class="login-name">用户登录</span>
				</div>

				<el-form class="login-form">
					<el-form-item>
						<div class="login-input">
							<el-input placeholder="请输入用户名或手机号码" prefix-icon="iconfont yz-mobile" v-model="items.username" class="login-inputtext">
							</el-input>
						</div>
					</el-form-item>
					<el-form-item>
						<div class="login-input">
							<el-input placeholder="请输入密码" prefix-icon="iconfont yz-password" v-model="items.pwd" type="password" class="login-inputtext">
							</el-input>
						</div>
					</el-form-item>

					<el-form-item>
						<div class="verify-line">
							<el-input placeholder="请输入验证码" prefix-icon="iconfont yz-password" v-model="items.imgcode" class="login-inputtext" style="width: 70%;">

							</el-input>
							<img :src="imgurl" @click="reload" class="imgcode" style="height: 44px; width: 110px;">
						</div>
					</el-form-item>

					<el-form-item>
						<div class="forget-password">
							<el-checkbox v-model="checked">下次自动登录</el-checkbox>
						</div>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" class="login-btn" @click="login">登 录</el-button>
					</el-form-item>
					<div class="go-register">
						<span class="forget"><router-link to="/user/forget">忘记密码</router-link></span>
						<span class="btn-register"><router-link to="/user/reg">立即注册</router-link></span>
					</div>
				</el-form>
			</el-col>
			<el-col :xs="1" :sm="6" :md="8" :lg="8" :xl="9">&nbsp;</el-col>
		</el-row>
	</div>
</template>

<script>
	export default {
		name: 'Login',
		data() {
			return {
				items: {
					username: '',
					pwd: '',
					imgcode: ''
				},
				checked: '',
				imgurl: this.$config.userhost + 'Verify/entry'
			}
		},
		
		methods: {
			close: function() {
				this.$router.replace('/')
			},
			login: function() {
				var _this = this
				if(this.items.username == '') {
					this.$message.error('用户名不能为空')
					return false;
				}
				if(this.items.pwd == '') {
					this.$message.error('密码不能为空')
					return false;
				}
				if(this.items.imgcode == '') {
					this.$message.error('验证码不能为空')
					return false;
				}
				var data = {
					username: this.items.username,
					password: this.items.pwd,
					checkcode: this.items.imgcode
				}
				this.$http.post(this.$config.userhost+'login/checkLogin', this.$qs.stringify(data)).then(
					response => {
						/*如果有来源登录成功返回来源*/
						var res = response.data

						if(res.state == 1) {
							this.$message({
								message: res.msg,
								type: 'error'
							});
							this.imgurl = this.$config.userhost + 'Verify/entry?r=' + Math.random();
						} else if(res.state == 0) {
							
							localStorage.setItem('auth_data', JSON.stringify(res.data))
							this.$router.replace('/ucenter/index')
						}
					})

			},
			reload: function() {
				this.imgurl = this.$config.userhost + 'Verify/entry?r=' + Math.random();
			}
		}
	}
</script>
<style>
	.login-input .el-input__inner {
		height: 44px !important;
		line-height: 44px !important;
	}
	
	.verify-line .el-input__inner {
		height: 44px !important;
		line-height: 44px !important;
	}
</style>
<style >
	.login {
		padding: 15px;
	}
	
	.login-title {
		font-size: 18px;
		text-align: center;
		margin-top: 20px;
		display: flex;
		padding: 0 20px;
	}
	.logo-img{
		vertical-align: middle;
	}
	.logo-img img{
		width: 96px;
		vertical-align: middle;
	}
	.login-name{
		line-height: 30px;
		vertical-align: middle;
		margin-left: 20px;
		font-size: 14px;
		font-family: '微软雅黑';
	}
	.login-form {
		margin-top: 20px;
		padding: 0 20px;
	}
	
	.login-inputtext {
		border: none;
	}
	
	.login-btn {
		width: 100%;
		height: 45px;
		font-size: 18px;
	}
	
	.verify-line {
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content: flex-start;
	}
	
	.forget-password {
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content: space-between;
	}
	
	.close {
		font-size: 20px;
		font-weight: bold;
		cursor: pointer;
	}
	
	.go-register {
		height: 60px;
		line-height: 60px;
		display: flex;
		justify-content: space-between;
		background-color: rgb(240, 246, 255);
		padding: 0 20px;
	}
	.go-register a{
		color:rgb(53, 135, 255);
		text-decoration: none;
	}
	
	.imgcode {
		cursor: pointer;
	}
</style>