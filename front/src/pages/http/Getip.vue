<template>
<div>
	<yz-header></yz-header>
	<div style="margin-top:100px;"></div>
	<div class="page-w">
		<div class="top_bg">
			<h1>提取IP</h1>
			<p>多种方案，满足不同需求</p>
		</div>
		<div class="container">
		<el-row>
			<el-col :span="1">&nbsp;</el-col>
			<el-col :span="16">
				<div class="grid-content bg-purple-dark">
					<h2 class="title">提取IP/生成IP(短时效)</h2>
				</div>
			</el-col>
		</el-row>
		<hr>
		<el-row>
			<el-col :span="2">&nbsp;</el-col>
			<el-col :span="3">
				<div class="grid-content bg-purple-dark">
					<h3>提取方式</h3>
				</div>
			</el-col>
			<el-col :span="7">
				<div class="grid-content bg-purple-dark">
					<el-select v-model="items.tiqu" placeholder="请选择提取方式" @change="(value)=>switchTaocan(value)">
						<el-option label="按次提取" value="-1"></el-option>
						<el-option label="定制提取" value="-3"></el-option>
						<!--
						<el-option label="按并发量" value="-5"></el-option>
						-->
						<el-option v-for="packages in items.packagelist" :label="taocanName(packages.package.name,packages.ipcount,packages.package.ipTimelong.name)" :value="packages.id" :key="packages.id"></el-option>
					</el-select>
				</div>
			</el-col>
			
		</el-row>

		<el-row class="putong" v-if="items.see_putong">
			<el-col :span="2">&nbsp;</el-col>
			<el-col :span="3">
				<div class="grid-content bg-purple-dark">
					<h3>账户信息</h3>
				</div>
			</el-col>
			<el-col :span="12">
				<div class="survey_content">
					<div class="line1" style="display: block;">
						<span class="left balance_money">
							<a>{{items.tip}}</a>
							<a id="balance">{{items.balance}}</a>
						</span>
						<el-button  @click="recharge">立即充值</el-button>
						
						<el-button  @click="getFree" v-if="items.httpfree.state==0">领取每日免费IP</el-button>
						<el-button  disabled v-else>今日已领取</el-button>
						<div style='height:20px;'></div>
					</div>
				</div>
			</el-col>
			<el-col :span="4">
				<h2 class="freshaccount"><i class="iconfont icon-shuaxin"></i>刷新余额/套餐信息</h2>
			</el-col>
		</el-row>
		<el-row class="dingzhi" v-if="items.see_dingzhi">
			<el-col :span="2">&nbsp;</el-col>
			<el-col :span="12">
				<div class="survey_content">
					<div class="line1" style="display: block;">
						<span class="left balance_money">
							<a>当前套餐信息</a>
							<a id="balance">{{this.items.taocaninfo.package.name}}</a>
						</span>
						<div class="right">
							<a>{{this.items.taocaninfo.package.ipTimelong.name}}</a>
							<a>当日剩余IP：<strong>{{this.items.taocaninfo.remain}}</strong></a>
							<a>每日最多{{items.taocaninfo.ipcount}}个</a>
							<a>套餐购买时间：{{items.taocaninfo.buy_time}}</a>
							<a>套餐生效时间：{{items.taocaninfo.start_time}}</a>
							<a>套餐到期时间：{{items.taocaninfo.end_time}}</a>
						</div>
						<div style='height:20px;'></div>
					</div>
				</div>
			</el-col>
			
		</el-row>
		<el-row>
			<el-col :span="2">&nbsp;</el-col>
			<el-col :span="2">
				<div class="grid-content bg-purple-dark">
					<h3>IP时长</h3>
				</div>
			</el-col>
			<el-col :span="20">
				<div class="ip_time">
					<el-radio-group v-model="items.timelong" size="medium">
						<el-radio v-for="time in items.timelongList" :label="time.alias_id" :key="time.alias_id" v-if="time.is_show" border>{{time.name}}
							<span class="api_whenlong">{{time.desc}}</span>
						</el-radio>
					</el-radio-group>
				</div>
			</el-col>
			
		</el-row>
		<el-row>
			<el-col :span="2">&nbsp;</el-col>
			<el-col :span="3">
				<div class="grid-content bg-purple-dark">
					<h3>提取数量</h3>
				</div>
			</el-col>
			<el-col :span="15">
				<div class="block">
					<el-slider v-model="items.ip_count" show-input :min="1" :max="200">
					</el-slider>
				</div>
			</el-col>
		
		</el-row>

		<el-row>
			<el-col :span="2">&nbsp;</el-col>
			<el-col :span="2">
				<div class="grid-content bg-purple-dark">
					<h3>代理类型</h3>
				</div>
			</el-col>
			<el-col :span="20">
				<div class="proxy_type">
					<el-radio-group v-model="items.proxy_type" size="medium">
						<el-radio label="0" >HTTP/HTTPS</el-radio>
						<el-radio label="1" >SOCKS5</el-radio>
					</el-radio-group>
				</div>
			</el-col>
			
		</el-row>
		<el-row>
			<el-col :span="2">&nbsp;</el-col>
			<el-col :span="2">
				<div class="grid-content bg-purple-dark">
					<h3>地区</h3>
				</div>
			</el-col>
			<el-col :span="20">
				<div class="area">
					<el-radio-group v-model="items.area" size="medium" @change="(value)=>seenProvince(value)">
						<el-radio label="1" >全国混拨</el-radio>
						<el-radio label="2" >指定省份</el-radio>
						<el-radio label="3" >指定城市</el-radio>
					</el-radio-group>
				</div>
				<div class="province" v-if="items.seen_province">
					<el-radio-group v-model="items.select_province" size="medium" @change="(value)=>selectCity(value)">
						<el-radio v-for="item in items.province" :label="item.code" :key="item.id">{{item.name}}</el-radio>
					</el-radio-group>
				</div>
				<div class="city" v-if="items.seen_city">
					<el-select v-model="items.select_province" placeholder="请选择省份" @change="(value)=>selectCity(value)">
						<el-option v-for="item in items.province" :label="item.name" :value="item.code" :key="item.id"></el-option>
					</el-select>
					<el-select v-model="items.select_city" placeholder="请选择城市">
						<el-option v-for="item in items.city" :label="item.name" :value="item.code" :key="item.id"></el-option>
					</el-select>
				</div>
			</el-col>
			
		</el-row>
		
		<!--
        	运营商
        -->
        <el-row>
			<el-col :span="2">&nbsp;</el-col>
			<el-col :span="2">
				<div class="grid-content bg-purple-dark">
					<h3>运营商</h3>
				</div>
			</el-col>
			<el-col :span="20">
				<div class="ip_quchong">
					<el-radio-group v-model="items.ip_isp" size="medium">
						<el-radio label="-1" >全部</el-radio>
						<el-radio label="0" >电信</el-radio>
						<el-radio label="2" >移动</el-radio>
						<el-radio label="3" >联通</el-radio>
					</el-radio-group>
				</div>
			</el-col>
			
		</el-row>
		
		<el-row>
			<el-col :span="2">&nbsp;</el-col>
			<el-col :span="2">
				<div class="grid-content bg-purple-dark">
					<h3>分隔符</h3>
				</div>
			</el-col>
			<el-col :span="20">
				<div class="result_type">
					<el-radio-group v-model="items.separator" size="medium" @change="(value)=>separator(value)">
<el-radio v-for="item in separatorList" :label="item.id" :key="item.id" >{{item.name}}
						</el-radio>
					</el-radio-group>
					<input v-model="items.other" v-if="items.seen_separator" style="width:50px;border: 0px;outline:none;cursor: pointer;border-bottom: 1px solid black;margin-left:10px;">
				</div>
			</el-col>
			
		</el-row>
		
		<el-row>
			<el-col :span="2">&nbsp;</el-col>
			<el-col :span="2">
				<div class="grid-content bg-purple-dark">
					<h3>结果类型</h3>
				</div>
			</el-col>
			<el-col :span="20">
				<div class="result_type">
					<el-radio-group v-model="items.result_type" size="medium">
						<el-radio label="txt" >TXT</el-radio>
						<el-radio label="json" >JSON</el-radio>
					</el-radio-group>
				</div>
			</el-col>
			
		</el-row>
		<el-row>
			<el-col :span="2">&nbsp;</el-col>
			<el-col :span="2">
				<div class="grid-content bg-purple-dark">
					<h3>IP去重</h3>
				</div>
			</el-col>
			<el-col :span="20">
				<div class="ip_quchong">
					<el-radio-group v-model="items.ip_quchong" size="medium">
						<el-radio label="0" >不去重</el-radio>
						<el-radio label="1" >当日去重</el-radio>
						<el-radio label="2" >当周去重</el-radio>
					</el-radio-group>
				</div>
			</el-col>
			
		</el-row>
		<el-row>
			<el-col :span="2">&nbsp;</el-col>
			<el-col :span="2">
				<div class="grid-content bg-purple-dark">
					<h3>结果定制</h3>
				</div>
			</el-col>
			<el-col :span="20">
				<div class="st_con">
						<el-checkbox label="ip" v-model="items.ip_port" disabled>IP:Port</el-checkbox>
						<el-checkbox label="1" v-model="items.show_city" >城市</el-checkbox>
						<el-checkbox label="1" v-model="items.show_carrier" >运营商</el-checkbox>
						<el-checkbox label="1" v-model="items.show_expire" >过期时间</el-checkbox>
				</div>
			</el-col>
			
		</el-row>
		<el-row>
			<el-col :span="2">&nbsp;</el-col>
			<el-col :span="2">
				<div class="grid-content bg-purple-dark">
					<h3>匿名度</h3>
				</div>
			</el-col>
			<el-col :span="20">
				<div>
					<el-checkbox v-model="items.nimingdu" disabled>高匿名</el-checkbox>
				</div>
			</el-col>
			
		</el-row>
		<el-row>
			<el-col :span="8">&nbsp;</el-col>
			<el-col :span="4">
				<el-button style="background-color: #166FCD;color: #fff;width: 80%;height: 50px;" @click="createurl">生成API链接</el-button>
			</el-col>
			<el-col :span="3">
				<el-button style="background-color: #959595;color: #fff;width: 80%;height: 50px;">重置</el-button>
			</el-col>	
			
		</el-row>
		<div style="height:50px;"></div>
		<el-row>
			<el-col :span="1">&nbsp;</el-col>
			<el-col :span="20">
				<h2 class="title">API链接 <span class="text">(请复制下面的链接地址，在新的浏览器或标签页打开并查看)</span></h2>
			</el-col>	
			
		</el-row>
		<el-row>
			<el-col :span="1">&nbsp;</el-col>
			<el-col :span="17">
				<el-input v-model="ip_url" placeholder="点击上方按钮,生成API链接"></el-input>
			</el-col>
			<el-col :span="1">&nbsp;</el-col>
			<el-col :span="5">
				<el-button type="primary" plain v-clipboard:copy="ip_url" v-clipboard:success="onCopy" v-clipboard:error="onError">复制链接</el-button>
				<el-button type="primary" plain @click="openurl">打开链接</el-button>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="1">&nbsp;</el-col>
			<el-col :span="22">
				<div class="explain">
					<p style="color: #167EF1;margin-left: 20px;font-size: 16px;">API链接参数说明</p>
					<ul>
					 <li><a>type</a><span>提取方式</span></li>
					 <li><a>iptimelong</a><span>IP时长</span></li>
					 <li><a>ipcount</a><span>提取数量</span></li>
					 <li><a>protocol</a><span>协议类型(http/https,socket)</span></li>
					 <li style="width:35%;"><a>areatype</a><span>地区类型(全国混拨,指定省份,指定城市)</span></li>
					 <li style="width:25%;"><a>area</a><span>省份或城市代码</span></li>
					 <li><a>resulttype</a><span>数据格式(txt,json)</span></li>
					 <li><a>duplicate</a><span>去重周期</span></li>
					 <li><a>separator</a><span>分隔符(other:其他分隔符)</span></li>
					 <li><a>show_city</a><span>是否显示城市</span></li>
					 <li><a>show_carrier</a><span>是否显示运营商</span></li>
					 <li><a>show_expire</a><span>是否显示有效期</span></li>
					 <li><a>show_public_ip</a><span>是否显示出口IP</span></li>
					 <li><a>replace_ip</a><span>是否更换IP(按并发量)</span></li>
				 </ul>
				</div>
			</el-col>	
			<el-col :span="1">&nbsp;</el-col>
		</el-row>
		<el-row>
			<el-col :span="1">&nbsp;</el-col>
			<el-col :span="22">
				<h2 class="examples_h2 title">返回结果示例</h2>
				<div class="examples">
					<pre>
	[{
		"domain": "36.27.215.15",
		"ip_port": "10013",
		"ip": "36.27.215.15:10013",
		"isp": "\u79fb\u52a8",
		"city": "\u6e56\u5357\u7701unknown",
		"expire_time": "2018-08-21 15:46:37"
	}, {
		"domain": "36.27.215.15",
		"ip_port": "10014",
		"ip": "36.27.215.15:10014",
		"isp": "\u7535\u4fe1",
		"city": "\u6cb3\u5317\u7701\u77f3\u5bb6\u5e84\u5e02",
		"expire_time": "2018-08-21 15:46:37"
	}, {
		"domain": "36.27.215.15",
		"ip_port": "10015",
		"ip": "36.27.215.15:10015",
		"isp": "\u7535\u4fe1",
		"city": "\u798f\u5efa\u7701\u6cc9\u5dde\u5e02",
		"expire_time": "2018-08-21 15:46:37"
	}]
					</pre>
				</div>
			</el-col>	
			<el-col :span="1">&nbsp;</el-col>
		</el-row>

		<el-row>
			<el-col :span="1">&nbsp;</el-col>
			<el-col :span="22">
				<h2 class="examples_h2 title">使用方法</h2>
				<div class="examples">
					<p class="example_p">
              <span>* 生成API链接，直接用浏览器或者调用Http Get请求即可返回结果</span>
              <span style ='word-break: break-word'>* 可以直接按照以下格式组合所需的API链接：http://too.ueuz.com/frontapi/public/http/get_ip/index?type=-1&iptimelong=1&ipcount=1&protocol=0&areatype=1&area=&resulttype=txt&duplicate=0&separator=2
							&other=&show_city=0&show_carrier=0&show_expire=0&auth_key=7f722a5ba0829b330c0b7cfde8107235&times
							tamp=1534837569&sign=9C46144DEDA37985D9500EB7DD8770FF</span>
			  <span>* 必选参数type提取方式，ipcount提取数量，protocol协议类型，duplicate去重周期</span>
			  <span>* 提取数量不等于最终实际获取的ip数量，根据时段，套餐和网络状况不同，实际获取的ip数量可能小于填写的获取数，最终扣费以实际获取数量计费。</span>
          	  <span>
				*去重模式：<br>
				<span style="line-height:30px;">
					&nbsp;当日去重：当日IP基本不重复<br>
					&nbsp;当周去重：当周IP基本不重复<br>
					&nbsp;不去重：IP有可能会重复；<br>
				</span>
          	  </span>
          	  <span>* 获取IP成功即扣费</span>
          	  <span>* 如要提取到最大的ip总量,建议:固定均匀地获取,使用小数量小间隔(3-5秒)</span>
          </p>
				</div>
			</el-col>	
			<el-col :span="1">&nbsp;</el-col>
		</el-row>
		<div style="height:50px;"></div>
		</div>
		<div style="height:150px;"></div>
	</div>
	<yz-footer></yz-footer>
</div>
</template>

<script>
	import header from '../http/Head'
	import footer from '../http/Footer'
	export default {
		inject: ['reload'],
		name: 'Login',
		components: {
			'yz-header': header,
			'yz-footer':footer
		},
		data() {
			return {
				items: {
					tiqu: '-1',
					taocan: 1,
					balance:0,
					tip:'当前账户余额（亿洲币）',
					timelongList:'',
					timelong:1,
					packagelist:[],
					ip_count: 1,
					proxy_type: '0',
					area: '1',
					select_province:'110000',
					select_city:'',
					province:'',
					city:'',
					seen_province:false,
					seen_city:false,
					see_dingzhi:false,
					see_putong:true,
					seen_separator:false,
					result_type:'txt',
					ip_quchong:'0',
					ip_isp:'-1',
					st_con:['ip'],
					nimingdu:true,
					ip_port:true,
					httpfree:'',
					taocaninfo:'',
					separator:1,
					other:'',
					show_city:0,
					show_carrier:0,
					show_expire:0
				},
				ip_url:'',
				apiInfo:[],
				separatorList:[{id:1,name:'回车(\\r\\n)'},{id:2,name:'换行(/br)'},{id:3,name:'回车(\\r)'},{id:4,name:'换行(\\n)'},{id:5,name:'Tab(\\t)'},{id:6,name:'其他字符'}]
			}
		},
		metaInfo: {
			title: '代理ip提取_短效-亿洲网络', // set a title
			meta: [{ // set meta
				name: 'Keywords',
				content: '代理ip地址'
			},{ // set meta
				name: 'Description',
				content: '海量ip覆盖国内300+城市,所有ip均为高匿名,保证您的隐私安全,连接稳定速度快'
			}]
		},
		methods: {
			onCopy: function(e) {
				this.$message({
								message: '复制成功',
								type: 'success'
							});
			},
			onError: function(e) {
				this.$message({
								message: '复制成功',
								type: 'success'
							});
			},
			recharge:function(){
				this.$router.push('/pay/payshort');
			},
			separator:function(value){
				this.items.other = ''
				if(value==6){
					this.items.seen_separator = true
				}else{
					this.items.seen_separator = false
				}
			},
			seenProvince:function(value){
				if(value=='2'){
					this.items.seen_province=true
				}else{
					this.items.seen_province=false
				}
				if(value=='3'){
					this.items.seen_city=true
				}else{
					this.items.seen_city=false
				}
			},
			selectCity:function(value){
				for(var i = 0;i<this.items.province.length;i++){
					var item = this.items.province[i]
					if(value==item.code){
						if(item.child){
							this.items.city=item.child
							this.items.select_city = item.child[0].code
						}else{
							this.items.city=[]
							this.items.select_city = ''
						}
					}
				}
			},
			taocanName:function(name,count,timelong){
				return name+'('+count+'IP/天)　　'+timelong
			},
			switchTaocan:function(value){
				
				if(value<0){
					this.items.see_putong=true
					this.items.see_dingzhi=false
					if(!this.$fun.isEmpty(this.apiInfo)){
					this.items.timelongList = this.cloneObj(this.apiInfo.timelongList)
					this.items.timelong = this.items.timelongList[0].alias_id
					this.items.tip = '当前账户余额（亿洲币）'
					this.items.balance = this.apiInfo.balance
					}
				}else{
					this.items.timelongList = this.cloneObj(this.apiInfo.timelongList)
					for(var z = 0;z<this.items.packagelist.length;z++){
						if(this.items.packagelist[z].id==value){
							this.items.taocaninfo = this.items.packagelist[z]
							
							for(var i = 0;i<this.items.timelongList.length;i++){
								if(this.items.timelongList[i].alias_id!=this.items.packagelist[z].package.ip_longtime){
									this.items.timelongList[i].is_show=false
									
								}else{
									this.items.timelongList[i].is_show=true
									this.items.timelong = this.items.timelongList[i].alias_id
									
								}
								
							}

						}
					}
					this.items.see_putong=false
					this.items.see_dingzhi=true
				}
			},
			cloneObj:function(obj){
				var str, newobj = obj.constructor === Array ? [] : {};
				if(typeof obj !== 'object'){
					return;
				} else if(window.JSON){
					str = JSON.stringify(obj), //序列化对象
					newobj = JSON.parse(str); //还原
				} else {
					for(var i in obj){
						newobj[i] = typeof obj[i] === 'object' ? cloneObj(obj[i]) : obj[i]; 
					}
				}
				return newobj;
			},
			createurl:function(){
				let area='';
				if(this.items.area==2){
					area = this.items.select_province
				}else if(this.items.area ==3){
					area = this.items.select_city
				}
				var data={
					type:this.items.tiqu,
					ipcount:this.items.ip_count,
					iptimelong:this.items.timelong,
					protocol:this.items.proxy_type,
					areatype:this.items.area,
					area:area,
					resulttype:this.items.result_type,
					separator:this.items.separator,
					other:this.items.other,
					duplicate:this.items.ip_quchong,
					show_city:this.items.show_city,
					show_carrier:this.items.show_carrier,
					show_expire:this.items.show_expire,
					isp:this.items.ip_isp,
				}
				this.$http.post(this.$config.host+'http/get_ip/createurl',this.$qs.stringify(data)).then(
					response => {
						/*如果有来源登录成功返回来源*/
						var res = response.data

						if(res.state == 1) {
							if(res.msg=='auth_key不存在'){
								this.$alert('还未登录，请先登录', '提示', {
								confirmButtonText: '确定',
								callback: action => {
									this.$router.push('/user/login')
								}
							})
							}else{
								this.$message({
								message: res.msg,
								type: 'error'
							});
							}
							
						} else if(res.state == 0) {
							this.ip_url = res.data.url
						}
					})
			},
			openurl:function(){
				window.open(this.ip_url);
			},
			getFree:function(){
				this.$http.get(this.$config.host+'http/get_ip/freeIp').then(
					response=>{
						var res = response.data
						if(res.state==1){
							this.$message({
								message: res.msg,
								type: 'error'
							});
						}else{
							this.$message({
								message: res.msg,
								type: 'success'
							});
							this.reload()
						}
					}
				)
			}
		},
		created:function(){
			this.$http.get(this.$config.host+'http/index/getTimelongList').then(
				response => {
					let res = response.data
					
					this.items.timelongList = res.data.timelongList
					this.items.province = res.data.areaList
					this.items.select_province = this.items.province[0].code
					this.items.city = res.data.areaList[0].child
					this.items.select_city = this.items.city[0].code
				})
			this.$http.get(this.$config.host+'http/get_ip/info').then(
				response => {
					let res = response.data
					if(!this.$fun.isEmpty(res.data)){
						this.items.timelongList = res.data.timelongList
						this.apiInfo = this.cloneObj(res.data)
						this.items.province = res.data.areaList
						this.items.select_province = this.items.province[0].code
						this.items.city = res.data.areaList[0].child
						this.items.select_city = this.items.city[0].code
						this.items.balance = res.data.balance
						this.items.packagelist = res.data.packagelist
						this.items.httpfree = res.data.httpfree
					}
					
				})
		
		}
	}
</script>

<style scoped>
	@import url('../../assets/css/http/getip.css');

</style>
