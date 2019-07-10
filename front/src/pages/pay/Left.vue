<template>
	<div class="user-left">
		<div class="el-menu-f">
			<el-row>
				<el-col :span="24">
					<div style="font-size: 20px;font-weight:  bold;letter-spacing: 2px;padding-top: 20px;">产品列表</div>
					<el-menu :default-active="default_active" :router="true">
						<el-menu-item index="/pay/payshort">
							<span slot="title">动态代理IP(短效)</span>
						</el-menu-item>
					</el-menu>
				</el-col>
			</el-row>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Left',
		data() {
			return {
				default_active: '/pay/payshort'
			}
		},
		created: function() {
			this.default_active = this.$route.path
		}
	}
</script>

<style scoped>
	.el-menu-f .el-col-24 {
		width: 100%;
		position: -webkit-sticky;
		position: sticky;
		top: 82px;
		border-top: 2px solid #0d80f6;
	}
	.el-menu {
		border-right: 0;
		list-style: none;
		position: relative;
		margin: 0;
		padding: 0;
	}

	.el-menu .el-menu-item {
		text-align: center;
		margin-top: 20px;
		letter-spacing: 2px;
	}

	.el-menu .el-menu-item span {
		font-size: 16px;
	}
</style>
