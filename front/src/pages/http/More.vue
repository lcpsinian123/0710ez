<template>
	<div>
		<yz-header></yz-header>
		<div class="page-w">
			<h1 class="h1">
				<router-link to="/">首页&gt;</router-link>
				<router-link to="/more">NEWS&gt;</router-link>
			</h1>
			<section class="news_detail">
				<div class="news_list">
					<div class="info" v-for="article in articleList">
						<div class="title">
							<router-link class="title_a" :to="{ path: '/info', query: { id: article.id }}">{{article.title}}</router-link>
							<h2>发布时间{{article.addtime}}</h2>
						</div>
						<div class="content">
							{{article.smallcontent}}
						</div>
					</div>
				</div>
			</section>
		</div>
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
		data() {
			return {
				articleList: []
			}
		},
		metaInfo: {
			title: '资讯_文章列表-亿洲网络', // set a title
			meta: [{ // set meta
				name: 'Keywords',
				content: 'http代理ip,爬虫'
			},{ // set meta
				name: 'Description',
				content: '代理ip知识,爬虫程序,软件工具,程序开发'
			}]
		},
		created: function () {
			this.$http.get(this.$config.host + '/http/article/newslist').then(
				response => {
					let res = response.data
					this.articleList = res.data
				});
		}
	}
</script>

<style scoped>
	.h1 {
		margin: 100px auto 0;
		width: 1300px;
		text-align: left;
		line-height: 35px;
		border-bottom: 1px solid #e0e0e0;
	}

	.h1 a {
		color: #222222;
		font-size: 14px;
	}

	.news_detail {
		padding-right: 15px;
		padding-left: 15px;
		width: 1300px;
		margin: 0 auto;
		height: auto;
		margin-left: auto;
	}

	.news_list {
		padding-bottom: 50px;
		float: none;
		width: 1300px;
		height: auto;
	}

	.news_list .info {
		position: relative;
		margin-bottom: 2px;
		padding-top: 40px;
		width: 100%;
		height: auto;
		padding: 35px 0;
		transition: all 0.3s ease;
	}

	.news_list .info>.title {
		text-align: left;
		position: relative;
		width: 770px;
		padding-left: 90px;
		height: auto;
	}

	.news_list .info>.title>.title_a {
		width: 760px;
		padding-right: 10px;
		position: relative;
		display: block;
		line-height: 39px;
		cursor: pointer;
		font-size: 24px;
		color: #222;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		transition: all 0.3s ease;
		text-decoration: none;
	}

	.news_list .info>.title>h2 {
		font-size: 12px;
		color: #999;
		line-height: 30px;
		margin-top: 3px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		margin-bottom: 10px;
	}

	.news_list .info>.content {
		margin: 0 auto;
		width: 1200px;
		margin-top: 15px;
		text-align: left;
		font-size: 16px;
		height: auto;
		color: #888;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		padding-left: 90px;
	}
</style>
