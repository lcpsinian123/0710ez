<template>
	<div>
		<yz-header></yz-header>
		<div class="page-w">
			<h1 class="h1">
				<router-link to="/">首页&gt;</router-link>
				<router-link to="/more">NEWS&gt;</router-link>
				<a style="cursor:default">{{articleData.title}}</a>
			</h1>
			<div class="container">
				<section class="news_detail">
					<div class="left">
						<h1 class="title">{{articleData.title}}</h1>
						<h2>
							<span class="cat_name">NEWS</span>
							<span>发布日期</span>
							<span class="pub_time">{{articleData.updatetime}} </span> &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;
						</h2>
						<div class="content" id="content" style="text-align: initial;">
							<div v-html="articleData.content"></div>
						</div>
					</div>
				</section>
			</div>
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
			'yz-footer': footer,
		},
		data(){
			return{
				articleData:[],
				title:'资讯-亿洲网络',
				keywords:'http代理ip,爬虫',
				description:'代理ip知识,爬虫程序,软件工具,程序开发'
			}
		},
		metaInfo () {
			return{
				title: this.title, // set a title
				meta: [{ // set meta
					name: 'Keywords',
					content: this.keywords
				},{ // set meta
					name: 'Description',
					content: this.description
				}]
			}			
		},
		methods:{
			detail:function(){
				var id = this.$route.query.id
				if(this.$fun.isEmpty(id)){
					id = 22
				}
					this.$http.get(this.$config.host+'/http/article/newsdetail', {
						params: {
							'id': id
						},
						}).then(
							response => {
								var res = response.data
								this.articleData = res.data
								this.title = res.data.title
								this.keywords = res.data.title
								this.description = res.data.smallcontent
							}
						)	
			}
		},
		watch: {
			'$route': 'detail',
		},
		created:function(){
			this.detail()
		}
	}
</script>

<style scoped>
	.h1{
		margin: 100px auto 0;
		width: 1300px;
		text-align: left;
		line-height: 35px;
		border-bottom: 1px solid #e0e0e0;
	}
	.h1 a{
		color: #222222;
		font-size: 14px;
		text-decoration: none;
	}
	.container{
		padding-right: 15px;
		padding-left: 15px;
		margin-right: auto;
		margin-left: auto;
	}
	.news_detail{
		padding-right: 15px;
		padding-left: 15px;
		width: 1300px;
		margin: 0 auto;
		height: auto;
		margin-left: auto;
		display: block;
	}
	.news_detail > .left{
		float: none;
		width: 1300px;
		height: auto;
	}
	.news_detail > .left > h1{
		margin-top: 10px;
		font-size: 36px;
		color: #292929;
		text-align: center;
		margin-bottom: 10px;
	}
	.news_detail > .left > h2{
		color: #999;
		font-size: 14px;
		text-align: center;
	}
	.news_detail > .left > h2 > span:first-child{
		margin-left: 68px;
	}
	.news_detail > .left > h2 > span{
		display: inline-block;
		margin: 0 15px;
	}
	.news_detail > .left > .content{
		margin: 30px auto;
		width: 100%;
		min-height: 100px;
	}
	a{
		color: #428bca;
		text-decoration: none;
	}
</style>
