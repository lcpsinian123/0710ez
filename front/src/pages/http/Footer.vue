<template>
	<div>
		<div class="foot">
			<div class="foot_main">
				<div class="inner_div inner_div1">
					<img src="../../assets/new/index/logo.png">
					<p>专注 高效 智能</p>
					<p>一站式大数据平台</p>
				</div>
				<div class="inner_div inner_div2">
					<h2>网站导航</h2>
					<ul>
						<li><router-link to="#" target="_blank" style="color: #939393;font-size: 12px;">>>官网首页</router-link></li>
						<li><router-link to="#" target="_blank" style="color: #939393;font-size: 12px;">>>企业通道</router-link></li>
						<li><router-link to="#" target="_blank" style="color: #939393;font-size: 12px;">>>诚聘英才</router-link></li>
						<li><router-link to="#" target="_blank" style="color: #939393;font-size: 12px;">>>帮助中心</router-link></li>
						<li><router-link to="#" target="_blank" style="color: #939393;font-size: 12px;">>>用户协议</router-link></li>
						<li><router-link to="#" target="_blank" style="color: #939393;font-size: 12px;">>>隐私政策</router-link></li>
						<li><router-link to="#" target="_blank" style="color: #939393;font-size: 12px;">>>提取IP</router-link></li>
						<li><router-link to="#" target="_blank" style="color: #939393;font-size: 12px;">>>云服务器</router-link></li>
					</ul>
				</div>
				<div class="inner_div inner_div3">
					<h2>联系我们</h2>
					<h1>0797-8066188</h1>
					<p>手机/微信：18617122835</p>
					<p>QQ：1320601</p>
					<p>地址：赣州市开发区国际企业中心A1号楼</p>
				</div>
				<div class="inner_div inner_div4">
					<img src="../../assets/new/index/ewm.png">
					<p>扫一扫 联系我们</p>
				</div>
			</div>
		</div>
		<footer class="footer" style="background:black;height:65;">
			<div class="wrap">
				<div class="footer-row" style="padding-top:0;margin-top:5px;">
					<p class="text" style="font-size:12px;font-family:'SimSun';color:#939393;text-align:center;padding-left:0;margin:0;">亿洲网络仅为企业在国内的大数据采集分析等业务提供服务，禁止用户使用亿洲网络从事任何违反法律法规的活动
						<br>
					</p>
					<p class="text" style="font-size:12px;font-family:'SimSun';color:#939393;text-align:center;padding-left:0;margin:0;">用户使用亿洲网络从事的行为均不代表亿洲网络的意志和观点，与亿洲网络的立场无关， 产生的相关责任用户自负，对此亿洲网络不承担任何法律责任</p>
					<p class="text" style="font-size:12px;font-family:'SimSun';color:#939393;text-align:center;padding-left:0;margin:0;">版权所有　赣州市亿洲网络科技有限公司 赣ICP备16006886号-2　Powered by Yizhou tech ©2018　 增值电信业务许可证:B1-20160677 赣B2-20170056</p>
				</div>
				<div style="width:300px;margin:0 auto; padding:5px 0;">
					<img src="../../assets/1.png" style="float:left;">
					<p style="float:left;height:20px;line-height:20px;margin: 0px 0px 0px 5px; color:#939393;">赣公网安备 36070002000129号</p>
				</div>
			</div>

		</footer>
		<QQ></QQ>
	</div>
</template>

<script>
	import QQ from './QQ'
	export default {
		name: 'Login',
		components: {
			'QQ': QQ
		},
		data() {
			return {
				articleList: []
			}
		}
	}
</script>

<style scoped>
	@import url('../../assets/css/http/footer.css');
</style>
