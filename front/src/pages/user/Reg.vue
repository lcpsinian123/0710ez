<template>
<div>
    <div class='regheader'>
        <div class='LogoBox'>
            <div class="header-logo"@click ='goindex' >
                <img src="../../assets/logo_blue.png" title="http代理ip-logo" alt="logo-亿洲网络" style="width: 31.7%;">
                <div style="width: 68%; overflow:  hidden;">
                    <img id="logo" src="../../assets/logo_white.png" title="http代理ip-亿洲网络" alt="首页logo-亿洲网络">

                </div>

            </div>
            <div class='soilds'></div>
            <div class='RegBox'>

                注册账号
            </div>
            <span style="float: right;margin:0 1.5%;">
                <span class='regfontsize'>我已注册&nbsp;,&nbsp;现在就&nbsp;</span>
				 <el-button style="width:60px; height:30px; background:#eee; color: #555565;border-radius: 4px;padding: 0px 12px;" round  @click="centerDialogVisible = true">登录</el-button>

                <el-dialog class='loginBox' :modal='false' style="background:rgba(0,0,0,.8)" :visible.sync="centerDialogVisible" width="25%"  >
                    <div class="login" >

                        <el-row type="flex" justify="center">
                         
                            <el-col>

                                <div class="login-title">
                                    <span class="logo-img">
                                        <router-link to="/">
                                            <img src="../../assets/logo.jpg" alt="">
                                        </router-link>
                                    </span>
                                    <span class="login-name">用户登录</span>
                                </div>

                                <el-form class="login-form">
                                    <el-form-item style="margin-bottom:10px">
                                        <div class="login-input">
                                            <el-input placeholder="用户名/手机号" prefix-icon="iconfont yz-mobile" v-model="items.username" class="login-inputtext">
                                            </el-input>
                                        </div>
                                    </el-form-item>
                                    <el-form-item style="margin-bottom:10px">
                                        <div class="login-input">
                                            <el-input placeholder="密码" prefix-icon="iconfont yz-password" v-model="items.pwd" type="password" class="login-inputtext">
                                            </el-input>
                                        </div>
                                    </el-form-item>

                                    <el-form-item style="margin-bottom:10px">
                                        <div class="verify-line">
                                            <el-input placeholder="图形验证码" prefix-icon="iconfont yz-password" v-model="items.imgcode" class="login-inputtext login-vcode" style="width: 190px; height:40px;margin-right:2px;">

                                            </el-input>
                                            <img :src="imgurl" @click="reload" class="imgcode" style="height: 42px; width: 100px;">
                                        </div>
                                    </el-form-item>

                                    <el-form-item style="margin-bottom:10px">
                                        <div class="forget-password">
                                            <el-checkbox v-model="checked">下次自动登录</el-checkbox>
                                        </div>
                                    </el-form-item>
                                    <el-form-item style="margin-bottom:10px">
                                        <el-button type="primary" class="login-btn" @click="login">登 录</el-button>
                                    </el-form-item>
                                   
                                </el-form>
								<div class="register">
                                        <span class="forget">
                                            <router-link to="/user/forget">忘记密码</router-link>
                                        </span>
                                        <span class="btn-register">
                                            <router-link to="/user/reg">立即注册</router-link>
                                        </span>
                                    </div>
                            </el-col>
                           
                        </el-row>
                    </div>
                
                </el-dialog>
            </span>
        </div>
		
    </div>
    <div style='width:1200px; margin:0 auto;' >
		    <img style='width=980px;' src="../../assets/regbg.png" />
		</div>
    <el-row type="flex" justify="center">
        <el-col :xs="1" :sm="4" :md="6" :lg="6" :xl="6">&nbsp;</el-col>
        <el-col :xs="22" :sm="18" :md="12" :lg="12" :xl="8">
            <div class="close" @click="close"><i class="iconfont yz-close"></i></div>

            <div class="reg-form">
                <el-form ref="form" :model="items" label-width="100px">
                    <el-form-item style='margin-bottom:20px;' label="用户名：">
                        <el-input v-model="items.username" style="width:350px" placeholder="请输入用户名"></el-input>
                    </el-form-item>
                    <el-form-item style='margin-bottom:20px;' label="密码：">
                        <el-input v-model="items.password" style="width:350px" type="password" placeholder="请输入密码"></el-input>
                    </el-form-item>
                    <el-form-item style='margin-bottom:20px;' label="密码确认：">
                        <el-input v-model="items.cpassword" style="width:350px" type="password" placeholder="请输入密码确认"></el-input>
                    </el-form-item>

                    <el-form-item style='margin-bottom:20px;' label="手机号码：">
                        <el-input v-model="items.tel" style="width:350px" placeholder="请输入手机号码"></el-input>
                    </el-form-item>
                    <el-form-item style='margin-bottom:20px;' label="图形验证码：">
                        <el-input v-model="items.imgcode" placeholder="图形验证码" style="width:178px;"></el-input>
                        <img :src="imgurl" @click="reload" class="imgcode" style="160px; height: 40px; vertical-align: top;">
                    </el-form-item>
                    <el-form-item style='margin-bottom:20px;' label="短信验证码：">
                        <el-input v-model="items.smscode" placeholder="短信验证码" style="width:178px;">

                        </el-input>
                        <el-button  @click="sendsms" :disabled="sendsms_btn_status" style="background:#eee; width: 160px;">{{smstxt}}</el-button>
                    </el-form-item>
                      <div class="agree-check">
                        <el-checkbox style='margin:0; font-size:12px;' v-model="checked">阅读并接受</el-checkbox>
                        <a href="#"  @click="showDesc">《亿洲网络用户协议》</a>
                    </div>
                    <el-form-item style='margin-bottom:22px;' type="flex" justify="center">
                        <el-button type="primary" @click="reg" style="font-weight:600; width:350px; height:50px; font-size:16px; font-family:'SimSun'">注册</el-button>

                    </el-form-item>

                  

                </el-form>

            </div>
        </el-col>
        <el-col :xs="1" :sm="4" :md="6" :lg="6" :xl="10">&nbsp;</el-col>
    </el-row>
    <el-dialog title="亿洲HTTP注册协议" :visible.sync="dialogVisible" width="90%">
        <div class="inner">
            本协议是您与亿洲HTTP相关事宜所订立的契约，请您仔细阅读本注册协议，您点击“同意”后，本协议即构成对双方有约束力的法律文件。<br><br> 第1条 用户注册<br><br> 1、用户注册是指用户登录亿洲HTTP，按要求填写相关信息并确认同意本服务协议的过程。
            <br><br> 2、亿洲HTTP用户必须是具有完全民事行为能力的自然人。
            <br><br> 3、本产品一经售出，概不退款。
            <br><br> 第2条 用户的帐号，密码和安全性<br><br> 用户一旦注册成功，成为本站的合法用户。亿洲HTTP将对用户名和密码安全负全部责任，若是因个人行为造成的密码用户安全问题，本公司不负责任。此外，每个用户都要对以其用户名进行的所有活动和事件负全责。用户若发现任何非法使用用户帐号或存在安全漏洞的情况，请立即通告本站或者致电官网电话。
            <br> 第3条 用户依法言行义务<br> 本协议依据国家相关法律法规规章制定，用户同意严格遵守以下义务：
            <br> （1）不得传输或发表：煽动抗拒、破坏宪法和法律、行政法规实施的言论，煽动颠覆国家政权，推翻社会主义制度的言论，煽动分裂国家、破坏国家统一的的言论，煽动民族仇恨、民族歧视、破坏民族团结的言论；
            <br> （2）从中国大陆向境外传输资料信息时必须符合中国有关法规；
            <br> （3）不得利用本站从事洗钱、窃取商业秘密、窃取个人信息等违法犯罪活动；
            <br> （4）不得干扰本站的正常运转，不得侵入本站及国家计算机信息系统；
            <br> （5）不得传输或发表任何违法犯罪的、骚扰性的、中伤他人的、辱骂性的、恐吓性的、伤害性的、庸俗的，淫秽的、不文明的等信息资料；
            <br> （6）不得传输或发表损害国家社会公共利益和涉及国家安全的信息资料或言论；
            <br> （7）不得教唆他人从事本条所禁止的行为；
            <br> （8）不得利用在本站注册的账户进行牟利性经营活动；
            <br> （9）不得发布任何侵犯他人著作权、商标权等知识产权或合法权利的内容；
            <br> 用户应不时关注并遵守本站不时公布或修改的各类合法规则规定。
            <br> 本站保有删除站内各类不符合法律政策或不真实的信息内容而无须通知用户的权利。
            <br> 若用户未遵守以上规定的，本站有权作出独立判断并采取暂停或关闭用户帐号等措施。用户须对自己在网上的言论和行为承担法律责任。
            <br><br> 第4条 协议更新及用户关注义务<br> 根据国家法律法规变化及网站运营需要，亿洲HTTP有权对本协议条款不时地进行修改，修改后的协议一旦被张贴在本站上即生效，并代替原来的协议。用户可随时登录查阅最新协议； 用户有义务不时关注并阅读最新版的协议及网站公告。如用户不同意更新后的协议，可以且应立即停止接受网站依据本协议提供的服务；如用户继续使用本网站提供的服务的，即视为同意更新后的协议。亿洲HTTP建议您在使用本站之前阅读本协议及本站的公告。 如果本协议中任何一条被视为废止、无效或因任何理由不可执行，该条应视为可分的且并不影响任何其余条款的有效性和可执行性。
            <br><br>第5条 法律管辖和适用
            <br>本协议的订立、执行和解释及争议的解决均应适用在中华人民共和国大陆地区适用之有效法律（但不包括其冲突法规则）。 如发生本协议与适用之法律相抵触时，则这些条款将完全按法律规定重新解释，而其它有效条款继续有效。 如缔约方就本协议内容或其执行发生任何争议，双方应尽力友好协商解决；协商不成时，任何一方均可向有管辖权的中华人民共和国大陆地区法院提起诉讼。<br>
        </div>
        <div class="agree-btn">
            <el-button type="primary" round @click="closeDesc">同意并继续</el-button>
        </div>
    </el-dialog>
    <div class='CopyRight'>
	
	2019@YiZhou
	
	</div>
</div>
</template>

<script>
export default {
    name: 'Login',
    data() {
        return {
            smstxt: '获取短信验证码',
            sendsms_btn_status: false,
            dialogVisible: false,
			centerDialogVisible:false,
            items: {
                username: '',
                password: '',
                cpassword: '',
                tel: '',
                smscode: '',
                imgcode: ''
            },
            checked: true,
            imgurl: this.$config.userhost + 'verify/entry'
        }
    },

    methods: {
        close: function () {
            this.$router.replace('/user/login')
        },
        closeDesc: function () {
            this.dialogVisible = false
        },
        showDesc: function () {
            this.dialogVisible = true
        },
        reload: function () {
            this.imgurl = this.$config.userhost + 'verify/entry?r=' + Math.random();
        },
        sendsms: function () {
            if (this.$fun.isEmpty(this.items.tel)) {
                this.$message({
                    message: '请输入手机号码',
                    type: 'error'
                });
                return false;
            }
            if (this.$fun.isEmpty(this.items.imgcode)) {
                this.$message({
                    message: '请输入图形验证码',
                    type: 'error'
                });
                return false;
            }

            this.$http.post(this.$config.userhost + 'sms/regsend', this.$qs.stringify({
                tel: this.items.tel,
                checkcode: this.items.imgcode,
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
        reg: function () {
            if (!this.checked) {
                this.$message({
                    message: '请选择同意注册协议',
                    type: 'error'
                });
                return false
            }
            if (this.items.username == '') {
                this.$message({
                    message: '请输入用户名',
                    type: 'error'
                });
                return false;
            }
            if (this.items.password == '') {
                this.$message({
                    message: '请输入密码',
                    type: 'error'
                });
                return false;
            }
            if (this.items.cpassword == '') {
                this.$message({
                    message: '请输入密码确认',
                    type: 'error'
                });
                return false;
            }
            if (this.items.tel == '') {
                this.$message({
                    message: '请输入手机号码',
                    type: 'error'
                });
                return false;
            }
            if (this.items.smscode == '') {
                this.$message({
                    message: '请输入手机验证码',
                    type: 'error'
                });
                return false;
            }
            var data = this.items;

            let user_from = localStorage.getItem('user_from')
            if (!this.$fun.isEmpty(user_from)) {
                data.user_from = user_from
            }

            this.$http.post(this.$config.userhost + 'makepublic/reg', this.$qs.stringify(data)).then(
                response => {
                    var res = response.data
                    if (res.state == 0) {
                        this.$message({
                            message: res.msg,
                            type: 'sucess'
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
        goindex:function(){
            this.$router.push('/')
        }

    }
}
</script>
<style>
  .el-form .el-form-item{
        margin-bottom:10px;
    }
   .agree-check .el-checkbox__label{
        font-size:12px;
    }
    .el-form-item__label{
        color:#666;
        font-weight:600;
        padding-right:10px;
    }
</style>

<style scoped>
@media screen and (max-width:1024px){
    .header-logo{
        margin-left:10px;
    }
}
.CopyRight {
	color:#7478c8;
	margin-top:118px;
    font-size: 12px;
    text-align: center;
}

.LogoBox {
    margin-top: 20px;
    vertical-align: top;
}

.RegBox {
    font-size: 18px;
    height: 40px;
    display: inline-block;
    vertical-align: top;
    padding: 13px 0 0 0;
    color: #666;

}

.soilds {
    display: inline-block;
    height: 23px;
    width: 1px;
    border-left: 1px solid #ccc;
    margin: 0 10px;
    padding-top: 15px;
    vertical-align: top;
}

.regfontsize {

    color: #70726b;
    font-size: 12px;
}

.regheader {
    width: 980px;
    height: 52px;
    margin: 0 auto;
}

.page-w {
    width: 80%;
    margin: 0 auto;
    box-shadow: 0px 2px 23px -16px rgba(0, 0, 0, .2);
    padding-top: 20px;
}

.header {
    height: 88px;
    line-height: 80px;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 999;
    transition: all .3s ease;
    background-color: #fff;
}

#logo {
    filter: drop-shadow(-138px 0px 0px #666);
    border-left: 138px solid transparent;
    margin-right: -138px;
    max-width: 100%;
}

.header-logo {
    width: 14.2%;
    display: inline-flex;
    align-items: center;
    height: 50%;
}

.close {
    padding: 15px;
}

.reg-title {
    font-size: 18px;
    text-align: center;
}

.reg-form {
    margin-top: 30px;
    padding: 0 20px 0 0;
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

.register {
    text-align: center;
}

.imgcode {
    cursor: pointer;
}

.reg-btn {
    height: 50px;
    line-height: 50px;
    margin-top: 30px;
}

.agree-check {
    text-align: left;

    margin:20px 0 20px 100px;
    
}

.agree-check >a   {
    font-size:12px;
    text-decoration:none;
}

.inner {
    font-size: 12px;
}

.agree-btn {
    text-align: center;
    margin-top: 20px;
}

.sendsms-btn {
    width: 100px;
    font-size: 12px;
}

.loginBox .el-dialog__body{
	 padding:0px;
}
.login-input .el-input__inner {
    height: 44px !important;
    line-height: 44px !important;
    padding-left: 10px !important;
}
.el-input--prefix .el-input__inner{
    padding-left: 20px;
    padding-right: 0;
}

.verify-line .el-input__inner {
    height: 44px !important;
    line-height: 44px !important;
}


/* 登录框样式 */
.login {

}

.login-title {
    font-size: 18px;
    text-align: center;
    display: flex;
    padding: 0 20px;
}
.login-title .logo-img a{
    height: 40px;
    line-height: 40px;
}

.logo-img {
    vertical-align: middle;
}

.login-title .logo-img img {
    width: 96px;
    vertical-align: middle;
    margin-top: 10px;
}

.login-name {
    line-height: 40px;
    vertical-align: middle;
    margin-left: 90px;
	color:#1e1e1e;
    font-size: 16px;
}

.login-form {
    margin-top: 17px;
    padding: 0 27px;
}

.login-inputtext {
	width:100%;
    border: none;
}

.login-vcode{
    width: 190px;
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

.register {
	
    height: 60px;
    line-height: 60px;
    display: flex;
    justify-content: space-between;
    background-color: #f0f6ff;
    padding: 0 20px;
}

.register span a {
    color: rgb(53, 135, 255);
    text-decoration: none;
}

</style>
<style>
   .reg-form .el-input>.el-input__inner{
       font-size:14px;
       font-family:"宋体";
    }
   .reg-form .el-input>.el-input__inner::-webkit-input-placeholder{
    
       color:#666
    }
    .loginBox .el-dialog{
        width: 356px !important;
    }
    .loginBox .el-dialog__body{
        width: 356px;
        padding: 0 ;
    }
    .loginBox .el-form-item__content{
        line-height: 42px;
    }
    .loginBox .el-input--prefix .el-input__inner{
        height: 42px;
        padding-left: 10px;
        color:#666;
    }
    .loginBox .el-input--prefix .el-input__inner::-webkit-input-placeholder{
            color:#666;
    }
    .loginBox .login-vcode.el-input--prefix .el-input__inner::-webkit-input-placeholder{
            color:rgb(212, 218, 227);
    }
    .el-checkbox__input.is-checked+.el-checkbox__label{
        color:#606266;
    }
    .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner{
        
    }
    .el-checkbox__inner::after{
        color:#606266;
    }
</style>