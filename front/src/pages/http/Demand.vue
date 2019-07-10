<template>
	<div style="background-color: rgb(245, 246, 247);">
		<yz-header></yz-header>
		<div class="page-w">
			<div id="nav">
				<img src="../../assets/demand.jpg">
			</div>
			<div class="container" style="background-color:#f5f6f7;margin-top:-120px;">
				<div class="panel panel-default" style="background-color:#f5f6f7;">
					<div class="panel-heading">填写企业信息（
						<span>*</span>为必填项）</div>
					<div class="panel-body" style="background-color:#f5f6f7;">
						<form class="form-horizontal" enctype="multipart/form-data"  @submit.prevent="postform(this)">
							<div class="form-group">
								<label class="col-sm-2 control-label" for="company_name">您的称呼
									<span>*</span>
								</label>
								<div class="col-sm-8">
									<input v-model="form.nickname" data-rule="required;" class="form-control" type="text" name="company_name" id="company_name" placeholder="请填写您的称呼">
								</div>
							</div>
							<div class="form-group">
								<label class="col-sm-2 control-label" for="username">联系人姓名
									<span>*</span>
								</label>
								<div class="col-sm-8">
									<input v-model="form.username" data-rule="required;" class="form-control" type="text" id="username" name="username" placeholder="请填写联系人姓名">
								</div>
							</div>
							<div class="form-group">
								<label class="col-sm-2 control-label" for="phone_num">联系人手机
									<span>*</span>
								</label>
								<div class="col-sm-8">
									<input v-model="form.phone_num" data-rule="required;mobile;" class="form-control" type="text" id="phone_num" name="phone_num" placeholder="请填写联系人手机">
								</div>
							</div>
							<div class="form-group">
								<label class="col-sm-2 control-label" for="ip_purpose">电子邮箱
								</label>
								<div class="col-sm-8">
									<input v-model="form.email" data-rule="required;" class="form-control" type="text" id="email" name="email" placeholder="请填写电子邮箱">
								</div>
							</div>
							<div class="form-group">
								<label class="col-sm-3 control-label" for="position">要定制的应用类型
									<span>*</span>
								</label>
								<div class="col-sm-8">
									<select id="demand_style" name='demand_style' v-model="form.demands_type">
										<option value="1" selected="">数据采集和爬虫</option>
										<option value="2">数据标注</option>
										<option value="3">机器学习</option>
									</select>
								</div>
							</div>
							<div class="form-group">
								<label class="col-sm-2 control-label" for="time_interval">可接听时段</label>
								<div class="col-sm-8">
									<select id="can_call_type" name="can_call_type" v-model="form.call_call_type">
										<option value="1" selected="">工作日</option>
										<option value="2">工作日和休息日</option>
									</select>
									<select id="can_call_start" name="can_call_start" v-model="form.call_call_start">
										<option value="0">0点</option>
										<option value="1">1点</option>
										<option value="2">2点</option>
										<option value="3">3点</option>
										<option value="4">4点</option>
										<option value="5">5点</option>
										<option value="6">6点</option>
										<option value="7">7点</option>
										<option value="8" selected="">8点</option>
										<option value="9">9点</option>
										<option value="10">10点</option>
										<option value="11">11点</option>
										<option value="12">12点</option>
										<option value="13">13点</option>
										<option value="14">14点</option>
										<option value="15">15点</option>
										<option value="16">16点</option>
										<option value="17">17点</option>
										<option value="18">18点</option>
										<option value="19">19点</option>
										<option value="20">20点</option>
										<option value="21">21点</option>
										<option value="22">22点</option>
										<option value="23">23点</option>
									</select>
									至
									<select id="can_call_end" name="can_call_end" v-model="form.call_call_end">
										<option value="0">0点</option>
										<option value="1">1点</option>
										<option value="2">2点</option>
										<option value="3">3点</option>
										<option value="4">4点</option>
										<option value="5">5点</option>
										<option value="6">6点</option>
										<option value="7">7点</option>
										<option value="8">8点</option>
										<option value="9">9点</option>
										<option value="10">10点</option>
										<option value="11">11点</option>
										<option value="12">12点</option>
										<option value="13">13点</option>
										<option value="14">14点</option>
										<option value="15">15点</option>
										<option value="16">16点</option>
										<option value="17">17点</option>
										<option value="18" selected="">18点</option>
										<option value="19">19点</option>
										<option value="20">20点</option>
										<option value="21">21点</option>
										<option value="22">22点</option>
										<option value="23">23点</option>
									</select>
								</div>
							</div>
							<div class="form-group">
								<label class="col-sm-2 control-label" for="address">所在地</label>
								<div class="col-sm-8">
									<input v-model="form.address" class="form-control" type="text" id="address" name="address" placeholder="请填写所在地">
								</div>
							</div>
							<div class="form-group">
								<label class="col-sm-2 control-label" for="beizhu">其他备注信息
								</label>
								<div class="col-sm-8">
									<textarea v-model="form.beizhu" class="form-control" rows="3" id="beizhu" name="beizhu" placeholder="请输入备注信息，方便我们理解您的需求和评估定制费用"></textarea>
								</div>
							</div>
							<div class="form-group">
								<div class="col-sm-offset-2 col-sm-1">
									<button type="submit" class="btn btn-primary company_post">提交</button>
								</div>
								<div class="col-sm-1" style="margin-left: 30px;">
									<button type="reset" class="btn btn-primary">重置</button>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
			<div>
				<img src="../../assets/about_bg.gif">
			</div>
		</div>
		<yz-footer></yz-footer>
	</div>
</template>

<script>
	import header from '../http/Head'
	import footer from '../http/Footer'
	export default {
		name: 'Login',
		components: {
			'yz-header': header,
			'yz-footer': footer
		},
		data(){
			return{
				form:{
					'nickname' : '',
					'username' : '',
					'phone_num' : '',
					'email' : '',
					'demands_type' : '1',
					'call_call_type' : '1',
					'call_call_start' : '9',
					'call_call_end' : '18',
					'address' : '',
					'beizhu' : '',
				},
			}
		},
		methods:{
			postform:function(){
				this.$http.post('/http/big_data/add',this.$qs.stringify(this.form)).then(
					response => {
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
							this.$router.push('/bigdata')
						}
					})
			},
		}
	}
</script>


<style scoped>
	@import url('../../assets/css/bootstrap.min.css');
	.page-w {
		width: 100% !important;
		margin-top: 60px;
	}

	#nav {
		margin-top: 80px;
	}

	.panel span {
		color: red;
	}

	.panel {
		border: 0 !important;
		margin: 50px auto;
		width: 90%;
	}

	.container input {
		width: 50%;
	}

	.panel button {
		border-radius: 18px;
		width: 90px;
		background-color: #1084fe;
	}

	.container form .form-group {
		margin-top: 30px;
	}

	.container {
		min-height: 600px;
		margin-bottom: 150px;
	}

	.container .panel {
		margin: 150px auto;
		width: 90%;
	}

	.container form {
		margin: 50px 0 0 150px;
	}
</style>
