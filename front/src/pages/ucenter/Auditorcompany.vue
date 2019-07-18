<template>
	<div>
		<yz-header></yz-header>
		<div class="page-w">
			<div style="height: 20px;"></div>
			<div class="container">
				<yz-user-left></yz-user-left>
				<div class="user-right">
					<el-card class="box-card">
						<h2 class="head">企业认证</h2>
						<form enctype="multipart/form-data" name="form1" action="#" method="post" @submit.prevent="checkform(this)">
							<input type="hidden" name="csrfmiddlewaretoken" value="9de1178ceb28e4735960a75ffb469e39">
							<div class="group clearfix">
								<label for="qiyename">企业名称</label>
								<input type="text" id="qiyename" name="qiyename">
								<span class="p-blue">请填写真实的公司名称</span>
							</div>
							<div class="group clearfix">
								<label for="qylianxiren">联系人</label>
								<input type="text"  id="qylianxiren" name="qylianxiren" @change="checkname()">
								<span class="p-blue">请填写公司联系人</span>
								<span class="error" id="qylianxirenSpanError" style="display:none;">错误：姓名不合法</span>
							</div>
							<div class="group clearfix">
								<label for="rzphonenumber">手机号</label>
								<input type="text"  id="rzphonenumber" name="rzphonenumber" maxlength="11" onkeyup="this.value=this.value.replace(/[^0-9]/g,'')"
									onafterpaste="this.value=this.value.replace(/[^0-9]/g,'')" @change="checkphone()">
								<span class="p-blue">请填写真实的手机号码</span>
								<span class="error" id="phoneSpanError" style="display:none;">错误：请输入正确的手机号码</span>
							</div>
							<div class="group clearfix">
								<label for="identitycard">身份证号</label>
								<input type="text"  id="identitycard" name="identitycard" @change="checkID()">
								<span class="p-blue">请填写公司联系人的真实身份证号</span>
								<span class="error" id="idnumSpanError" style="display:none;">错误：请输入正确的证件号码</span>
							</div>
							<div class="group clearfix">
								<div class="linkage" id="linkage">
									<el-select  @change="choseProvince" placeholder="省级地区">
										<el-option v-for="item in province" :key="item.id" :label="item.value" :value="item.id">
										</el-option>
									</el-select>
									<el-select  @change="choseCity" placeholder="市级地区">
										<el-option v-for="item in shi1" :key="item.id" :label="item.value" :value="item.id">
										</el-option>
									</el-select>
									<el-select  @change="choseBlock" placeholder="区级地区">
										<el-option v-for="item in qu1" :key="item.id" :label="item.value" :value="item.id">
										</el-option>
									</el-select>
								</div>
								<span class="error" id="diquSpanError" style="display:none;">错误：请选择地区</span>
							</div>
							<div class="group clearfix">
								<label for="address">联系地址</label>
								<input type="text"  id="address" name="address" placeholder="请详细到门牌号码">
								<span class="p-blue">用于接收发票及合同</span>
							</div>
							<div class="group clearfix">
								<label for="yingye_num">营业执照号码</label>
								<input type="text"  id="yingye_num" name="yingye_num" @change="checknumber()">
								<span class="p-blue">企业统一社会信用代码</span>
								<span class="error" id="yingyeSpanError" style="display:none;">错误:营业执照号码不合法</span>
							</div>
							<div class="group clearfix photo">
								<label>营业执照</label>
								<div class="fileinput fileinput-new" data-provides="fileinput" id="exampleInputUpload">
									<div>
										<input type="text" value="" id="qyphoto" name="qyphoto" class="form-control" readonly="readonly">
										<br>
										<span class="btn btn-primary btn-file">
											<input type="file" name="qyphoto1" id="picID1" accept="image/gif,image/jpeg,image/x-png" @change="(value,value1)=>checkphoto('picID1','qyphoto')">
											<span class="fileinput-new">选择文件</span>
											<span class="fileinput-exists">换一张</span>
										</span>
										<p class="clearfix">*1、必须使用身份证原件拍照；
											<br>2、可标注水印，但是不能有遮挡；
											<br>3、单个照片建议小于2MB，仅支持JPG、PNG、jpeg、gif格式。</p>
										<a @click="(value)=>removePhoto('qyphoto')" class="btn btn-warning fileinput-exists" data-dismiss="fileinput">移除</a>
									</div>
									<div class="fileinput-new thumbnail">
										<img id="picImg" style="width: 200px;height: 262px;" src="../../assets/yingyezhizhao.jpg" alt="营业执照">
									</div>
									<div class="fileinput-preview fileinput-exists thumbnail"></div>
								</div>
							</div>
							<div class="group clearfix photo">
								<label style="font-size:12px;">法人身份证正面照片</label>
								<div class="fileinput fileinput-new" data-provides="fileinput" id="exampleInputUpload">
									<div>
										<input type="text" value="" id="qyfrzmphoto" name="qyfrzmphoto" class="form-control" readonly="readonly">
										<br>
										<span class="btn btn-primary btn-file">
											<input type="file" name="qyfrzmphoto2" id="picID2" accept="image/gif,image/jpeg,image/x-png" @change="(value,value1)=>checkphoto('picID1','qyfrzmphoto')">
											<span class="fileinput-new">选择文件</span>
											<span class="fileinput-exists">换一张</span>
										</span>
										<p class="clearfix">*1、必须使用身份证原件拍照；
											<br>2、可标注水印，但是不能有遮挡；
											<br>3、单个照片建议小于2MB，仅支持JPG、PNG、jpeg、gif格式。</p>
										<a @click="(value)=>removePhoto('qyfrzmphoto')" class="btn btn-warning fileinput-exists" data-dismiss="fileinput">移除</a>
									</div>
									<div class="fileinput-new thumbnail">
										<img id="picImg" style="width: 300px;height: 200px;" src="../../assets/zhengmian.jpg" alt="法人身份证正面照片">
									</div>
									<div class="fileinput-preview fileinput-exists thumbnail"></div>
								</div>
							</div>
							<button type="submit" class="btn btn-primary" style="margin-left:150px;width:100px;margin-bottom:50px;">提交</button>
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
	// import {cityPicker} from '../../assets/js/cityPicker-1.1.5.js'
	//import {authcompany} from '../../assets/js/authcompangy.js'
	export default {
		name: 'Login',
		components: {
			'yz-header': header,
			'yz-user-left': left,
			'yz-footer': footer
		},
		data() {
			return {
				province: '',
				sheng: '',
				shi: '',
				shi1: [],
				qu: '',
				qu1: [],
				city: '',
				block: '',
				files:[],
				company:{
					'companyname' :'',
					'lxr' : '',
					'lxr_tel':'',
					'idCard' : '',
					'address' : '',
					'companyCard':'',
				},
				auditorcompany:null
			}
		},
		metaInfo: {
			title: '申请企业认证-亿洲网络', // set a title
		},
		created: function() {
			this.getCityData()
			this.$http.get('/http/Authentication/auditorinfo', {
			}).then(
				response => {
					let res = response.data
					this.company = res.data.auditorcompany ? res.data.auditorcompany : this.company
					this.auditorcompany = res.data.auditorcompany
					if(this.auditorcompany != null){
						this.$alert('你已申请过企业认证，请勿重复申请！', '提示', {
							confirmButtonText: '确定',
							callback: action => {
								this.$router.push('/ucenter/auditor')
							}
						}
						)
					}
					var company_diqu = this.company.diqu.split('_')
					this.sheng = company_diqu[0]
					this.shi = company_diqu[1]
					this.qu = company_diqu[2]
				})
		},
		methods: {
			// 加载china地点数据，三级
			getCityData: function () {
				var that = this
				this.$http.get(this.$config.mapjson).then(function (response) {
					if (response.status == 200) {
						var data = response.data
						console.log(data)
						that.province = []
						that.city = []
						that.block = []
						// 省市区数据分类
						for (var item in data) {
							if (item.match(/0000$/)) { //省
								that.province.push({
									id: item,
									value: data[item],
									children: []
								})
							} else if (item.match(/00$/)) { //市
								that.city.push({
									id: item,
									value: data[item],
									children: []
								})
							} else { //区
								that.block.push({
									id: item,
									value: data[item]
								})
							}
						}
						// 分类市级
						for (var index in that.province) {
							for (var index1 in that.city) {
								if (that.province[index].id.slice(0, 2) === that.city[index1].id.slice(0, 2)) {
									that.province[index].children.push(that.city[index1])
								}
							}
						}
						// 分类区级
						for (var item1 in that.city) {
							for (var item2 in that.block) {
								if (that.block[item2].id.slice(0, 4) === that.city[item1].id.slice(0, 4)) {
									that.city[item1].children.push(that.block[item2])
								}
							}
						}
					} else {
						console.log(response.status)
					}
				}).catch(function (error) {
					console.log(typeof + error)
				})
			},
			// 选省
			choseProvince: function (e) {
				for (var index2 in this.province) {
					if (e === this.province[index2].id) {
						this.sheng = this.province[index2].value
						this.shi1 = this.province[index2].children
						this.shi = this.province[index2].children[0].value
						this.qu1 = this.province[index2].children[0].children
						this.qu = this.province[index2].children[0].children[0].value
						//this.E = this.qu1[0].id
					}
				}
			},
			// 选市
			choseCity: function (e) {
				for (var index3 in this.city) {
					if (e === this.city[index3].id) {
						this.shi = this.city[index3].value
						this.qu1 = this.city[index3].children
						this.qu = this.city[index3].children[0].value
						//this.E = this.qu1[0].id
						//console.log(this.E)
					}
				}
			},
			// 选区
			choseBlock: function (e) {
				for (var index4 in this.block) {
					if (e === this.block[index4].id) {
						this.qu = this.block[index4].value
						//this.E = this.qu1[0].id
						//console.log(this.E)
					}
				}
				
			},
			//姓名正则验证
			checkname: function () {
				var qylianxiren = document.getElementById("qylianxiren");
				var nameCheck = /^([\u4e00-\u9fa5\·]{1,10})$/;
				var nameError = document.getElementById("qylianxirenSpanError");
				if (!nameCheck.test(qylianxiren.value)) {
					nameError.style.display = "inline";
				} else {
					nameError.style.display = "none";
				}
			},
			//手机正则验证
			checkphone: function () {
				var rzphonenumber = document.getElementById("rzphonenumber");
				var phoneCheck = /^[1][3,4,5,7,8][0-9]{9}$/;
				var phoneError = document.getElementById("phoneSpanError");
				if (!phoneCheck.test(rzphonenumber.value)) {
					phoneError.style.display = "inline";
				} else {
					phoneError.style.display = "none";
				}
			},
			//身份证正则验证
			checkID: function () {
				var identitycard = document.getElementById("identitycard");
				var IDCheck =
					/^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|31)|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}([0-9]|x|X)$/;
				var IDError = document.getElementById("idnumSpanError");
				if (!IDCheck.test(identitycard.value)) {
					IDError.style.display = "inline";
				} else {
					IDError.style.display = "none";
				}
			},
			//营业执照正则验证
			checknumber: function () {
				var yingye_num = document.getElementById("yingye_num");
				var yingyeCheck = /^[A-Za-z0-9]+$/;
				var yingyeError = document.getElementById("yingyeSpanError");
				if (!yingyeCheck.test(yingye_num.value)) {
					yingyeError.style.display = "inline";
				} else {
					yingyeError.style.display = "none";
				}
			},
			//表单验证
			checkform: function () {
				var nameError = document.getElementById("qylianxirenSpanError");
				var IDError = document.getElementById("idnumSpanError");
				var phoneError = document.getElementById("phoneSpanError");
				var yingyeError = document.getElementById("yingyeSpanError");
				var diquError = document.getElementById("diquSpanError");
				if (form1.qiyename.value == "") {
					form1.qiyename.focus();
					form1.qiyename.select();
					return false;
				}
				if (form1.qylianxiren.value == "") {
					form1.qylianxiren.focus();
					form1.qylianxiren.select();
					return false;
				}
				if (form1.rzphonenumber.value == "") {
					form1.rzphonenumber.focus();
					form1.rzphonenumber.select();
					return false;
				}
				if (form1.identitycard.value == "") {
					form1.identitycard.focus();
					form1.identitycard.select();
					return false;
				}
				if (this.sheng=='') {
					diquError.style.display = "inline";
					location.href = "#linkage"
					return false;
				} else {
					diquError.style.display = "none";
				}
				if (form1.address.value == "") {
					form1.address.focus();
					form1.address.select();
					return false;
				}
				if (form1.yingye_num.value == "") {
					form1.yingye_num.focus();
					form1.yingye_num.select();
					return false;
				} //||form1.qyfrfmphoto.value==""
				if (form1.qyphoto.value == "" || form1.qyfrzmphoto.value == "") {
					form1.qyphoto.focus();
					form1.qyphoto.select();
					this.$message({
						message: "请上传营业执照及身份证正面照",
						type: 'error'
					});
					return false;
				}
				if (nameError.style.display == "inline") {
					form1.qylianxiren.focus();
					form1.qylianxiren.select();
					return false;
				} else if (phoneError.style.display == "inline") {
					form1.rzphonenumber.focus();
					form1.rzphonenumber.select();
					return false;
				} else if (IDError.style.display == "inline") {
					form1.identitycard.focus();
					form1.identitycard.select();
					return false;
				} else if (yingyeError.style.display == "inline") {
					form1.yingye_num.focus();
					form1.yingye_num.select();
					return false;
				}
				var photos = [];
				for(var i =0;i<this.files.length;i++){
					photos.push(this.files[i]['result'])
				}
			var data = {
				qiyename:form1.qiyename.value,
				lianxiren:form1.qylianxiren.value,
				phone:form1.rzphonenumber.value,
				idcard:form1.identitycard.value,
				sheng:this.sheng,
				shi:this.shi,
				qu:this.qu,
				address:form1.address.value,
				yingyenum:form1.yingye_num.value,
				files:photos
			}
			console.log(data)
			this.$http.post(this.$config.host+'http/Authentication/addcompany',this.$qs.stringify(data)).then(
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
			checkphoto: function (value, value1) {
				var path = $("input[id='" + value + "']").val(),
					file = document.getElementById(value),
					extStart = path.lastIndexOf('.'),
					ext = path.substring(extStart, path.length).toUpperCase();
				//判断图片格式  
				if (path.length > 0) {
					if (ext !== '.PNG' && ext !== '.JPG' && ext !== '.JPEG' && ext !== '.GIF') {
						alert('请上传正确格式的图片');
						file.value = '';
						return false;
					}
				}
				this.files.push(file.files[0]) //提交的图片
				//获取图片大小，注意使用this，而不是$(this)  
				var size = file.files[0].size / 1024;
				if (size > 1024) {
					alert('图片大小不能超过1M');
					file.value = '';
					return false;
				} else {
					$('#' + value1).val(path);
				}
			}
		},
	}
</script>

<style scoped>
	@import url('../../assets/css/bootstrap.min.css');
	@import url('../../assets/css/bootstrap-fileinput.css');
	/* @import url('../../assets/css/city-picker.css'); */
	.page-w{
		margin-top:100px ;
		width: 100%;
		height: 1380px;
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
		background-color: #f5f6f7;
	}
	.head {
		font-weight: bold;
		text-align: center;
		color:#007efc;
		margin-bottom: 20px;
	}

	.group {
		line-height: 36px;
		margin-bottom: 20px;
		position: relative;
		font-size: 14px;
		font-weight: normal;
		font-family: "microsoft yahei";
	}

	.group label {
		float: left;
		width: 115px;
		line-height: 36px;
		text-align: right;
		margin-right: 10px;
		display: inline-block;
		margin-bottom: 5px;
		font-weight: bold;
	}

	.group input {
		width: 420px;
		margin-right: 20px;
		font-family: inherit;
		font-size: inherit;
		line-height: inherit;
	}

	.group .p-blue {
		color: #84929b;
	}

	.nameError,
	.phoneError {
		color: #df2d3d !important;
		font-size: 12px;
		line-height: 16px !important;
		padding-left: 20px;
		position: absolute;
		top: 45px;
		left: 125px;
	}

	.photo p {
		color: #84929b;
		position: absolute;
		left: 574px;
		top: 0;
		width: 300px;
	}
	.linkage{
		margin-left:50px;
	}
	.error{
		color: #df2d3d !important;
		font-size: 12px;
		line-height: 16px !important;
		padding-left: 20px;
		position: absolute;
		top: 45px;
		left: 125px;
	}
</style>
