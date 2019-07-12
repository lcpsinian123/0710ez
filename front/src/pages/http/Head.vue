<template>
<div>
    <div class="header">
        <div class="header-w">
            <div class="header-logo">
                <img src="../../assets/logo_blue.png" title="http代理ip-logo" alt="logo-亿洲网络" style="width: 31.7%;">
                <div style="width: 68%; overflow:  hidden;">
                    <img id="logo" src="../../assets/logo_white.png" title="http代理ip-亿洲网络" alt="首页logo-亿洲网络">
                </div>
            </div>
            <span v-if="userInfo" style="float: right;margin-left: 1.5%;">
                <el-button style="background:  white;color: #147af0;border-radius: 4px;padding: 10px 12px;" type="primary" round @click="goCenter">{{userInfo.tel}}</el-button>
                <el-button style="border-radius: 4px;padding: 10px 12px;background-color: #147af0;border-color: #147af0;" type="primary" @click="logout" round>退出登录</el-button>
            </span>
            <span v-else style="float: right;margin-left: 1.5%;">
                <el-button style="background:  white;color: #147af0;border-radius: 4px;padding: 10px 12px;" type="primary" round @click="centerDialogVisible = true">登录</el-button>

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
                                    <el-form-item style='margin-bottom:10px;'>
                                        <div class="login-input">
                                            <el-input placeholder="用户名/手机号" prefix-icon="iconfont yz-mobile" v-model="items.username" class="login-inputtext">
                                            </el-input>
                                        </div>
                                    </el-form-item >
                                    <el-form-item style='margin-bottom:10px;'>
                                        <div class="login-input">
                                            <el-input placeholder="密码" prefix-icon="iconfont yz-password" v-model="items.pwd" type="password" class="login-inputtext">
                                            </el-input>
                                        </div>
                                    </el-form-item>

                                    <el-form-item style='margin-bottom:10px;' >
                                        <div class="verify-line">
                                            <el-input placeholder="图形验证码" prefix-icon="iconfont yz-password" v-model="items.imgcode" class="login-inputtext login-vcode" style="width: 190px; height:40px;margin-right:2px;">

                                            </el-input>
                                            <img :src="imgurl" @click="reload" class="imgcode" style="height: 42px; width: 100px;">
                                        </div>
                                    </el-form-item>

                                    <el-form-item style='margin-bottom:10px;' >
                                        <div class="forget-password">
                                            <el-checkbox v-model="checked">下次自动登录</el-checkbox>
                                        </div>
                                    </el-form-item>
                                    <el-form-item style='margin-bottom:10px;' >
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
                
                <el-button style=" margin-left:10px; border-radius: 4px;padding: 10px 12px;background-color: #147af0;border-color: #147af0;" type="primary" round @click="register">注册</el-button>
            </span>
            <ul>
                <li id="index">
                    <router-link to="/">首页</router-link>
                </li>
                <li id="bigdata">
                    <router-link to="/bigdata">大数据</router-link>
                </li>
                <li id="payshort">
                    <router-link to="/pay/payshort">定价</router-link>
                </li>
                <li id="getip">
                    <router-link to="/getip">提取IP</router-link>
                </li>
                <li id="company">
                    <router-link to="/company">企业通道</router-link>
                </li>
                <li id="about">
                    <router-link to="/about">关于我们</router-link>
                </li>
                <li id="help">
                    <router-link :to="{ path: '/help', query: { id: '16' }}">帮助中心</router-link>
                </li>
            </ul>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'Head',
    data() {
        return {
            userInfo: {},
			centerDialogVisible: false,
            items: {
                username: '',
                pwd: '',
                imgcode: ''
            },
            checked: '',

            imgurl: this.$config.userhost + 'Verify/entry'

        }
    },
    created: function () {
        this.userinfo = this.$http.get('http/index/head').then(
            response => {
                let res = response.data
                this.userInfo = res.data
            })
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
                                this.$router.replace('/')
                            }
                        })
                    }
                })
        },
        // login: function () {
        //     this.$router.push('/user/login');
        // },
        register: function () {
            this.$router.push('/user/reg')
        },
        goCenter: function () {
            this.$router.push('/ucenter/index')
        },
        close: function () {
            this.$router.replace('/')
        },
        login: function () {
            var _this = this
            if (this.items.username == '') {
                this.$message.error('用户名不能为空')
                return false;
            }
            if (this.items.pwd == '') {
                this.$message.error('密码不能为空')
                return false;
            }
            if (this.items.imgcode == '') {
                this.$message.error('验证码不能为空')
                return false;
            }
            var data = {
                username: this.items.username,
                password: this.items.pwd,
                checkcode: this.items.imgcode
            }
            this.$http.post(this.$config.userhost + 'login/checkLogin', this.$qs.stringify(data)).then(
                response => {
                    /*如果有来源登录成功返回来源*/
                    var res = response.data

                    if (res.state == 1) {
                        this.$message({
                            message: res.msg,
                            type: 'error'
                        });
                        this.imgurl = this.$config.userhost + 'Verify/entry?r=' + Math.random();
                    } else if (res.state == 0) {

                        localStorage.setItem('auth_data', JSON.stringify(res.data))
                        this.$router.replace('/ucenter/index')
                    }
                })

        },
        reload: function () {
            this.imgurl = this.$config.userhost + 'Verify/entry?r=' + Math.random();
        },
        openlogin: function () {

        }
    },
    mounted() {
        var route = this.$route.path
        var active = ''
        if (route == '/') {
            active = 'index'
        } else {
            var arr = route.split('/')
            active = arr[arr.length - 1]
        }
        $('#' + active).addClass('active')
        var localhosturl = window.location.href
        var arr = localhosturl.split('from=')
        if (arr[1] != "undefined") {
            var from = arr[1] ? arr[1] : ''
            let user_from = localStorage.getItem('user_from')
            if (this.$fun.isEmpty(user_from) || user_from == '') {
                localStorage.setItem('user_from', from)
            }
        }
        document.onscroll = function () {

            var height1 = $(document).scrollTop();
            if (height1 > 600) {
                $("#goTop").css("display", "block");
            } else {
                $("#goTop").css("display", "none");
            }
        }
    },
}
</script>
<style>
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
    
    .el-checkbox__label{
        font-size:12px;
    }
</style>
<style scoped>
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

.login {
    padding:0;
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

.imgcode {
    cursor: pointer;
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
    height: 100%;
}

.header-w {
    width: 75%;
    margin: 0 auto;
    height: 100%;
    position: relative;
    min-width: 960px;
}

.header-w img {
    display: inline-block;
    margin-right: 0;
    margin-top: 0;
    float: left;
    margin-left: 10px;
}

.header-w ul {
    list-style: none;
    float: right;
    padding: 0;
}

.header-w ul.getip {
    position: absolute;
    top: 70px;
    display: none;
    left: -40px;
}

.header-w ul.getip li {
    clear: both;
}

.header-w ul.getip li a {
    text-align: center;
    margin-left: 0;
    /* background-color: #147af0; */
    width: 110px;
    color: #ffffff;
    height: 50px;
    line-height: 50px;
}

.header-w ul.getip li a:hover {
    color: #cccccc;
}

.header-w ul li {
    float: left;
    margin-top: -10px;
    position: relative;
}

.header-w ul li.active a {
    border-bottom: 2px solid #0072FF;
}

.header-w .el-button a {
    color: white;
}

.header a {
    float: left;
    margin:0 1vw;
    width: 60px;
    height: 60px;
    display: block;
    text-align: center;
    font-size: 14px;
    color: #000;
    -webkit-transition: color .3s;
    transition: color .3s;
    background: transparent;
    text-decoration: none;
}


</style>
