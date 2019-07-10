<template>
	<div class="forget">
		<el-row>
			<el-col :span="8">&nbsp;</el-col>
			<el-col :span="8">
				<div class="forget-title">找回密码</div>
				<div class="forget_box">
					<el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
						<el-form-item label="手机号" prop="phone">
							<el-input type="text" v-model="ruleForm.phone" auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="图片验证码" prop="imgcode">
							<el-input type="text" v-model="ruleForm.imgcode" auto-complete="off" class="imgcode_input"></el-input>
							<img :src="imgurl" @click="reload" class="imgcode" style="width:40%;vertical-align: top;cursor: pointer;">
						</el-form-item>
						<el-form-item label="验证码" prop="code">
							<el-input type="text" v-model="ruleForm.code" auto-complete="off"></el-input>
							<el-button type="primary" :disabled="sendsms_btn_status" @click="sendsms">{{smstxt}}</el-button>
						</el-form-item>
						<el-form-item label="新密码" prop="pass">
							<el-input type="password" v-model="ruleForm.pass" auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="确认新密码" prop="checkPass">
							<el-input type="password" v-model="ruleForm.checkPass" auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
							<el-button @click="resetForm('ruleForm')">重置</el-button>
						</el-form-item>
					</el-form>
				</div>
			</el-col>
			<el-col :span="8">&nbsp;</el-col>
		</el-row>
	</div>
</template>

<script>
	export default {
		name: 'Login',
		data() {
			var checkPhone = (rule, value, callback) => {
				if (!value) {
					return callback(new Error('手机号不能为空'));
				}
				setTimeout(() => {
					if (value.length != 11) {
						callback(new Error('请输入正确的手机号码'));
					} else {
						callback();
					}
				}, 1000);
			};
			var validatePass = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入密码'));
				} else {
					if (this.ruleForm.checkPass !== '') {
						this.$refs.ruleForm.validateField('checkPass');
					}
					callback();
				}
			};
			var validatePass2 = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请再次输入密码'));
				} else if (value !== this.ruleForm.pass) {
					callback(new Error('两次输入密码不一致!'));
				} else {
					callback();
				}
			};
			return {
				smstxt: '获取验证码',
				sendsms_btn_status: false,
				imgurl: this.$config.userhost + 'verify/entry',
				ruleForm: {
					phone: '',
					code: '',
					imgcode: '',
					pass: '',
					checkPass: '',
				},
				rules: {
					phone: [{
						validator: checkPhone,
						trigger: 'blur'
					}],
					pass: [{
						validator: validatePass,
						trigger: 'blur'
					}],
					checkPass: [{
						validator: validatePass2,
						trigger: 'blur'
					}]
				}
			};
		},
		methods: {
			reload: function () {
				this.imgurl = this.$config.userhost + 'verify/entry?r=' + Math.random();
			},
			sendsms: function () {
				if (this.$fun.isEmpty(this.ruleForm.phone)) {
					this.$message({
						message: '请输入手机号码',
						type: 'error'
					});
					return false;
				}
				if (this.$fun.isEmpty(this.ruleForm.imgcode)) {
					this.$message({
						message: '请输入图形验证码',
						type: 'error'
					});
					return false;
				}

				this.$http.post(this.$config.userhost + 'sms/forgetSend', this.$qs.stringify({
					tel: this.ruleForm.phone,
					checkcode: this.ruleForm.imgcode,
				})).then(
					response => {
						var res = response.data

						if (res.state != 0) {
							this.$message({
								message: res.msg,
								type: 'error'
							});

						} else {
							var self = this
							self.smstxt = 60
							self.sendsms_btn_status = true

							var xx = setInterval(timedown, 1000)

							function timedown() {
								if (self.smstxt == 1) {
									self.smstxt = '重新发送'
									self.sendsms_btn_status = false
									clearInterval(xx)
								} else {
									self.smstxt--
								}
							}
						}
						this.imgurl = this.$config.userhost + 'verify/entry?r=' + Math.random();
					})
			},
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						var data = {
							tel:this.ruleForm.phone,
							smscode:this.ruleForm.code,
							password:this.ruleForm.pass,
							checkpassword:this.ruleForm.checkPass
						};
						this.$http.post(this.$config.userhost + 'makepublic/resetpwd', this.$qs.stringify(data)).then(
											response => {
												var res = response.data
												if(res.state == 0) {
													this.$message({
														message: res.msg,
														type: 'success'
													});
													this.$router.replace('/user/login')
						
												} else {
													this.imgurl = this.$config.userhost + 'verify/entry?r=' + Math.random();
													this.$message({
														message: res.msg,
														type: 'error'
													});
												}
											})
					} else {
						this.$message({
							message: '请检查手机验证码是否正确以及两次输入的新密码是否一致',
							type: 'error'
						});
						return false;
					}
				});
			},
		}
	}
</script>

<style scoped>
	.forget {
		margin-top: 50px;
	}

	.el-input {
		width: 60%;
	}

	.imgcode_input {
		width: 50%;
		vertical-align: top;
	}

	.forget-title {
		font-size: 18px;
		text-align: center;
	}

	.forget_box {
		margin-top: 30px;
		border: 1px solid #ccc;
		padding: 30px 30px;
	}
</style>
