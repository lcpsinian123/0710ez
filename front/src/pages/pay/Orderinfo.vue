<template>
	<div>
		<yz-header></yz-header>
		<div class="page-w">
			<el-card class="box-card">
				<div slot="header" class="clearfix">
					<span>订单详情</span>
				</div>
				<div class="item left">
					<p class="text">充值方式：{{order_type}}</p>
					<p class="text">订单编号：{{orderInfo.order_no}}</p>
					<div class="item" v-if="orderpackage">
						<p class="text">IP时长：{{orderInfo.httpOrderPackage.httpTimelong.name}}</p>
						<p class="text">日IP量：{{orderInfo.httpOrderPackage.count}}</p>
						<p class="text">套餐天数：{{orderInfo.httpOrderPackage.day}}</p>
						<p class="text">套餐起始时间：{{orderInfo.httpOrderPackage.start_time_txt}}</p>
						<p class="text">套餐结束时间：{{orderInfo.httpOrderPackage.end_time_txt}}</p>
					</div>
				</div>
				<div class="item right">
					<p class="text">订单原价：￥{{orderInfo.price}}</p>
					<p class="text" v-if="orderInfo.coupon">优惠券码：{{orderInfo.coupon}}</p>
					<p class="text">优惠券优惠：￥{{orderInfo.coupon_price}}</p>
					<p class="text" v-if="orderInfo.discount!=0">销售优惠：￥{{orderInfo.discount}}</p>
					<p class="text">应付总额：<span class="price">￥{{orderInfo.total_price}}</span></p>
					<p class="text">订单状态：{{order_status}}</p>
				</div>
				<!-- <div class="item clear">
					<p class="text">请选择支付方式</p>
					<el-radio-group v-model="pay_way" size="medium">
						<el-radio label="1" border disabled><i class="iconfont icon-swiftpass_alipay_scan"></i></el-radio>
						<el-radio label="2" border class="weixin"><img src="../../assets/wechatpay.png"></el-radio>
					</el-radio-group>
				</div> -->
				<div class="clear"></div>
				<div class="tr_rechcho am-form-group item clear">
					<label class="am-radio">
						<input type="radio" name="radio1" checked class="am-ucheck-radio" @click="(value)=>change_pay_way('wx')"><span class="am-ucheck-icons"><i class="am-icon-unchecked"></i><i class="am-icon-checked"></i></span><img
						 src="../../assets/wechatpay.png">
					</label>
					<label class="am-radio" style="margin-right:30px;margin-top:10px;">
						<input type="radio" name="radio1" disabled  class="am-ucheck-radio" @click="(value)=>change_pay_way('zfb')"><span
						 class="am-ucheck-icons"><i class="am-icon-unchecked"></i><i class="am-icon-checked"></i></span><img src="../../assets/zfbpay.png">
					</label>
				</div>
				<el-button type="primary" class="right pay_button" v-if='orderInfo.status==1' @click="pay()">立即支付</el-button>
			</el-card>
			<el-dialog title="请用微信扫描下方二维码进行支付" :visible.sync="dialogTableVisible" style="width:60%;margin:0 auto;">
				<div class="pay_dialog">
					<h3>扫码支付</h3>
					<img :src="erweima" style="display: block;margin:0 auto;" width="200" height="200">
					<p style="display: block;">使用<em>微信</em>APP扫码完成支付</p>
				</div>
			</el-dialog>
		</div>
		<div style="height:100px;"></div>
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
		data() {
			return {
				orderInfo: [],
				order_type: '',
				ip_type: '',
				orderpackage: false,
				order_status: '',
				pay_way: '2',
				erweima: '',
				dialogTableVisible: false
			}
		},
		methods: {
			pay: function() {
				var data = {
					'type': this.pay_way,
					'order_no': this.orderInfo.order_no
				}
				this.$http.post(this.$config.host + 'http/pay/create', this.$qs.stringify(data)).then(
					response => {
						let res = response.data
						if (res.state == 1) {
							this.$toast(res.msg)
						} else {
							let user_info = localStorage.getItem('auth_data')
							let userobj = JSON.parse(user_info)
							let auth_key = userobj.auth_key
							this.erweima = this.$config.host + 'http/pay/qrCode/?data=' + res.data.codeurl + '&auth_key=' + auth_key
							this.dialogTableVisible = true
							let self = this;
							if (self && !self._isDestroyed) {
								var check_pay = setInterval(() => {
									if (self && !self._isDestroyed) {
										if (this.dialogTableVisible == false) {
											clearInterval(check_pay)
										}
										this.$http.get(this.$config.host + 'http/order/orderInfo', {
											params: {
												order_no: this.orderInfo.order_no
											}
										}).then(
											response => {
												let res = response.data
												if (res.state == 0) {
													if (res.data.status != 1) {
														this.$message({
															message: '支付成功！',
															type: 'success'
														});
														this.$router.push('/ucenter/orderlist')
													}
												}
											})
									}
								}, 2000);
							}
						}
					})
			},
			change_pay_way:function(value){
				var radios = document.getElementsByClassName('am-radio');
				if(value=='wx'){
					radios[0].style.border='1px solid #147af0';
					radios[1].style.border='1px solid #e5e5e5';
					this.pay_way = '2';
				}else{
					radios[1].style.border='1px solid #147af0';
					radios[0].style.border='1px solid #e5e5e5';
					this.pay_way = '1';
				}
			}
		},
		created: function() {
			var order_no = this.$route.query.order_no
			var order_id = this.$route.query.order_id
			this.$http.get(this.$config.host + 'http/order/orderInfo', {
				params: {
					order_id: order_id
				}
			}).then(
				response => {
					let res = response.data
					if (res.state == 1) {
						this.$toast(res.msg)
					} else {
						this.orderInfo = res.data
						if (res.data.order_type == 2) {
							this.order_type = '套餐购买'
							this.orderpackage = true
						} else {
							this.order_type = '余额充值'
						}
						if (res.data.status == 1) {
							this.order_status = '未支付'
						} else {
							this.order_status = '已支付'
						}
					}
				})
		}
	}
</script>

<style scoped>
	@import url('../../assets/css/main.css');
	@import url('../../assets/css/amazeui.min.css');

	.page-w {
		margin-bottom: 150px;
	}

	.box-card {
		width: 50%;
		margin: 0 auto;
		margin-top: 200px;
	}

	.item {
		font-size: 14px;
		margin-bottom: 18px;
	}

	.text {
		margin-bottom: 15px;
	}

	.left {
		float: left;
	}

	.right {
		float: right;
	}

	.price {
		font-size: 20px;
		color: #92B9FA;
	}

	.clear {
		clear: both;
	}

	.el-radio {
		height: 40px;
	}

	.weixin .el-radio__input.is-checked+.el-radio__label {
		color: #19fa5c;
	}

	.pay_button {
		margin: 30px 0;
	}

	.pay_dialog {
		width: 300px;
		margin: 0 auto;
		padding: 12px 25px;
		text-align: center;
		box-shadow: 0 3px 10px 0 rgba(218,218,218,.46);
		border-radius: 2px;
		background: #fff;
	}
	.pay_dialog h3{
		width: 192px;
		margin: 0 auto;
		font-size: 18px;
		color: #333440;
	}
	.pay_dialog p{
		width: 192px;
		line-height: 1.5;
		margin: 12px auto 0;
		word-break: break-all;
		font-size: 16px;
		color: #999;
	}
	.pay_dialog p em{
		color: #FA5558;
		font-style: normal;
		font-weight: 400;
	}
</style>
