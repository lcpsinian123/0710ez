<template>
	<div>
		<yz-header></yz-header>
		<div class="page-w">
			<div class="top_pic">
				<img src="../../assets/new/about/about01.jpg">
			</div>
			<div class="container">
				<div class="container_top">
					<h2>关于我们</h2>
				</div>
				<hr>
				<div class="container_left">
					<p>亿洲网络是赣州市亿洲网络科技有限公司旗下的专为企业大数据业务量身定制的专业服务平台，目前已全面开展http，https，socks5等代理服务，亿洲网络专注于网站(Web)数据抓取领域，致力于成为集数据采集，IP代理，人工智能等业务于一体的一站式平台。</p>
					<p>随着云计算，大数据，人工智能的发展，数据采集作为数据的重要来源,成为广大企业的的迫切需求，爬虫业务需要执行大量的网页请求，需要突破各种安全策略，而其中ip和验证码是最为广泛使用的手段。亿洲网络深度研究爬虫需求，自主开发了最适合大数据业务的亿洲Http代理产品。</p>
					<p>亿洲网络作为一家市场化运作的增值电信业务服务商，拥有齐全资质，获得中国电信和中国联通等正规授权，代理节点分布于全国200多个城市，数百万级的IP总量，并且在不断增加新的IP中，亿洲动态代理IP所有IP均为高匿名的优质IP，有灵活的可用时间段和定制API，稳定，智能，突破访问限制，产品质量遥遥领先于行业，让您的爬虫效率提高N倍。</p>
					<p>亿洲网络目标长远，不断投入资金用于购置服务器和带宽，竭诚为客户提供更优质更稳定的代理服务。公司提供全天候的技术保障，热情欢迎您反馈建议和技术交流，我们将全心全意为您服务。</p>
				</div>
				<div class="container_right">
					<img src="../../assets/new/about/about02.png">
				</div>

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
		metaInfo: {
			title: '关于我们_公司介绍-亿洲网络', // set a title
			meta: [{ // set meta
				name: 'Keywords',
				content: '亿洲网络科技有限公司,代理ip,大数据'
			},
			{ // set meta
				name: 'Description',
				content: '国内领先的http代理ip服务商, 亿洲网络专注于网站(Web)数据抓取领域，致力于成为集数据采集，IP代理，人工智能等业务于一体的一站式平台。'
			}]
		},
	}
</script>

<style scoped>
	@import url('../../assets/css/http/about.css');
</style>
