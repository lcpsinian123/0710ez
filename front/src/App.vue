<template>
  <div id="app">
    <transition name="fade" mode="out-in" :key="key">
		
			<router-view v-if="isRouterAlive"/>
		</transition>
  </div>
</template>

<script>
	export default {
		name: 'App',
		provide(){
			return {
				reload:this.reload
			}
		},
		data(){
			return {
				isRouterAlive:true
			}
		},
		computed: {
			key() {
				return this.$route.name !== undefined ? this.$route.name + new Date() : this.$route + new Date();
			}
		},
		methods:{
			reload(){
				this.isRouterAlive=false
				this.$nextTick(function(){
					this.isRouterAlive=true
				})
			}
		}
	}
</script>

<style>
	html{
		width:100%;
	}
	body {
		font-family: "微软雅黑";
		margin: 0;
		padding: 0;
		background: #FFF;
		font-size: 14px;
		color: #000;
		background-color: #fff;
		overflow-x: hidden;
	}
	
	.fade-enter-active,
	.fade-leave-active {
		transition: all .3s ease;
	}
	
	.fade-enter,
	.fade-leave-active {
		opacity: 0;
	}
	
	.page-w{width: 1400px;margin: 0 auto;margin-top: 100px;}
	.user-left{width: 240px; height: 850px;border-right: 1px solid #efefef; text-align: left;background-color: #fff;float: left;}
	.user-right{width: 1000px; height:850px;float: left;background-color: #fff; }
	.user-right-nav{height: 35px; padding-top: 20px; padding-left: 10px; border-bottom: 1px solid #efefef;}
</style>
