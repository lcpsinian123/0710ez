<template>
	<div>
		<yz-header></yz-header>
		<div class="page-w">
			<div style="height: 60px;"></div>
			<div class="user-right">
				<div class="el-tabs-f">
					<el-tabs type="border-card" stretch="stretch" @tab-click="hiddenPay()">
						<el-tab-pane>
							<span slot="label"><i class="iconfont icon-card"></i> 充值方式购买</span>
							<h2>充值购买  
							</h2>
							<p>
								<span style="font-weight: 700;">余额仅用于提取代理ip,如需给亿洲旗下vpn等其他产品充值请联系销售</span><br>
								选择充值提取,使用余额方式提取ip,余额没有使用时间限制,可自由选择提取类别,<br>
								用多少扣多少,更灵活的控制消费,适合业务灵活型个人用户
							</p>
							<el-button class="button"><a data-toggle="modal" data-target="#customer-dialog" href="#" style="text-decoration:none;color: #606266;">立即咨询</a></el-button>
							<hr>
							<h3>产品特性 </h3>
							<input type="checkbox" id="fold" style="opacity: 0;position: absolute;z-index: 100;width: 24px;height: 24px;">
							<i class="el-icon-caret-top" style="color:#087af0;"></i>
							<ul>
								<li>每日IP存量：300-400万左右</li>
								<li>提取间隔：无限制</li>
								<li>并发调用：支持多机器多线程</li>
								<li>单次可提取IP量：200/次</li>
								<li>代理类型：http/https/socks5</li>
								<li>有效率：99%<el-tooltip content="平均ip有效率,您在单次或者单地区的提取中可能略低于或高于此数值" placement="right" effect="light"><i class="el-icon-question"></i></el-tooltip>
								</li>
								<li>私密性：一手真实ip</li>
								<li>匿名度：高匿名</li>
								<li>覆盖地区：全国</li>
								<li>IP时长：<el-tooltip content="最长可用时间:提取后我们设置的可以供您使用的时间,由于各家电信服务商IP机制,网络波动等不可控因素,可能存在少量提前失效的IP,因为是不可控因素我们只能给出实测平均值参考:
						总体提前失效率小于10%,一半时间前失效率小于5%,您在单次提取的ip提前失效率可能会超出这个范围"
									 placement="right" effect="light"><i class="el-icon-question"></i></el-tooltip>
									<ul>
										<li style="margin: 10px 0;">1分钟 ：原价 <span class="money">0.006</span>/个</li>
										<li style="margin: 10px 0;">5分钟 ：原价 <span class="money">0.010</span>/个</li>
										<li>25分钟：原价 <span class="money">0.020</span>/个</li>
									</ul>
								</li>
							</ul>
							<hr>
							<h3>充值定制</h3>
							<el-row>
								<el-col>&nbsp;</el-col>
								<el-col :span="3">充值方式</el-col>
								<el-col :span="8">
									<el-radio-group v-model="rechargeway" size="medium" @change="(value)=>switchWay(value)">
										<el-radio label="1" border>直接充值</el-radio>
										<el-radio label="2" border>按量估算</el-radio>
									</el-radio-group>
								</el-col>
							</el-row>
							<div class="num_way" v-show="num_way">
								<el-form :model="ruleForm3" status-icon :rules="rules3" ref="ruleForm3" label-width="120px" class="demo-ruleForm"
								 style="margin-top:30px;">
									<el-form-item v-for="(time,index) in timelongList" :label="taocanName(time.name)" :prop="propName(index)" :key="time.alias_id">
										<el-input v-model.number="ruleForm3.minute[index]"></el-input>
									</el-form-item>
									<el-form-item>
										<el-button type="primary" @click="submitNumway('ruleForm3')">计算价格成本</el-button>
										<el-button @click="resetForm('ruleForm3')">重置</el-button>
									</el-form-item>
								</el-form>
							</div>
							<div class="money_way" v-show="money_way">
								<el-form :model="ruleForm4" status-icon :rules="rules4" ref="ruleForm4" label-width="120px" class="demo-ruleForm"
								 style="margin-top:30px;">
									<el-form-item label="充值金额" prop="total_money">
										<el-input v-model.number="ruleForm4.total_money"></el-input>
									</el-form-item>
									<el-form-item>
										<el-button type="primary" @click="submitMoneyway('ruleForm4')">计算价格</el-button>
										<el-button @click="resetForm('ruleForm4')">重置</el-button>
									</el-form-item>
								</el-form>
							</div>
						</el-tab-pane>
						<el-tab-pane>
							<span slot="label"><i class="iconfont icon-card"></i> 套餐方式购买</span>
							<h2>购买套餐</h2>
							<p>
								<span style="font-weight: 700;">套餐仅用于提取代理ip,如需给亿洲旗下vpn等其他产品充值请联系销售</span><br>
								以套餐形式购买和使用亿洲代理ip,通过包天包月等预付费，有每日使用个数和时间限制，享受更大的价格优惠，<br>
								最大程度节省支出，适合代理ip需求量大的企业用户
							</p>
							<el-button class="button"><a data-toggle="modal" data-target="#customer-dialog" href="#" style="text-decoration:none;color: #606266;">立即咨询</a></el-button>
							<hr>
							<h3>产品特性 </h3>
							<input type="checkbox" id="fold" style="opacity: 0;position: absolute;z-index: 100;width: 24px;height: 24px;">
							<i class="el-icon-caret-top" style="color:#087af0;"></i>
							<ul>
								<li>每日IP存量：300-400万左右</li>
								<li>提取间隔：无限制</li>
								<li>并发调用：支持多机器多线程</li>
								<li>单次可提取IP量：200/次</li>
								<li>代理类型：http/https/socks5</li>
								<li>有效率：99%<el-tooltip content="平均ip有效率,您在单次或者单地区的提取中可能略低于或高于此数值" placement="right" effect="light"><i class="el-icon-question"></i></el-tooltip>
								</li>
								<li>私密性：一手真实ip</li>
								<li>匿名度：高匿名</li>
								<li>覆盖地区：全国</li>
								<li>IP时长：<el-tooltip content="最长可用时间:提取后我们设置的可以供您使用的时间,由于各家电信服务商IP机制,网络波动等不可控因素,可能存在少量提前失效的IP,因为是不可控因素我们只能给出实测平均值参考:
总体提前失效率小于10%,一半时间前失效率小于5%,您在单次提取的ip提前失效率可能会超出这个范围"
									 placement="right" effect="light"><i class="el-icon-question"></i></el-tooltip>
									<ul>
										<li style="margin: 10px 0;">1分钟 ：原价 <span class="money">0.006</span>/个</li>
										<li style="margin: 10px 0;">5分钟 ：原价 <span class="money">0.010</span>/个</li>
										<li>25分钟：原价 <span class="money">0.020</span>/个</li>
									</ul>
								</li>
							</ul>
							<hr>
							<h3>套餐定制</h3>
							<el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="120px" class="demo-ruleForm">
								<el-form-item label="IP时长" prop="ip_time" style="display: inline-block;">
									<el-select v-model="ruleForm2.ip_time" placeholder="请选择IP时长" @change="(value)=>money_count(value)">
										<el-option v-for="time in timelongList" :label="time.name" :value="time.alias_id" :key="time.alias_id"></el-option>
									</el-select>
								</el-form-item>
								<el-form-item label="每日可用量" prop="ip_count" style="display: inline-block;">
									<el-input v-model.number="ruleForm2.ip_count"></el-input>
								</el-form-item>
								<el-form-item label="套餐周期" prop="package_type" style="display: inline-block;">
									<el-select v-model="ruleForm2.package_type" placeholder="请选择套餐周期">
										<el-option label="包天" value="1"></el-option>
										<el-option label="包周" value="2"></el-option>
										<el-option label="包月" value="3"></el-option>
									</el-select>
								</el-form-item>
								<el-form-item label="套餐份数" prop="number" style="display: inline-block;">
									<el-input v-model.number="ruleForm2.number"></el-input>
								</el-form-item>
								<el-form-item label="总计(天)">
									<el-input disabled v-model="count"></el-input>
								</el-form-item>
								<el-form-item label="选择套餐时间" prop="start_time">
									<el-date-picker @change="time_count()" v-model="ruleForm2.start_time" type="datetime" value-format="timestamp"
									 placeholder="请选择生效时间" style="width:40%;" :picker-options="pickerOptions0">
									</el-date-picker>
									<el-date-picker v-model="end_time" disabled type="datetime" placeholder="到期时间" style="width:40%;">
									</el-date-picker>
								</el-form-item>
								<el-form-item>
									<el-button type="primary" @click="submitForm('ruleForm2')">计算价格成本</el-button>
									<el-button @click="resetForm('ruleForm2')">重置</el-button>
								</el-form-item>

							</el-form>
						</el-tab-pane>
						<div class="pay_bottom" v-if="pay_bottom">
							<div class="pay_bottom_left">
								<div class="left_top">
									使用优惠券<i class="el-icon-caret-top"></i>
								</div>
								<div class="left_mid">
									<el-input v-model="code" placeholder="请输入优惠券代码"></el-input>
								</div>
								<div class="left_bottom">
									<el-button type="primary" @click="useCode()">使用</el-button>
									<el-button type="primary" @click="dialogVisible=true">获取最新优惠</el-button>
								</div>
								<div class="coupon_time">
									<div class="code">
										<p>优惠券起始时间：<span class="coupon">{{coupon_start_time}}</span></p>
									</div>
									<div class="code" style="margin-top: 5px;">
										<p>优惠券到期时间：<span class="coupon">{{coupon_end_time}}</span></p>
									</div>
								</div>
							</div>
							<div class="pay_bottom_right">
								<span class="num"><span style="float:left;">订单原价：</span><span>￥{{totalprice|numFilter}}</span></span>
								<span class="num"><span style="float:left;">优惠总计：</span><span>￥{{totaloffer}}</span></span>
								<span class="num"><span style="float:left;padding-top:4px;">应付总额：</span><span class="price">￥{{price|numFilter}}</span></span>
							</div>
						</div>
						<el-button type="primary" class="submit" @click="submit(formName)">提交订单</el-button>
					</el-tabs>
				</div>
				<el-dialog title="没有优惠码？" :visible.sync="dialogVisible" width="30%">
					<span>需要获取优惠码，您可以联系您的专属销售顾问</span>
					<span slot="footer" class="dialog-footer">
						<el-button @click="dialogVisible = false">取 消</el-button>
						<el-button type="primary" @click="dialogVisible = false">确 定</el-button>
					</span>
				</el-dialog>
			</div>
			<yz-pay-left></yz-pay-left>
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
			'yz-pay-left': left,
			'yz-footer': footer
		},
		data() {
			var checkNumber = (rule, value, callback) => {
				setTimeout(() => {
					if (!Number.isInteger(value) || value < 0) {
						callback(new Error('请输入正确的叠加份数'));
					} else {
						callback();
						if (this.ruleForm2.package_type == '') {
							this.count = 0
						} else if (this.ruleForm2.package_type == '1') {
							this.count = this.ruleForm2.number
						} else if (this.ruleForm2.package_type == '2') {
							this.count = this.ruleForm2.number * 7
						} else if (this.ruleForm2.package_type == '3') {
							this.count = this.ruleForm2.number * 30
						}
						this.time_count()
						this.plan()
					}
				}, 1000);
			};
			var checkIpcount = (rule, value, callback) => {
				if (!Number.isInteger(value) || value < 0) {
					callback(new Error('请输入正确的需求个数'));
				} else {
					callback();
					this.plan()
				}
			};
			var checkIpcount1 = (rule, value, callback) => {
				if (!Number.isInteger(value) || value < 0) {
					callback(new Error('请输入正确的需求个数'));
				} else {
					callback();
					this.num_way_count()
				}
			};
			var checkMoney = (rule, value, callback) => {
				var number = Number.parseFloat(value)
				if (number < 0) {
					callback(new Error('请输入正确的金额'));
				} else {
					callback();
					this.money_way_count()
				}
			};
			var checkPackagetype = (rule, value, callback) => {
				if (value == '') {
					callback(new Error('请选择包时类型'));
				} else {
					callback();
					if (this.ruleForm2.package_type == '') {
						this.count = 0
					} else if (this.ruleForm2.package_type == '1') {
						this.count = this.ruleForm2.number
					} else if (this.ruleForm2.package_type == '2') {
						this.count = this.ruleForm2.number * 7
					} else if (this.ruleForm2.package_type == '3') {
						this.count = this.ruleForm2.number * 30
					}
					this.time_count()
					this.plan()
				}
			};
			var checkStarttime = (rule, value, callback) => {
				if (value == '') {
					callback(new Error('请选择套餐开始时间'));
				} else {
					callback();
				}
			};
			return {
				stretch: true,
				pickerOptions0: {
					disabledDate(time) {
						return time.getTime() < Date.now() - 8.64e7;
					}
				},
				ruleForm2: {
					ip_time: '',
					package_type: '',
					number: 1,
					ip_count: 1,
					start_time: ''
				},
				ruleForm3: {
					minute: []
				},
				ruleForm4: {
					total_money: 10.00
				},
				count: 0,
				end_time: '',
				code: '',
				totalprice: 0.00,
				totaloffer: 0.00,
				price: 0.00,
				pay_bottom: false,
				num_way: false,
				money_way: true,
				rechargeway: '1',
				timelongList: [],
				money: 0,
				formName: '2',
				ip_price: [],
				coupon: '',
				coupon_start_time: '',
				coupon_end_time: '',
				dialogVisible: false,
				rules2: {
					ip_time: [{
						required: true,
						message: '请选择IP时长',
						trigger: 'change'
					}],
					package_type: [{
						required: true,
						validator: checkPackagetype,
						trigger: 'change'
					}],
					number: [{
						required: true,
						validator: checkNumber,
						trigger: 'blur'
					}],
					ip_count: [{
						required: true,
						validator: checkIpcount,
						trigger: 'blur'
					}],
					start_time: [{
						required: true,
						validator: checkStarttime,
						trigger: 'change'
					}],
				},
				rules3: {
					minute: []
				},
				rules4: {
					total_money: [{
						required: true,
						validator: checkMoney,
						trigger: 'blur'
					}],
				}
			};
		},
		// 保留小数点后两位的过滤器，尾数四舍五入

		filters: {

			numFilter(value) {

				// 截取当前数据到小数点后两位

				let realVal = Number(value).toFixed(2)

				// num.toFixed(2)获取的是字符串

				return Number(realVal)

			}
		},
		methods: {
			filter: function(value) {
				let filter = this.$options.filters['numFilter']
				let data = filter(value)
				return data
			},
			taocanName: function(name) {
				return name + '需求个数'
			},
			propName: function(index) {
				return 'minute[' + index + ']'
			},
			plan: function() {
				this.totalprice = this.ruleForm2.ip_count * this.money * this.count
				this.price = this.totalprice - this.totaloffer
			},
			num_way_count: function() {
				this.totalprice = 0.00
				for (var i = 0; i < this.timelongList.length; i++) {
					this.totalprice += Number.parseInt(this.ruleForm3.minute[i]) * this.timelongList[i].price
				}
				this.price = this.totalprice - this.totaloffer
			},
			money_way_count: function() {
				this.totalprice = this.ruleForm4.total_money
				this.price = this.totalprice - this.totaloffer
			},
			time_count: function() {
				let oneday = 24 * 3600 * 1000
				this.end_time = this.ruleForm2.start_time + oneday * this.count
			},
			money_count: function(value) {
				this.money = this.ip_price[value]
				this.pay_bottom = false
			},
			switchWay: function(value) {
				this.pay_bottom = false
				this.code = ''
				this.coupon = ''
				this.coupon_start_time = ''
				this.coupon_end_time = ''
				this.totaloffer = 0.00
				this.price = this.totalprice - this.totaloffer
				if (value == '1') {
					this.num_way = false
				} else {
					this.num_way = true
				}
				if (value == '2') {
					this.money_way = false
				} else {
					this.money_way = true
				}
			},
			hiddenPay: function() {
				this.pay_bottom = false
				this.code = ''
				this.coupon = ''
				this.coupon_start_time = ''
				this.coupon_end_time = ''
				this.totaloffer = 0.00
				this.price = this.totalprice - this.totaloffer
				this.resetForm('ruleForm2')
				this.resetForm('ruleForm3')
				this.reset()
			},
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.plan()
						this.pay_bottom = true
						this.formName = '2'
					} else {
						return false;
					}
				});
			},
			submitNumway(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.num_way_count()
						this.pay_bottom = true
						this.formName = '3'
					} else {
						return false;
					}
				});
			},
			submitMoneyway(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.money_way_count()
						this.pay_bottom = true
						this.formName = '4'
					} else {
						return false;
					}
				});
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
				this.pay_bottom = false
			},
			reset: function() {
				this.ruleForm4.total_money = 10.00
			},
			submit: function(formName) {
				if (this.pay_bottom == false) {
					this.$alert('请先计算价格成本')
				} else {
					var data = []
					if (formName == '2') {
						data['type'] = '1'
						data['order_type'] = '2'
						data['iptimelong'] = this.ruleForm2.ip_time
						data['day'] = this.count
						data['start_time'] = this.ruleForm2.start_time / 1000
						data['count'] = this.ruleForm2.ip_count
						data['coupon'] = this.coupon
						data['price'] = this.filter(this.totalprice)
					} else if (formName == '3') {
						data['type'] = '1'
						data['order_type'] = '1'
						data['coupon'] = this.coupon
						data['price'] = this.filter(this.totalprice)
					} else {
						data['type'] = '1'
						data['order_type'] = '1'
						data['coupon'] = this.coupon
						data['price'] = this.filter(this.totalprice)
					}
					this.$http.post(this.$config.host + 'http/order/create', this.$qs.stringify(data)).then(
						response => {
							var res = response.data
							if (res.state == 1) {
								this.$toast(res.msg)
							} else {
								this.$message({
									message: res.msg,
									type: 'success'
								});
								this.$router.push({
									path: '/pay/orderinfo',
									query: {
										order_id: res.data.id
									}
								})
								//location.reload()
							}
						})
				}
			},
			useCode: function() {
				this.coupon_start_time = ''
				this.coupon_end_time = ''
				this.totaloffer = 0.00
				this.price = this.totalprice - this.totaloffer

				this.$http.get(this.$config.host + 'http/index/getcoupon', {
					params: {
						coupon: this.code,
						price: this.totalprice
					}
				}).then(
					response => {
						let res = response.data
						if (res.state == 1) {
							this.$toast(res.msg)
						} else {
							this.coupon = this.code
							this.coupon_start_time = res.data.start_time_txt
							this.coupon_end_time = res.data.end_time_txt
							this.totaloffer = res.data.httpCouponType.money
							if (this.totalprice - this.totaloffer <= 0) {
								this.$toast('应付总额不能小于等于0')
								return ''
							}
							this.price = this.totalprice - this.totaloffer

						}
					})
			},
// 			contact: function() {
// 				window.open('http://p.qiao.baidu.com/cps/chat?siteId=12346041&userId=25915679&cp=&cr=&cw=pricing')
// 			}
		},
		created: function() {
			var checkIpcount1 = (rule, value, callback) => {
				if (!Number.isInteger(value) || value < 0) {
					callback(new Error('请输入正确的需求个数'));
				} else {
					callback();
					this.num_way_count()
				}
			};
			this.$http.get(this.$config.host + 'http/index/getordertimelonglist').then(
				response => {
					let res = response.data
					this.timelongList = res.data.timelongList
					for (var i = 0; i < this.timelongList.length; i++) {
						this.ruleForm3.minute[i] = 100
						this.rules3.minute[i] = [{
							required: true,
							validator: checkIpcount1,
							trigger: 'blur'
						}]
						this.ip_price[this.timelongList[i].alias_id] = this.timelongList[i].price
					}
				})
		}
	}
</script>

<style scoped>
	@import '../../assets/css/http/payshort1.css';
</style>
<style>
	@import '../../assets/css/http/payshort.css';
</style>
