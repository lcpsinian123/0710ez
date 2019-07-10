<template>
	<div>
		<yz-header></yz-header>
		<div class="page-w">
			<div class="content_title">
				<div class="content_h">包时套餐</div>
				<div class="content_text">
					<p style="padding-left:2.5%;">包时套餐是我们针对稳定使用客户推出的优惠产品，价格比按次提取优惠很多，购买时请注意套餐有使用时间和每日使用数量限制，</p>
					<p>
					</p>
					<p style="padding-left:2.5%;">请根据需求购买；页面显示的ip数量为套餐最低起订数量，实际数量可以根据您的需求自定义，更多最新套餐信息请咨询销售人员。</p>
				</div>
			</div>
			<div class="package">
				<div class="package_div">
					<div class="inner_div">
						<h2>包天</h2>
						<p>（24小时）</p>
						<hr/>
						<p class="text">稳定时长：1-5分钟</p>
						<p class="text">起订个数：2500个/天</p>
						<p class="text">折合单价：0.018元</p>
						<p class="text bottom_text">低至：<span class="span1">45</span><span class="span2">　元</span></p>
						<el-button type="primary" @click="dialogVisible = true">立即购买</el-button>
					</div>
					<div class="inner_div">
						<h2>包天</h2>
						<p>（24小时）</p>
						<hr/>
						<p class="text">稳定时长：1-5分钟</p>
						<p class="text">起订个数：2500个/天</p>
						<p class="text">折合单价：0.018元</p>
						<p class="text bottom_text">低至：<span class="span1">45</span><span class="span2">　元</span></p>
						<el-button type="primary" @click="dialogVisible = true">立即购买</el-button>
					</div>
					<div class="inner_div">
						<h2>包天</h2>
						<p>（24小时）</p>
						<hr/>
						<p class="text">稳定时长：1-5分钟</p>
						<p class="text">起订个数：2500个/天</p>
						<p class="text">折合单价：0.018元</p>
						<p class="text bottom_text">低至：<span class="span1">45</span><span class="span2">　元</span></p>
						<el-button type="primary" @click="dialogVisible = true">立即购买</el-button>
					</div>
					<div class="inner_div">
						<h2>包天</h2>
						<p>（24小时）</p>
						<hr/>
						<p class="text">稳定时长：1-5分钟</p>
						<p class="text">起订个数：2500个/天</p>
						<p class="text">折合单价：0.018元</p>
						<p class="text bottom_text">低至：<span class="span1">45</span><span class="span2">　元</span></p>
						<el-button type="primary" @click="dialogVisible = true">立即购买</el-button>
					</div>
					<div class="inner_div">
						<h2>包天</h2>
						<p>（24小时）</p>
						<hr/>
						<p class="text">稳定时长：1-5分钟</p>
						<p class="text">起订个数：2500个/天</p>
						<p class="text">折合单价：0.018元</p>
						<p class="text bottom_text">低至：<span class="span1">45</span><span class="span2">　元</span></p>
						<el-button type="primary" @click="dialogVisible = true">立即购买</el-button>
					</div>
					<div class="inner_div">
						<h2>包天</h2>
						<p>（24小时）</p>
						<hr/>
						<p class="text">稳定时长：1-5分钟</p>
						<p class="text">起订个数：2500个/天</p>
						<p class="text">折合单价：0.018元</p>
						<p class="text bottom_text">低至：<span class="span1">45</span><span class="span2">　元</span></p>
						<el-button type="primary" @click="dialogVisible = true">立即购买</el-button>
					</div>
				</div>
			</div>
			<div style="height:auto;margin-left:19%;margin-bottom:5px;margin-top:30px;color:#666666;">
				<p>注：套餐为一次性付费，每日最多获取的ip数是限定的，当日可用数为0时即当日无法再继续使用，第二天限额会刷新，套餐确认购买后无法中止和退款。</p>
			</div>
		</div>
		<el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
			<span>请联系销售进行充值</span>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="dialogVisible = false">确 定</el-button>
			</span>
		</el-dialog>
		<div style="height:100px;"></div>
		<yz-footer></yz-footer>
	</div>
</template>

<script>
	import header from './Head'
	import footer from './Footer'
	export default {
		name: 'Login',
		components: {
			'yz-header': header,
			'yz-footer': footer
		},
		data(){
			return {
				dialogVisible: false
			}
		},
		metaInfo: {
			title: '购买代理ip-亿洲网络', // set a title
			meta: [{ // set meta
				name: 'Keywords',
				content: '亿洲代理ip充值,购买套餐'
			}]
		},
	}
</script>

<style scoped>
	.page-w {
		width: 100% !important;
		margin-top: 80px;
	}

	.content_title {
		background: linear-gradient(to top, #0072ff, #00c6ff);
		height: auto!important;
		min-height: 250px;
		width: 100%;
	}

	.content_h {
		margin-top: 70px;
		position: absolute;
		text-align: center;
		width: 100%;
		font-family: Microsoft YaHei;
		color: white;
		font-size: 52px;
	}

	.content_text {
		margin-top: 150px;
		position: absolute;
		text-align: center;
		width: 100%;
		font-family: Microsoft YaHei;
		color: white;
	}
	.package{
		width:100%;
		height:1000px;
	}
	.package .package_div{
		width:1400px;
		height:1000px;
		margin:0 auto;
	}
	.package .package_div .inner_div{
		width:260px;
		height:400px;
		float:left;
		margin-top:100px;
		margin-left:150px;
		border: 1px solid #ebeef5;
		box-shadow: 2px 2px 12px 2px rgba(0,0,0,.1);
		background-color: #fff;
		color: #303133;
	}
	.package .package_div .inner_div h2{
		text-align: center;
		font-size: 30px;
		letter-spacing: 3px;
		font-weight: 500;
		margin-bottom: 0;
	}
	.package .package_div .inner_div p{
		text-align: center;
		font-size: 12px;
	}
	.package .package_div .inner_div hr{
		background-color:#ccc;
		width:80%;
	}
	.package .package_div .inner_div p.text{
		font-size: 14px;
		text-align: left;
		margin-left:50px;
		letter-spacing: 2px;
		margin-top:20px;
	}
	.package .package_div .inner_div p.bottom_text{
		margin-top:50px;
	}
	.package .package_div .inner_div p.bottom_text span.span1{
		font-size: 30px;
		letter-spacing: 3px;
		font-weight: bold;
		color:#D0021B;
	}
	.package .package_div .inner_div p.bottom_text span.span2{
		color:#D0021B;
	}
	.package .package_div .inner_div .el-button{
		margin-left:70px;
	}
</style>
