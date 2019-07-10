<template>
	<div style="margin-top: -18px;">
		<div id="header">
			<yz-header></yz-header>
		</div>
		<div class="page-w">
			<section style='width:100%'>
				<div class="container">
					<p style="padding-top: 30px;font-size: 14px;margin-bottom: 30px;">当前位置：<router-link to="/" style="color:#000;"> 首页 </router-link>> 帮助中心</p>
					<!--左侧列表-->
					<div class="list_left">
						<div class="list_head">
							<img src="../../assets/new/help/help.png"><span>帮助中心</span>
						</div>
						<div class="lists">
							<h3 class="problem" id="cat_300" @click="switchUl('problem')">常见问题<span class="arrow">></span></h3>
							<ul id="problem" style="display: block;">
								<li v-for="article in helpList[300]">
									<router-link :to="{ path: '/help', query: { id: article.id }}" class="detail">{{article.title}}</router-link>
								</li>
							</ul>
						</div>
						<div class="lists">
							<h3 class="notes" id="cat_87" @click="switchUl('notes')">购买须知<span class="arrow">></span></h3>
							<ul style="display: none;" id="notes">
								<li v-for="article in helpList[87]">
									<router-link :to="{ path: '/help', query: { id: article.id }}" class="detail">{{article.title}}</router-link>
								</li>
							</ul>
						</div>

						<div class="lists">
							<h3 class="course" id="cat_224"  @click="switchUl('course')">新手教程<span class="arrow">></span></h3>
							<ul id="course" style="display: none;">
								<li v-for="article in helpList[224]">
									<router-link :to="{ path: '/help', query: { id: article.id }}" class="detail">{{article.title}}</router-link>
								</li>
							</ul>
						</div>

					</div>
					<!--右侧内容-->
					<div class="content">
						<div v-html="detailData.content"></div>
					</div>
				</div>
			</section>
		</div>
		<div style="clear: both;"></div>
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
			return{
				helpList:[],
				//detail:[]
				detailData:[],
				title:'亿洲网络-帮助中心',
				keywords:'代理ip,http,https,socks,s5,高匿名ip',
				description:'代理的类型，具体是指代理协议类型，常见的有HTTP、HTTPS、Socks5等'
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
			switchUl:function(value){
				var objs = ['problem','notes','course']
				for(var i = 0;i<objs.length;i++){
					var obj = document.getElementById(objs[i]);
					if(objs[i]==value){
						$('.'+objs[i]).css('color','#3899FF');
						$('.'+objs[i]+' .arrow').addClass('rotate');
						if(obj.style.display=='none'){
							obj.style.display = 'block';
							$('.'+objs[i]+' .arrow').addClass('rotate');
						}else{
							obj.style.display = 'none';
							$('.'+objs[i]+' .arrow').removeClass('rotate');
						}
					}else{
						obj.style.display = 'none';
						$('.'+objs[i]).css('color','#000');
						$('.'+objs[i]+' .arrow').removeClass('rotate');
					}
				}
			},
			detail:function(){
				var id = this.$route.query.id
				if(this.$fun.isEmpty(id)){
					id = 16
				}
					this.$http.get(this.$config.host+'/http/article/helpdetail', {
						params: {
							'id': id
						},
						}).then(
							response => {
								var res = response.data
								this.detailData = res.data
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
			this.$http.get(this.$config.host+'/http/article/helpList').then(
				response => {
					let res = response.data
					this.helpList = res.data
					console.log(this.helpList)
				});
				this.detail()
		}
	}
</script>

<style scoped>
	@import url('../../assets/css/http/help.css');
	body{
		background-color: #f5f6f7 !important;
	}
</style>
<style>
	#header .header a{
		color: #000000;
	}
	#header #logo{
		filter: drop-shadow(-138px 0px 0px #666);
	}
</style>
