<template>
	<div>
		<!-- 客服弹窗 -->
		<div class="modal fade" id="customer-dialog" tabindex="-1" role="dialog" aria-labelledby="customer-dialog" aria-hidden="true">

			<div class="modal-dialog">
				<div class="modal-content">

					<div class="modal-body">
						<div class="customer-head">客户服务中心</div>
						<div class="customer">
							<!-- <div class="zxkf kf-height">
								<img src="../../assets/qq/bb.png" width="40" style="position: relative; left: 0px; bottom: 5px;">
								<span class="customer-title">在线客服：</span>
								<div class="kf-right">
									<a target="_blank" href="#">
										立即沟通
										<img src="../../assets/qq/cc.png" width="30" style=" position: relative; left: 0px; bottom: 10px;">
									</a>
									<div class="kf-line"></div>
									<span class="kf-subcontent">
										综合客服由多人值班，集中调度，处理所有业务
									</span>
								</div>
							</div> -->
							<div class="sqzx kf-height" style="height: 110px;">
								<img src="../../assets/qq/aa.png" width="40" class="kf-qq-icon">
								<span class="customer-title">售前咨询：</span>
								<div class="kf-right">
									<a target="_blank"  href="http://wpa.qq.com/msgrd?v=3&uin=1660426939&site=qq&menu=yes" rel="external nofollow">小廖：<img border="0" src="../../assets/button_121.gif" alt="点击这里给我发消息" title="点击这里给我发消息" width="18" /></a>&nbsp;&nbsp;
									<a target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=3389333970&site=qq&menu=yes" rel="external nofollow">梅梅：<img border="0" src="../../assets/button_121.gif" alt="点击这里给我发消息" title="点击这里给我发消息" width="18" /></a>&nbsp;&nbsp;
									<a target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=155253525&site=qq&menu=yes" rel="external nofollow">小蕾：<img border="0" src="../../assets/button_121.gif" alt="点击这里给我发消息" title="点击这里给我发消息" width="18" /></a>&nbsp;&nbsp;
									
									<a target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=474666475&site=qq&menu=yes" rel="external nofollow">小枭：<img border="0" src="../../assets/button_121.gif" alt="点击这里给我发消息" title="点击这里给我发消息" width="18" /></a>
									<br>
									<a target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=384069806&site=qq&menu=yes" rel="external nofollow">诚宇：<img border="0" src="../../assets/button_121.gif" alt="点击这里给我发消息" title="点击这里给我发消息" width="18" /></a>&nbsp;&nbsp;
									<a target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=280141397&site=qq&menu=yes" rel="external nofollow">梵高：<img border="0" src="../../assets/button_121.gif" alt="点击这里给我发消息" title="点击这里给我发消息" width="18" /></a>&nbsp;&nbsp;
									<a target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=19113593&site=qq&menu=yes" rel="external nofollow">瓜哥：<img border="0" src="../../assets/button_121.gif" alt="点击这里给我发消息" title="点击这里给我发消息" width="18" /></a>&nbsp;&nbsp;
									<a target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=453229459&site=qq&menu=yes" rel="external nofollow">青青：<img border="0" src="../../assets/button_121.gif" alt="点击这里给我发消息" title="点击这里给我发消息" width="18" /></a>&nbsp;&nbsp;
									<br>
									<a target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=531930903&site=qq&menu=yes" rel="external nofollow">小邱：<img border="0" src="../../assets/button_121.gif" alt="点击这里给我发消息" title="点击这里给我发消息" width="18" /></a>&nbsp;&nbsp;
									<a target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=48017922&site=qq&menu=yes" rel="external nofollow">长风：<img border="0" src="../../assets/button_121.gif" alt="点击这里给我发消息" title="点击这里给我发消息" width="18" /></a>&nbsp;&nbsp;


									<div class="kf-line"></div>
									<span class="kf-subcontent">
										温馨提示：请尽量加好友，以获得更完善的后续服务
									</span>
								</div>
							</div>
							<div class="shzc kf-height">
								<img src="../../assets/qq/aa.png" width="40" class="kf-qq-icon">
								<span class="customer-title">售后支持：</span>
								<div class="kf-right">
									<a target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=273277557&site=qq&menu=yes" rel="external nofollow">售后一：
										<img border="0" src="../../assets/button_121.gif" alt="点击这里给我发消息" title="点击这里给我发消息" width="18" />
									</a>&nbsp;&nbsp;&nbsp;&nbsp;
									<a target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=273277557&site=qq&menu=yes" rel="external nofollow">售后二：
										<img border="0" src="../../assets/button_121.gif" alt="点击这里给我发消息" title="点击这里给我发消息" width="18" />
									</a>
									<div class="kf-line"></div>
									<span class="kf-subcontent">
										使用过程遇到任何问题，我们将第一时间为您解决
									</span>
								</div>
							</div>
							<div class="hzjy kf-height">
								<img src="../../assets/qq/aa.png" width="40" class="kf-qq-icon">
								<span class="customer-title">合作建议：</span>
								<div class="kf-right">	
									手机/微信：18617122835    QQ：1320601
									<div class="kf-line"></div>
									<span class="kf-subcontent">
										大客户，推广，商务合作，欢迎洽谈
									</span>
								</div>
							</div>
							<div style="clear: both;"></div>
							<div style="text-align: right;">
								<button type="button" class="btn" style="background: #1688fe; color: #ffffff;" data-dismiss="modal">关闭</button>
							</div>
						</div>
					</div>
				</div>
			</div>

		</div>
		
		<!-- 产品经理弹窗 -->
<div class="modal fade" id="customer-dialog1" tabindex="-1" role="dialog" aria-labelledby="customer-dialog1" aria-hidden="true">

			<div class="modal-dialog">
				<div class="modal-content">

					<div class="modal-body">
						<div class="customer-head">客户服务中心</div>
						<div class="customer">
							<p class="text">手机/微信：18617122835</p>
							<p class="text">QQ：1320601</p>
							<img class="ewm" src="../../assets/new/index/ewm.png">
							<div style="clear: both;"></div>
							<div style="text-align: right;">
								<button type="button" class="btn" style="background: #1688fe; color: #ffffff;" data-dismiss="modal">关闭</button>
							</div>
						</div>
					</div>
				</div>
			</div>

		</div>

		<div class="umeng_message" style="right: 0px; bottom: 70px; z-index: 2147483647;">
			<ul class="umeng_message_icons">

				<li class="umeng_message_icon_service">
					<span class="umeng_message_icon">
						<i class="fa fa-qq" aria-hidden="true" style="font-size:24px;"></i>
					</span>
					<a data-toggle="modal" data-target="#customer-dialog" href="#">
						<span class="umeng_message_text">QQ
							<br> 客服
						</span>
					</a>
				</li>

				<li class="umeng_message_icon_form">
					<span class="umeng_message_icon">
						<i class="fa fa-headphones" style="font-size:24px;"></i>
					</span>
					<a data-toggle="modal" data-target="#customer-dialog1" href="#">
						<span class="umeng_message_text">产品
							<br> 经理
						</span>
					</a>
				</li>
				<li style="display: none;" id="goTop" onclick="javascript:window.scrollTo(0,0);">
					<span class="umeng_message_icon">
						<i class="fa fa-angle-double-up fa-3x"></i>
					</span>
					<span class="umeng_message_text">返回
						<br> 顶部
					</span>
				</li>
			</ul>

		</div>

	</div>
</template>

<script>
	function externalLinks() {
		if (!document.getElementsByTagName) return;
		var anchors = document.getElementsByTagName("a");
		for (var i = 0; i < anchors.length; i++) {
			var anchor = anchors[i];
			if (anchor.getAttribute("href") &&
				anchor.getAttribute("rel") == "external")
				anchor.target = "_blank";
		}
	}
	window.onload = externalLinks;
</script>

<style scoped>
	@import url("../../assets/css/bootstrap.min.css");
	@import url("../../assets/emeng/font-awesome.min.css");
	.customer-head {
		height: 40px;
		line-height: 40px;
		background: #1688fe;
		color: #ffffff;
		margin-top: -20px;
		margin-left: -20px;
		margin-right: -20px;
		padding-left: 20px;
		font-family: "microsoft yahei";
		font-size: 14px;
	}
	.modal{
		bottom: 15%;
	}
	.customer {
		margin-top: 20px;
	}

	.customer-icon {
		font-size: 22px;
		color: #1084fe;
	}

	.customer-title {
		font-size: 24px;
		color: #000000;
		font-family: "microsoft yahei";
	}

	.kf-height {
		height: 80px;
		line-height: 32px;
		font-size: 12px;
	}

	.kf-height img {
		vertical-align: middle;
	}

	.kf-right {
		width: 350px;
		float: right;
		margin-right: 15px;
		font-size: 14px;
		color: #000000;
		font-family: "microsoft yahei";
	}

	.kf-right a {
		color: #000000;
	}

	.kf-line {
		border-top: 1px solid #eeeeee;
	}

	.kf-qq-icon {
		position: relative;
		left: 0px;
		bottom: 5px;
	}

	.kf-subcontent {
		font-size: 12px;
		font-family: simsun;
	}
	.text{
		font-size: 16px;
		text-align: center;
		margin-top:20px;
	}
	.ewm{
		display: block;
		width: 50%;
		height: 50%;
		margin: 0 auto;
	}
</style>
