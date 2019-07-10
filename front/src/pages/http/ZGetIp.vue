<template>
	<div>
		<yz-header></yz-header>
		<div style="margin-top:100px;"></div>
		<el-row>
			<el-col :span="4">&nbsp;</el-col>
			<el-col :span="16">
				<div class="grid-content bg-purple-dark">
					<h2>提取IP/生成IP(短时效)</h2>
					<hr>
				</div>
			</el-col>
			<el-col :span="4">&nbsp;</el-col>
		</el-row>
		<el-row>
			<el-col :span="7">&nbsp;</el-col>
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
						<el-option v-for="packages in items.packagelist" :label="taocanName(packages.package.name,packages.ipcount,packages.package.ipTimelong.name)" :value="packages.id" :key="packages.id"></el-option>
					</el-select>
				</div>
			</el-col>
			<el-col :span="7">&nbsp;</el-col>
		</el-row>
		<el-row>
			<el-col :span="7">&nbsp;</el-col>
			<el-col :span="3">
				<div class="grid-content bg-purple-dark">
					<h3>账户概况</h3>
				</div>
			</el-col>
			<el-col :span="7">&nbsp;</el-col>
			<el-col :span="7">
				<span class="freshaccount">刷新余额/套餐信息</span>
			</el-col>
		</el-row>
		<el-row class="putong" v-if="items.see_putong">
			<el-col :span="7">&nbsp;</el-col>
			<el-col :span="12">
				<div class="survey_content">
					<div class="line1" style="display: block;">
						<span class="left balance_money">
							<a>{{items.tip}}</a>
							<a id="balance">{{items.balance}}</a>
						</span>
						<el-button type="primary" @click="recharge">立即充值</el-button>
						
						<el-button type="primary" @click="getFree" v-if="items.httpfree.state==0">领取每日免费IP</el-button>
						<el-button type="primary" disabled v-else>今日已领取</el-button>
						<div style='height:20px;'></div>
					</div>
				</div>
			</el-col>
			<el-col :span="5">&nbsp;</el-col>
		</el-row>
		<el-row class="dingzhi" v-if="items.see_dingzhi">
			<el-col :span="7">&nbsp;</el-col>
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
			<el-col :span="5">&nbsp;</el-col>
		</el-row>
		<el-row>
			<el-col :span="7">&nbsp;</el-col>
			<el-col :span="1">
				<div class="grid-content bg-purple-dark">
					<h3>IP时长</h3>
				</div>
			</el-col>
			<el-col :span="12">
				<div class="ip_time">
					<el-radio-group v-model="items.timelong" size="medium">
						<el-radio v-for="time in items.timelongList" :label="time.alias_id" :key="time.alias_id" v-if="time.is_show" border>{{time.name}}
							<span class="api_whenlong">{{time.desc}}</span>
						</el-radio>
					</el-radio-group>
				</div>
			</el-col>
			<el-col :span="4">&nbsp;</el-col>
		</el-row>
		<el-row>
			<el-col :span="7">&nbsp;</el-col>
			<el-col :span="2">
				<div class="grid-content bg-purple-dark">
					<h3>提取数量</h3>
				</div>
			</el-col>
			<el-col :span="10">
				<div class="block">
					<el-slider v-model="items.ip_count" show-input :min="1" :max="200">
					</el-slider>
				</div>
			</el-col>
			<el-col :span="5">&nbsp;</el-col>
		</el-row>
		<el-row>
			<el-col :span="8">&nbsp;</el-col>
			<el-col :span="9">
				<div class="api_whenlong_tip" style="margin-left:160px;margin-top:3px;">
					<span>———————为了保证ip时效性，建议按需填写，分批提取———————</span>
				</div>
			</el-col>
			<el-col :span="7">&nbsp;</el-col>
		</el-row>
		<el-row>
			<el-col :span="7">&nbsp;</el-col>
			<el-col :span="1">
				<div class="grid-content bg-purple-dark">
					<h3>代理类型</h3>
				</div>
			</el-col>
			<el-col :span="12">
				<div class="proxy_type">
					<el-radio-group v-model="items.proxy_type" size="medium">
						<el-radio label="0" border>HTTP/HTTPS</el-radio>
						<el-radio label="1" border>SOCKS5</el-radio>
					</el-radio-group>
				</div>
			</el-col>
			<el-col :span="4">&nbsp;</el-col>
		</el-row>
		<el-row>
			<el-col :span="7">&nbsp;</el-col>
			<el-col :span="1">
				<div class="grid-content bg-purple-dark">
					<h3>地区</h3>
				</div>
			</el-col>
			<el-col :span="12">
				<div class="area">
					<el-radio-group v-model="items.area" size="medium" @change="(value)=>seenProvince(value)">
						<el-radio label="1" border>全国混拨</el-radio>
						<el-radio label="2" border>指定省份</el-radio>
						<el-radio label="3" border>指定城市</el-radio>
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
			<el-col :span="4">&nbsp;</el-col>
		</el-row>
		
		<el-row>
			<el-col :span="7">&nbsp;</el-col>
			<el-col :span="1">
				<div class="grid-content bg-purple-dark">
					<h3>分隔符</h3>
				</div>
			</el-col>
			<el-col :span="12">
				<div class="result_type">
					<el-radio-group v-model="items.separator" size="medium" @change="(value)=>separator(value)">
<el-radio v-for="item in separatorList" :label="item.id" :key="item.id" border>{{item.name}}
						</el-radio>
					</el-radio-group>
					<input v-model="items.other" v-if="items.seen_separator" style="width:50px;border: 0px;outline:none;cursor: pointer;border-bottom: 1px solid black;margin-left:10px;">
				</div>
			</el-col>
			<el-col :span="4">&nbsp;</el-col>
		</el-row>
		
		<el-row>
			<el-col :span="7">&nbsp;</el-col>
			<el-col :span="1">
				<div class="grid-content bg-purple-dark">
					<h3>结果类型</h3>
				</div>
			</el-col>
			<el-col :span="12">
				<div class="result_type">
					<el-radio-group v-model="items.result_type" size="medium">
						<el-radio label="txt" border>TXT</el-radio>
						<el-radio label="json" border>JSON</el-radio>
					</el-radio-group>
				</div>
			</el-col>
			<el-col :span="4">&nbsp;</el-col>
		</el-row>
		<el-row>
			<el-col :span="7">&nbsp;</el-col>
			<el-col :span="1">
				<div class="grid-content bg-purple-dark">
					<h3>IP去重</h3>
				</div>
			</el-col>
			<el-col :span="12">
				<div class="ip_quchong">
					<el-radio-group v-model="items.ip_quchong" size="medium">
						<el-radio label="0" border>不去重</el-radio>
						<el-radio label="1" border>当日去重</el-radio>
						<el-radio label="2" border>当周去重</el-radio>
					</el-radio-group>
				</div>
			</el-col>
			<el-col :span="4">&nbsp;</el-col>
		</el-row>
		<el-row>
			<el-col :span="7">&nbsp;</el-col>
			<el-col :span="1">
				<div class="grid-content bg-purple-dark">
					<h3>结果定制</h3>
				</div>
			</el-col>
			<el-col :span="12">
				<div class="st_con">
						<el-checkbox label="ip" v-model="items.ip_port" disabled>IP:Port</el-checkbox>
						<el-checkbox label="1" v-model="items.show_city" >城市</el-checkbox>
						<el-checkbox label="1" v-model="items.show_carrier" >运营商</el-checkbox>
						<el-checkbox label="1" v-model="items.show_expire" >过期时间</el-checkbox>
				</div>
			</el-col>
			<el-col :span="4">&nbsp;</el-col>
		</el-row>
		<el-row>
			<el-col :span="7">&nbsp;</el-col>
			<el-col :span="1">
				<div class="grid-content bg-purple-dark">
					<h3>匿名度</h3>
				</div>
			</el-col>
			<el-col :span="12">
				<div>
					<el-checkbox v-model="items.nimingdu" disabled>高匿名</el-checkbox>
				</div>
			</el-col>
			<el-col :span="4">&nbsp;</el-col>
		</el-row>
		<el-row>
			<el-col :span="10">&nbsp;</el-col>
			<el-col :span="2">
				<el-button type="primary" @click="createurl">生成API链接</el-button>
			</el-col>
			<el-col :span="6">
				<el-button>刷新</el-button>
			</el-col>	
			<el-col :span="6">&nbsp;</el-col>
		</el-row>
		<div style="height:50px;"></div>
		<el-row>
			<el-col :span="7">&nbsp;</el-col>
			<el-col :span="8">
				<p class="text"><strong>API链接</strong> (请复制下面的链接地址，在新的浏览器或标签页打开并查看)</p>
			</el-col>	
			<el-col :span="7">&nbsp;</el-col>
		</el-row>
		<el-row>
			<el-col :span="7">&nbsp;</el-col>
			<el-col :span="8">
				<el-input v-model="ip_url" placeholder="点击上方按钮,生成API链接"></el-input>
			</el-col>
			<el-col :span="1">&nbsp;</el-col>
			<el-col :span="8">
				<el-button type="primary" plain v-clipboard:copy="ip_url" v-clipboard:success="onCopy" v-clipboard:error="onError">复制链接</el-button>
				<el-button type="primary" plain @click="openurl">打开链接</el-button>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="7">&nbsp;</el-col>
			<el-col :span="11">
				<div class="explain">
					<p>API链接参数说明</p>
					<ul>
					 <li><a>type</a><span>提取方式</span></li>
					 <li><a>iptimelong</a><span>IP时长</span></li>
					 <li><a>ipcount</a><span>提取数量</span></li>
					 <li><a>protocol</a><span>协议类型(http/https,socket)</span></li>
					 <li><a>areatype</a><span>地区类型(全国混拨,指定省份,指定城市)</span></li>
					 <li><a>area</a><span>省份或城市代码</span></li>
					 <li><a>resulttype</a><span>数据格式(txt,json)</span></li>
					 <li><a>duplicate</a><span>去重周期</span></li>
					 <li><a>separator</a><span>分隔符(other:其他分隔符)</span></li>
					 <li><a>show_city</a><span>是否显示城市</span></li>
					 <li><a>show_carrier</a><span>是否显示运营商</span></li>
					 <li><a>show_expire</a><span>是否显示有效期</span></li>
				 </ul>
				</div>
			</el-col>	
			<el-col :span="6">&nbsp;</el-col>
		</el-row>
		<el-row>
			<el-col :span="7">&nbsp;</el-col>
			<el-col :span="11">
				<h2 class="examples_h2">返回结果示例</h2>
				<div class="examples">
					<p>
						[{"domain":"36.27.215.15","ip_port":"10013","ip":"36.27.215.15:10013","isp":"\u79fb\u52a8","city":"\u6e56\u5357\u7701unknown","expire_time":"2018-08-21 15:46:37"},{"domain":"36.27.215.15","ip_port":"10014","ip":"36.27.215.15:10014","isp":"\u7535\u4fe1","city":"\u6cb3\u5317\u7701\u77f3\u5bb6\u5e84\u5e02","expire_time":"2018-08-21 15:46:37"},{"domain":"36.27.215.15","ip_port":"10015","ip":"36.27.215.15:10015","isp":"\u7535\u4fe1","city":"\u798f\u5efa\u7701\u6cc9\u5dde\u5e02","expire_time":"2018-08-21 15:46:37"}]
					</p>
				</div>
			</el-col>	
			<el-col :span="6">&nbsp;</el-col>
		</el-row>
		<el-row>
			<el-col :span="7">&nbsp;</el-col>
			<el-col :span="11">
				<div class="explain" style="height:180px;">
					<p>结果字段说明</p>
					<ul>
						 <li><a>state</a><span>如果失败的话会返回state</span></li>
						 <li><a>msg</a><span>如果失败的话会返回错误原因</span></li>
						 <li><a>domain</a><span>IP地址</span></li>
						 <li><a>ip_port</a><span>端口</span></li>
						 <li><a>ip</a><span>IP地址拼接</span></li>
						 <li><a>isp</a><span>运营商</span></li>
						 <li><a>city</a><span>所属城市</span></li>
						 <li><a>expire_time</a><span>有效期</span></li>
					</ul>
				</div>
			</el-col>	
			<el-col :span="6">&nbsp;</el-col>
		</el-row>
		<el-row>
			<el-col :span="7">&nbsp;</el-col>
			<el-col :span="11">
				<h2 class="examples_h2">使用方法</h2>
				<div class="examples">
					<p class="example_p">
              <span>* 生成API链接，直接用浏览器或者调用Http Get请求即可返回结果</span>
              <span>* 可以直接按照以下格式组合所需的API链接：http://too.ueuz.com/frontapi/public/http/get_ip/index?type=-1&iptimelong=1&ipcount=1&protocol=0&areatype=1&area=&resulttype=txt&duplicate=0&separator=2
							&other=&show_city=0&show_carrier=0&show_expire=0&auth_key=7f722a5ba0829b330c0b7cfde8107235&times
							tamp=1534837569&sign=9C46144DEDA37985D9500EB7DD8770FF</span>
			  <span>* 必选参数type提取方式，ipcount提取数量，protocol协议类型，duplicate去重周期</span>
			  <span>* 提取数量不等于最终实际获取的ip数量，根据时段，套餐和网络状况不同，实际获取的ip数量可能小于填写的获取数，最终扣费以实际获取数量计费。</span>
          	  <span>
				*去重模式：<br>
				<span style="font-size:12px;font-family:SimSun;line-height:20px;">
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
			<el-col :span="6">&nbsp;</el-col>
		</el-row>
		<div style="height:150px;"></div>
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
					show_expire:this.items.show_expire
				}
				this.$http.post(this.$config.host+'http/zhangyu_get_ip/createurl',this.$qs.stringify(data)).then(
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
				this.$http.get(this.$config.host+'http/zhangyu_get_ip/freeIp').then(
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
			this.$http.get(this.$config.host+'http/zhangyu_get_ip/info').then(
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
	.el-row {
		margin-top: 30px;
	}

	.el-row .grid-content h3 {
		float: left;
		width: 100px;
		margin-right: 20px;
		font-size: 14px;
		color: #000;
		height: 30px;
		line-height: 30px;
		font-weight: 700;
		text-align: left;
	}

	.el-select {
		width: 70%;
	}

	.freshaccount {
		height: 30px;
		line-height: 30px;
		color: #50a5fe;
		font-weight: 700;
		padding-top: 20px;
	}
	.survey_content {
		margin-bottom: 30px;
		width: 100%;
		height: auto;
		background-color: #fff;
		box-shadow: 1px 1px 14px 2px rgba(55, 71, 84, 0.13);
	}

	.survey_content .line1 {
		width: 100%;
		height: auto;
		padding: 30px 0 20px 0;
		background: url(../../assets/repeat-x.png) repeat-x 0px bottom;
	}
	.dingzhi .survey_content .line1{
		height:100px;
	}

	.survey_content .line1 .left {
		position: relative;
		margin-left: 25px;
		margin-right: 50px;
		float: left;
	}

	.survey_content .line1 .left a {
		display: block;
		font-size: 12px;
		color: #aaa;
	}

	.survey_content .line1 .left a#balance {
		margin-top: 5px;
		font-size: 31px;
		color: #2696ff;
	}
	.dingzhi .survey_content .line1 .right{
		position: relative;
		float: right;
		margin-right:15px;
	}
	.dingzhi .survey_content .line1 .right a{
		display: block;
		color: #aaa;
		text-decoration: none;
		font-size: 12px;
	}
	.dingzhi .survey_content .line1 .right a strong{
		font-size: 18px;
		color: black;
		font-weight: 500;
	}
	.survey_content .line1 .el-button {
		margin-left: 20px;
	}

	.api_whenlong {
		margin: 10px 0 10px 25px;
		display: block;
		font-size: 12px;
		color: #aaa;
	}

	.ip_time .el-radio {
		height: 60px !important;
		width:200px;
	}

	.api_whenlong_tip {
		margin: 10px 0 10px 25px;
		display: block;
		font-size: 12px;
		color: #aaa;
		position: relative;
		float: left;
		text-align: left;
		width: 80%;
	}
	.el-slider{
		margin-top:10px;
	}
	.el-radio {
		margin-left: 30px !important;
		margin-top:10px;
	}
	.province{
		border: 1px solid #ccc;
		margin-top:20px;
		width:60%;
		padding:20px 20px;
	}
	.province .el-radio{
		margin-top:20px;
	}
	.el-checkbox{
		margin:20px 0 0 25px;
	}
	.text{
		font-size: 16px;
	}
	.explain{
		border:1px dashed #ccc;
		padding:10px 15px;
		height: 300px;
	}
	.explain ul li{
		margin: 17px 40px 0 0;
		float: left;
		width: auto;
		height: 20px;
		font-size: 14px;
		color: #444;
		line-height: 20px;
	}
	.explain ul{
		list-style-type:circle;

	}
	.explain ul li a{
		color: #1084fe;
		margin: auto 7px;
		position: relative;
		display: inline-block;
		padding: 0px 5px 2px 5px;
		background-color: #f1f8fc;
		border-radius: 2px;
		line-height: 19px;
		top: -1px;
	}
	.explain ul li span{
		margin: 0;
		padding: 0;
		border: 0;
		outline: 0;
		font-weight: inherit;
		font-style: inherit;
		font-size: 100%;
		font-family: inherit;
		vertical-align: baseline;
	}
	.examples{
		border:1px solid #ccc;
		padding:10px 15px;
	}
	.examples_h2{
		font-weight: 300;
	}
	.example_p{
		padding: 15px;
		min-height: 50px;
		line-height: 35px;
	}
	.example_p span{
		display: block;
	}
	.city{
		margin-top:30px;
	}
	.city .el-select{
		width:200px;
		margin-left:30px;
	}
	@media screen and (max-width: 1590px){
		.explain ul{
			height:350px;
		}
	}
	@media screen and (max-width: 1350px){
		.explain ul{
			height:450px;
		}
	}
	@media screen and (max-width: 1000px){
		.explain ul{
			height:500px;
		}
	}
</style>
