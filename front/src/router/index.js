import Vue from 'vue'
import Router from 'vue-router'
// import Login from '@/pages/user/Login'
import Reg from '@/pages/user/Reg'
import Forget from '@/pages/user/Forget'
import HttpIndex from '@/pages/http/Index'
import UcenterIndex from '@/pages/ucenter/Index'
import UcenterHttpport from '@/pages/ucenter/Httpport'
import HttpGetip from '@/pages/http/Getip'
import UcenterTaocanList from '@/pages/ucenter/TaocanList'
import UcenterIplog from '@/pages/ucenter/Iplog'
import UcenterSaleslog from '@/pages/ucenter/Saleslog'
import UcenterChangepwd from '@/pages/ucenter/Changepwd'
import HttpBigdata from '@/pages/http/Bigdata'
import HttpPay from '@/pages/http/Pay'
import HttpCompany from '@/pages/http/Company'
import HttpAbout from '@/pages/http/About'
import HttpHelp from '@/pages/http/Help'
import UcenterAuditor from '@/pages/ucenter/Auditor'
import UcenterWhitelist from '@/pages/ucenter/Whitelist'
import HttpMore from '@/pages/http/More'
import HttpInfo from '@/pages/http/Info'
import HttpOldgetip from '@/pages/http/Oldgetip'
import UcenterPptpaccount from '@/pages/ucenter/Pptpaccount'
import UcenterPptpaccount2 from '@/pages/ucenter/Pptpaccount2'
import HttpDemand from '@/pages/http/Demand'
import UcenterAuditorperson from '@/pages/ucenter/Auditorperson'
import UcenterAuditorcompany from '@/pages/ucenter/Auditorcompany'
import PayPayshort from '@/pages/pay/Payshort'
import PayPaylong from '@/pages/pay/Paylong'
import HttpNewgetip from '@/pages/http/Newgetip'
import PayOrderinfo from '@/pages/pay/Orderinfo'
import UcenterOrderlist from '@/pages/ucenter/Orderlist'
import HttpZGetIp from '@/pages/http/ZGetIp'
import UcenterVpnCombodetail from '@/pages/ucenter/VpnCombodetail'
import UcenterPptpSaleslog from '@/pages/ucenter/Saleslogpptp'

Vue.use(Router)

export default new Router({
	mode: 'history',
  routes: [
		
		{
			path: '/',
			name: 'HttpIndex',
			component: HttpIndex
		},
    // {
    //   path: '/user/login',
    //   name: 'Login',
    //   component: Login
    // },
		{
			path: '/user/forget',
			name: 'Forget',
			component: Forget
		},
    {
    	path:'/user/reg',
    	name:'Reg',
    	component:Reg
    },
		{
			path:'/ucenter/index',
			name:'UcenterIndex',
			component:UcenterIndex,
			meta: {
				title: '用户首页',
				requireAuth: true
			},
		},
		{
			path:'/ucenter/Httpport',
			name:'UcenterHttpport',
			component:UcenterHttpport,
			meta: {
				title: 'http端口',
				requireAuth: true
			},
		},
		{
			path:'/getip',
			name:'HttpGetip',
			component:HttpGetip,
			meta: {
				title: '提取ip',
			},
		},
		{
			path:'/ucenter/taocanlist',
			name:'UcenterTaocanList',
			component:UcenterTaocanList,
			meta: {
				title: '套餐列表',
				requireAuth: true
			},
		},
		{
			path:'/ucenter/iplog',
			name:'UcenterIplog',
			component:UcenterIplog,
			meta: {
				title: 'IP提取日志',
				requireAuth: true
			},
		},
		{
			path:'/ucenter/saleslog',
			name:'UcenterSaleslog',
			component:UcenterSaleslog,
			meta: {
				title: '消费日志日志',
				requireAuth: true
			},
		},
		{
			path:'/ucenter/saleslogpptp',
			name:'UcenterPptpSaleslog',
			component:UcenterPptpSaleslog,
			meta: {
				title: 'PPTP消费日志',
				requireAuth: true
			},
		},
		{
			path:'/ucenter/changepwd',
			name:'UcenterChangepwd',
			component:UcenterChangepwd,
			meta: {
				title: '修改密码',
				requireAuth: true
			},
		},
		{
			path:'/bigdata',
			name:'HttpBigdata',
			component:HttpBigdata,
			meta: {
				title: '大数据'
			},
		},
		{
			path:'/pay',
			name:'HttpPay',
			component:HttpPay,
			meta: {
				title: '购买套餐'
			},
		},
		{
			path:'/company',
			name:'HttpCompany',
			component:HttpCompany,
			meta: {
				title: '企业通道'
			},
		},
		{
			path:'/about',
			name:'HttpAbout',
			component:HttpAbout,
			meta: {
				title: '关于我们'
			},
		},
		{
			path:'/help',
			name:'HttpHelp',
			component:HttpHelp,
			meta: {
				title: '帮助中心'
			},
		},
		{
			path:'/ucenter/auditor',
			name:'UcenterAuditor',
			component:UcenterAuditor,
			meta: {
				title: '审核认证',
				requireAuth: true
			},
		},
		{
			path:'/ucenter/whitelist',
			name:'UcenterWhitelist',
			component:UcenterWhitelist,
			meta: {
				title: '白名单',
				requireAuth: true
			},
		},
		{
			path:'/more',
			name:'HttpMore',
			component:HttpMore,
			meta: {
				title: '更多文章',
			},
		},
		{
			path:'/info',
			name:'HttpInfo',
			component:HttpInfo,
			meta: {
				title: '文章详情',
			},
		},
		{
			path:'/oldgetip',
			name:'HttpOldgetip',
			component:HttpOldgetip,
			meta: {
				title: '旧版提取IP',
			},
		},
		{
			path:'/newgetip',
			name:'HttpNewgetip',
			component:HttpNewgetip,
			meta: {
				title: '新版提取IP',
			},
		},
		{
			path:'/zgetip',
			name:'HttpZGetIp',
			component:HttpZGetIp,
			meta: {
				title: '新版提取IP',
			},
		},
		{
			path:'/ucenter/pptpaccount',
			name:'UcenterPptpaccount',
			component:UcenterPptpaccount,
			meta: {
				title: 'PPTP账号',
				requireAuth: true
			},
		},
		{
			path:'/ucenter/pptpaccount2',
			name:'UcenterPptpaccount2',
			component:UcenterPptpaccount2,
			meta: {
				title: 'PPTP账号(新)',
				requireAuth: true
			},
		},
		{
			path:'/ucenter/vpncombodetail',
			name:'UcenterVpnCombodetail',
			component:UcenterVpnCombodetail,
			meta: {
				title: 'vpn套餐介绍',
				requireAuth: true
			},
		},
		{
			path:'/demand',
			name:'HttpDemand',
			component:HttpDemand,
			meta: {
				title: '需求定制',
			},
		},
		{
			path:'/ucenter/auditorperson',
			name:'UcenterAuditorperson',
			component:UcenterAuditorperson,
			meta: {
				title: '个人认证',
				requireAuth: true
			},
		},
		{
			path:'/ucenter/auditorcompany',
			name:'UcenterAuditorcompany',
			component:UcenterAuditorcompany,
			meta: {
				title: '企业认证',
				requireAuth: true
			},
		},
		{
			path:'/pay/payshort',
			name:'PayPayshort',
			component:PayPayshort,
			meta: {
				title: '短效IP支付',
			},
		},
		{
			path:'/pay/paylong',
			name:'PayPaylong',
			component:PayPaylong,
			meta: {
				title: '长效IP支付',
			},
		},
		{
			path:'/pay/orderinfo',
			name:'PayOrderinfo',
			component:PayOrderinfo,
			meta: {
				title: '订单详情',
				requireAuth: true
			},
		},
		{
			path:'/ucenter/orderlist',
			name:'UcenterOrderlist',
			component:UcenterOrderlist,
			meta: {
				title: '订单列表',
				requireAuth: true
			},
		},
  ]
})
