<template>
	<div>
		<yz-header></yz-header>
		<div class="page-w">
			<div style="height: 20px;"></div>
			<div class="container">
				<yz-user-left></yz-user-left>
				<div class="user-right">
					<el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
						<el-form-item label="旧密码" prop="oldpass">
							<el-input type="password" v-model="ruleForm.oldpass" auto-complete="off"></el-input>
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
      var checkOldpass = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('旧密码不能为空'));
        }
        setTimeout(() => {
					var username = this.$route.query.username
					this.$http.get(this.$config.userhost + 'user/checkpwd', {
						params: {
							'username': username,
							'password': value
						},
					}).then(
						response => {
							var res = response.data
							if(res.state == 1){
								callback(new Error(res.msg));
							}else{
								callback();
							}
						}
					)
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
        ruleForm: {
          pass: '',
          checkPass: '',
          oldpass: ''
        },
        rules: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          oldpass: [
            { validator: checkOldpass, trigger: 'blur' }
          ]
        }
      };
    },
		metaInfo: {
			title: '修改密码-亿洲网络', // set a title
		},
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
           var username = this.$route.query.username
					 console.log(this.ruleForm.checkPass)
           this.$http.get(this.$config.userhost + 'user/changepwd', {
           	params: {
           		'username': username,
           		'password': this.ruleForm.oldpass,
							'newpassword':this.ruleForm.checkPass
           	},
           }).then(
           	response => {
           		var res = response.data

           		if(res.state == 1){
           			this.$message({
           				message: res.msg,
           				type: 'error'
           			});
           		}else{
           			this.$message({
           				message: res.msg,
           				type: 'success'
           			});
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
							this.$router.replace('/user/login')
						}
					})
           		}
           	}
           )
          } else {
            this.$message({
            	message: '请检查旧密码是否正确以及两次输入的新密码是否一致',
            	type: 'error'
            });
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
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
	.el-form{
		margin-top:50px;
	}
	.el-form .el-form-item{
		width:50%;
	}
</style>
