<template>
	<div>
		<yz-header></yz-header>
		<div class="page-w">
			<div style="height: 20px;"></div>
			<div class="container">
				<yz-user-left></yz-user-left>
				<div class="user-right">
					<el-card class="box-card">
						<h2 class="head">个人认证</h2>
						<form enctype="multipart/form-data" action="#" method="post" name="form1" @submit.prevent="checkform(this)">
			<input type="hidden" name="csrfmiddlewaretoken" value="d95187df0ab83c9f4e85ed89422838fd">
			<div class="group clearfix group1">
				<label>认证账号</label>
				<span id="account"><input type="text" v-model="user.username" disabled></span>
			</div>
			<div class="group clearfix">
				<label for="real_name">真实姓名</label>
				<input type="text"  id="real_name" name="realname" @change="checkname()">
				<span class="p-blue">认证成功后默认作为发票开票抬头</span>
				<span class="nameError" id="nameSpanError" style="display:none;">错误：姓名不合法</span>
			</div>
			<div class="group clearfix">
				<label for="rzphonenumber">手机号码</label>
				<input type="text"  maxlength="11" id="rzphonenumber" name="rzphonenumber" onkeyup="this.value=this.value.replace(/[^0-9]/g,'')" onafterpaste="this.value=this.value.replace(/[^0-9]/g,'')" @change="checkphone()">
				<span class="p-blue">请填写真实的手机号码</span>
				<span class="phoneError" id="phoneSpanError" style="display:none;">错误：请输入正确的手机号码</span>
			</div>
			<div class="group clearfix">
				<label for="address">联系地址</label>
				<input type="text"  id="address" name="address" placeholder="请详细到门牌号码">
				<span class="p-blue">用于接收发票及合同</span>
			</div>
			<div class="group clearfix">
				<label for="id_num">身份证号码</label>
				<input type="text"  id="id_num" name="idcardnum" @change="checkID()">
				<span class="phoneError" id="idNumSpanError" style="display:none;">错误：请输入正确的证件号码</span>
			</div>
			<div class="group clearfix photo">
				<label>身份证正面照片</label>
				<div class="fileinput fileinput-new" data-provides="fileinput" id="exampleInputUpload">
						<div>
							<input type="text" value="" id="grphotozm" name="grphotozm" class="form-control" readonly="readonly">
							<br>
							<span class="btn btn-primary btn-file">	
								<input type="file" name="grphotozm1" id="picID1" accept="image/gif,image/jpeg,image/x-png" @change="(value,value1)=>checkphoto('picID1','grphotozm')">
								<span class="fileinput-new">选择文件</span>
								<span class="fileinput-exists">换一张</span>
							</span>
							<p class="clearfix">*请上传手持真实有效的身份证及护照扫描件、照片的正面,确保证件内容和脸部清晰可见，文件仅支持2M以内的jpg，jpeg，png或gif。Mac苹果用户请使用firefox火狐浏览器进行上传</p>
							<a @click="(value)=>removePhoto('grphotozm')" class="btn btn-warning fileinput-exists" data-dismiss="fileinput">移除</a>
						</div>
						<div class="fileinput-new thumbnail">
							<img id="picImg" style="width: 300px;height: 200px;" src="../../assets/zhengmian.jpg" alt="身份证正面照片">
						</div>
						<div class="fileinput-preview fileinput-exists thumbnail"></div>
					</div>
			</div>
			<div class="group clearfix photo">
				<label>身份证反面照片</label>
				<div class="fileinput fileinput-new" data-provides="fileinput" id="exampleInputUpload">
						<div>
							<input type="text" value="" id="grphotofm" name="grphotofm" class="form-control" readonly="readonly">
							<br>
							<span class="btn btn-primary btn-file">	
								<input type="file" name="grphotofm2" id="picID2" accept="image/gif,image/jpeg,image/x-png"@change="(value,value1)=>checkphoto('picID2','grphotofm')">
								<span class="fileinput-new">选择文件</span>
								<span class="fileinput-exists">换一张</span>
							</span>
							<p class="clearfix">*请上传手持真实有效的身份证及护照扫描件、照片的正面,确保证件内容和脸部清晰可见，文件仅支持2M以内的jpg，jpeg，png或gif。Mac苹果用户请使用firefox火狐浏览器进行上传</p>
							<a @click="(value)=>removePhoto('grphotofm')" class="btn btn-warning fileinput-exists" data-dismiss="fileinput">移除</a>
						</div>
						<div class="fileinput-new thumbnail">
							<img id="picImg" style="width: 300px;height: 200px;" src="../../assets/fanmian.jpg" alt="身份证反面照片">
						</div>
						<div class="fileinput-preview fileinput-exists thumbnail"></div>
					</div>
			</div>  
			<!-- <div class="group clearfix photo">
				<label>身份证手持照片</label>
				<div class="fileinput fileinput-new" data-provides="fileinput" id="exampleInputUpload">
						<div>
							<input type="text" value="" id="grphotosc" name="grphotosc" class="form-control" readonly="readonly">
							<br>
							<span class="btn btn-primary btn-file">	
								<input type="file" name="grphotosc3" id="picID3" accept="image/gif,image/jpeg,image/x-png" @change="(value,value1)=>checkphoto('picID3','grphotosc')">
								<span class="fileinput-new">选择文件</span>
								<span class="fileinput-exists">换一张</span>
							</span>
							<p class="clearfix">*请上传手持真实有效的身份证及护照扫描件、照片的正面,确保证件内容和脸部清晰可见，文件仅支持2M以内的jpg，jpeg，png或gif。Mac苹果用户请使用firefox火狐浏览器进行上传</p>
							<a @click="(value)=>removePhoto('grphotosc')" class="btn btn-warning fileinput-exists" data-dismiss="fileinput">移除</a>
						</div>
						<div class="fileinput-new thumbnail">
							<img id="picImg" style="width: 200px;height: 262px;" src="../../assets/shenfenzheng-img.png" alt="身份证手持照片">
						</div>
						<div class="fileinput-preview fileinput-exists thumbnail"></div>
					</div>
			</div> -->
			<button type="submit" class="btn btn-primary personsubmit" style="margin-left:150px;width:100px;margin-bottom:50px;" @>提交</button>
		</form>
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
	import {jquery} from '../../assets/js/jquery.min.js'
	import {bootstrap_min} from '../../assets/js/bootstrap.min.js'
	import {bootstrap_fileinput} from '../../assets/js/bootstrap-fileinput.js'
	export default {
		name: 'Login',
		components: {
			'yz-header': header,
			'yz-user-left': left,
			'yz-footer': footer
		},
		data(){
			return{
				files:[],
				person:{
					'realname':'',
					'address':'',
					'idcard':'',
				},
				user:{
					'tel':'',
				},
				auditorperson:null
			}
		},
		metaInfo: {
			title: '申请个人认证-亿洲网络', // set a title
		},
		created: function() {
			this.$http.get('/http/Authentication/auditorinfo', {
			}).then(
				response => {
					var res = response.data
					this.user = res.data.userinfo
					this.person = res.data.auditorperson ? res.data.auditorperson : this.person
					this.auditorperson = res.data.auditorperson
					if(this.auditorperson != null){
						this.$alert('你已申请过个人认证，请勿重复申请！', '提示', {
							confirmButtonText: '确定',
							callback: action => {
								this.$router.replace('/ucenter/auditor')
							}
						}
						)
					}
				})
		},
		methods:{
			//姓名正则验证
			checkname:function(){
				var real_name=document.getElementById("real_name");
				var nameCheck=/^([\u4e00-\u9fa5\·]{1,10})$/;
				var nameError=document.getElementById("nameSpanError");
				if(!nameCheck.test(real_name.value)){
					nameError.style.display="inline";
				}else{
					nameError.style.display="none";
				}
			},
			//手机正则验证
			checkphone:function(){
				var rzphonenumber=document.getElementById("rzphonenumber");
				var phoneCheck=/^[1][3,4,5,7,8][0-9]{9}$/;
				var phoneError=document.getElementById("phoneSpanError");
				if(!phoneCheck.test(rzphonenumber.value)){
						phoneError.style.display="inline";
					}else{
						phoneError.style.display="none";
					}
			},
			//身份证正则验证
			checkID:function(){
				var id_num=document.getElementById("id_num");
				var IDCheck=/^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|31)|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}([0-9]|x|X)$/;
				var IDError=document.getElementById("idNumSpanError");
				if(!IDCheck.test(id_num.value)){
						IDError.style.display="inline";
					}else{
						IDError.style.display="none";
					}
			},
			//表单验证
			checkform:function(){
				var nameError=document.getElementById("nameSpanError");
				var IDError=document.getElementById("idNumSpanError");
				var phoneError=document.getElementById("phoneSpanError");
				var account = document.getElementById("account").innerText;
					//真实姓名
					if(form1.realname.value==""){
						form1.realname.focus();
						form1.realname.select();
						return false;
					}//手机号码
					if(form1.rzphonenumber.value==""){
						form1.rzphonenumber.focus();
						form1.rzphonenumber.select();
						return false;
					}//联系地址
					if(form1.address.value==""){
						form1.address.focus();
						form1.address.select();
						return false;
					}//身份证号码
					if(form1.idcardnum.value==""){
						form1.idcardnum.focus();
						form1.idcardnum.select();
						return false;
					}//正面照片//反面照片//手持照片//||form1.grphotosc.value==""
					if(form1.grphotozm.value==""||form1.grphotofm.value==""){
						form1.grphotozm.focus();
						form1.grphotozm.select();
						this.$message({
							message: "请上传身份证正面、反面、手持照片",
							type: 'error'
						});
						return false;
					}
					if(nameError.style.display=="inline"){
						form1.username.focus();
						form1.username.select();
						return false;
					}else if(phoneError.style.display=="inline"){
						form1.rzphonenumber.focus();
						form1.rzphonenumber.select();
						return false;
					}else if(IDError.style.display=="inline"){
						form1.identitycard.focus();
						form1.identitycard.select();
						return false;
					}
				var photos = [];
				for(var i =0;i<this.files.length;i++){
					photos.push(this.files[i]['result'])
				}
				var data = {
					account:account,
					name:form1.realname.value,
					phone:form1.rzphonenumber.value,
					address:form1.address.value,
					idcard:form1.idcardnum.value,
					files:photos
				}
				this.$http.post(this.$config.host+'http/Authentication/addperson',this.$qs.stringify(data)).then(
									response => {
										/*如果有来源登录成功返回来源*/
										var res = response.data
				
										if(res.state == 1) {
											this.$message({
												message: res.msg,
												type: 'error'
											});
										} else if(res.state == 0) {
											this.$message({
												message: res.msg,
												type: 'success'
											});
											this.$router.push('/ucenter/auditor')
										}
									})
			},
			//移除照片
			removePhoto:function(value){
				var path = document.getElementById(value).value;
				var photoname_arr = new Array();
				photoname_arr = path.split('\\');
				var photoname = photoname_arr[photoname_arr.length-1]
				for(var i =0;i<this.files.length;i++){
					if(this.files[i]['name']==photoname){
						this.files.splice(i,1);
					}
				}
				document.getElementById(value).value='';
			},
			//上传照片验证
			checkphoto:function(value,value1){
						var path = $("input[id='"+value+"']").val(),  
						file = document.getElementById(value),
						extStart = path.lastIndexOf('.'),  
						ext = path.substring(extStart,path.length).toUpperCase(); 
						//判断图片格式  
				if(path.length>0){
						if(ext !== '.PNG' && ext !== '.JPG' && ext !== '.JPEG' && ext !== '.GIF'){  
								alert('请上传正确格式的图片');  
								file.value='';
								return false;  
						}
				}
				this.files.push(file.files[0]) //提交的图片
						//获取图片大小，注意使用this，而不是$(this)  
						var size = file.files[0].size / 1024;  
						if(size > 1024){  
								alert('图片大小不能超过1M'); 
								file.value='';
								return false;  
						}else{
					$('#'+value1).val(path);
				}
			} 
		}
	}
</script>

<style scoped>
	@import url('../../assets/css/bootstrap.min.css');
	@import url('../../assets/css/bootstrap-fileinput.css');
	.page-w{
		margin-top:100px ;
		width: 100%;
		height: 1200px;
		background-color: #f5f6f7;
	}
	.container{
		width: 1300px;
		height: 900px;
		margin: 0 auto;
		
	}
	.user-right{
		padding: 0 20px;
		border:0 !important;
		background-color: #f5f6f7;
	}

	.head{
		font-weight: bold;
		text-align: center;
		color:#007efc;
		margin-bottom: 20px;
	}
	.group{
		line-height: 36px;
		margin-bottom: 20px;
		position: relative;
		font-size: 14px;
		font-weight: normal;
		font-family: "microsoft yahei";
	}
	.group label{
		float: left;
		width: 115px;
		line-height: 36px;
		text-align: right;
		margin-right: 10px;
		display: inline-block;
		margin-bottom: 5px;
		font-weight: bold;
	}
	.group input{
		width: 420px;
		margin-right: 20px;
		font-family: inherit;
		font-size: inherit;
		line-height: inherit;
	}
	.group .p-blue{
		color: #84929b;
	}
	.nameError, .phoneError{
		color: #df2d3d !important;
		font-size: 12px;
		line-height: 16px !important;
		padding-left: 20px;
		position: absolute;
		top: 45px;
		left: 125px;
	}
	.photo p{
		color: #84929b;
		position: absolute;
		left: 574px;
		top: 0;
		width: 300px;
	}
</style>
