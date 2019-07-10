<template>
	<div>
		<yz-header></yz-header>
		<div class="page-w">
			<div style="height: 20px;"></div>
			<div class="container">
				<yz-user-left></yz-user-left>
				<div class="user-right">
					<div class="user-right-nav">
						<el-breadcrumb separator-class="el-icon-arrow-right">
							<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
							<el-breadcrumb-item :to="{path:'/ucenter/vpncombodetail'}">套餐介绍</el-breadcrumb-item>
							<el-breadcrumb-item :to="{path:'/ucenter/pptpaccount2'}">PPTP帐号(新)</el-breadcrumb-item>
						</el-breadcrumb>
					</div>
					<el-card class="box-card">
						<div>
							<el-select v-model="search.combo_id" placeholder="请选择套餐">
									<el-option
										v-for="item in combo_list"
										:key="item.combo_id"
										:label="item.combo_name"
										:value="item.combo_id">
									</el-option>
								</el-select>
							<el-input placeholder="搜索用户名" v-model="search.keyword" clearable style="width:150px;"></el-input>
							<el-date-picker v-model="search.timerange" type="datetimerange" value-format="yyyy-MM-dd HH:mm:ss" :picker-options="pickerOptions2" range-separator="至" start-placeholder="开始日期"
									end-placeholder="结束日期">
							</el-date-picker>
							<el-button type="primary" @click="search_data()">立即搜索</el-button>
						</div>
						<div style="margin-top: 10px;">
							<el-button type="warning" size="small" @click="goRa">批量切换</el-button>
							<el-button type="warning" size="small" @click="goOff">批量下线</el-button>
							<el-button type="primary" size="small" @click="goCombo">套餐介绍</el-button>
						</div>
						<el-table @sort-change='sortChange' max-height="650" v-loading="loading" ref="multipleTable" :data="vpnList" @selection-change="handleSelectionChange" @select="handleSelectionOption" stripe  style="width: 100%">
							<el-table-column type="selection" width="55"></el-table-column>
							<!--
							<el-table-column width="35">
								<template slot-scope="scope">
									<el-checkbox v-if="scope.row.status != 1" disabled></el-checkbox>
									<el-checkbox @change="(value)=>checkboxchange(scope.row,value)" v-else-if="select_combo_id === 0" ></el-checkbox>
									<el-checkbox @change="(value)=>checkboxchange(scope.row,value)" v-else-if="scope.row.combo_id == select_combo_id && scope.row.ros_domain === select_ros_domain"></el-checkbox>
									<el-checkbox v-else disabled></el-checkbox>
								</template>
							</el-table-column>
							-->
							
							<el-table-column type="expand" width="15">
									<template slot-scope="props">
										<el-form label-position="left" inline class="demo-table-expand" style="width:800px;">
											<el-form-item label="开始时间">
												<span>{{ props.row.vpnUserCombo[0].start_date }}</span>
											</el-form-item>
											<el-form-item label="结束时间">
												<span>{{ props.row.vpnUserCombo[0].end_date }}</span>
											</el-form-item>
											<el-form-item label="当前服务">
												<span>{{ props.row.vpnUserCombo[0].combo_area_string.combo_area_string }}</span>
											</el-form-item>
										</el-form>
									</template>
								</el-table-column>
			
							<el-table-column sortable="custom" prop="login_name" label="用户名" width="100">
							</el-table-column>
							<el-table-column prop="login_pwd" label="密码" width="100">
							</el-table-column>
							<!--
							<el-table-column prop="cost_type_text" label="套餐类型" width="150">
							</el-table-column>
							-->
							<el-table-column sortable="custom" prop="vpnUserCombo[0].vpnCombo.name" label="套餐" width="150">
							</el-table-column>
							<el-table-column prop="ros_domain" label="连接地址" width="150">
							</el-table-column>
							<el-table-column prop="vpnUserCombo[0].combo_area_string.combo_area_reduce" label="当前服务" width="150">
							</el-table-column>
							<!--
							<el-table-column sortable prop="vpnUserCombo[0].start_date" label="开始时间" width="180">
							</el-table-column>
							-->
							<el-table-column sortable="custom" prop="vpnUserCombo[0].end_date" label="结束时间" width="180">
							</el-table-column>
							<el-table-column prop="status_text" fixed="right" label="状态">
								<template slot-scope="scope">
									<el-button size="mini" type="danger" v-if="scope.row.status!=1"">{{scope.row.status_text}}</el-button>
									<el-button size="mini" type="success" v-else>{{scope.row.status_text}}</el-button>
								</template>
							</el-table-column>
							<!--                        
							<el-table-column label="服务" width="140">
								 <template slot-scope="scope">
									<el-button type="primary" size="small" @click="handleComboClick(scope.row)">详情</el-button>
								</template>
							</el-table-column>
							-->

						</el-table>
						<div class="page-list">
							<el-pagination layout="total,prev, pager, next,sizes" :total="total" :page-size="pageSize" :current-page.sync="currentPage" @size-change="handleSizeChange" @current-change="val=>changePage(val)"></el-pagination>
						</div>
					</el-card>
					<!--
										单个切换
									-->
					<el-dialog title="服务切换" :visible.sync="dialogFormVisible" width="30%">
						<el-form>
							<p class="demonstration">套餐名：
								<el-select v-model="ra.combo_id" filterable clearable placeholder="请选择" @change="selectCombo">
									<el-option
											v-for="item in vpnUserComboList"
											:key="item.vpnCombo.id"
											:label="item.vpnCombo.name"
											:value="item.vpnCombo.id">
										</el-option>
								</el-select>
							</p>
							<p class="demonstration">开始时间：
								<el-input placeholder="套餐开始时间" v-model="ra.start_date" :disabled="true" style="width:400px"></el-input>
							</p>
							<p class="demonstration">结束时间：
							<el-input placeholder="套餐结束时间" v-model="ra.end_date" :disabled="true" style="width:400px"></el-input>
							</p>
							<el-form-item label="选择地区">
									<el-select v-model="ra.raIds" filterable multiple collapse-tags placeholder="请选择地区">
										<el-option
											v-for="item in vpnUserComboAreaList"
											:key="item.id"
											:label="item.name"
											:value="item.id"
											>
										</el-option>
									</el-select>
							</el-form-item>
						</el-form>
						<div slot="footer" class="dialog-footer">
							<el-button @click="dialogFormVisible = false">取 消</el-button>
							<el-button type="primary" @click="cutoverServer()">切换</el-button>
							<el-button type="primary" @click="offLine()">下线</el-button>
						</div>
					</el-dialog>
					
					<!--
										批量切换
									-->
					<el-dialog title="服务切换" :visible.sync="dialogFormVisible2" width="30%">
						<el-form v-loading="loading2" >
							<el-form-item label="连接地址:">
								<span>{{assignra.ros_domain}}</span>
							</el-form-item>
							<el-form-item label="套餐名称:">
								<el-select v-model="assignra.combo_id" :disabled="true" filterable placeholder="请选择">
									<el-option
											v-for="item in assign_combo_list"
											:key="item.id"
											:label="item.name"
											:value="item.id">
										</el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="省份选择:">
								<el-select v-model="assignra.provinces" @change="assignProvinceChange" filterable multiple collapse-tags placeholder="请选择省份">
										<el-option
											v-for="item in assign_combo_province_list"
											:key="item.id"
											:label="item.name"
											:value="item.id">
										</el-option>
								</el-select>
								<el-checkbox :indeterminate="isIndeterminate2" v-model="checkAllProvince" @change="handleCheckAllChangeProvince">全选</el-checkbox>
							</el-form-item>
							<el-form-item label="选择地区:">
									<el-select v-model="assignra.raIds" @change="assignAreaChange" filterable multiple collapse-tags placeholder="请选择地区">
										<el-option
											v-for="item in select_combo_area_list"
											:key="item.id"
											:label="item.name"
											:value="item.id"
											:disabled="item.disabled"
											>
										</el-option>
									</el-select>
									<el-checkbox :indeterminate="isIndeterminate" v-model="checkAllArea" @change="handleCheckAllChange">全选</el-checkbox>
							</el-form-item>
						</el-form>
						<div slot="footer" class="dialog-footer">
							<el-button @click="dialogFormVisible2 = false">取 消</el-button>
							<el-button type="primary" @click="goAssignRa()">切换</el-button>
						</div>
					</el-dialog>
					
				</div>
		</div>
		</div>
		<yz-footer></yz-footer>
	</div>
</template>

<script>
	import header from '../http/Head'
	import left from './Left'
	import footer from '../http/Footer'
	export default {
		inject: ['reload'],
		name: 'Login',
		components: {
			'yz-header': header,
			'yz-user-left': left,
			'yz-footer': footer
		},
		data() {
			return {
				pickerOptions2: {
					shortcuts: [{
						text: '最近一周',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
							picker.$emit('pick', [start, end]);
						}
					}, {
						text: '最近一个月',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
							picker.$emit('pick', [start, end]);
						}
					}, {
						text: '最近三个月',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
							picker.$emit('pick', [start, end]);
						}
					}]
				},
				vpn_host:this.$config.vpnhost,
				search:{
					'combo_id':'',
					'keyword':'',
					'timerange':'',
				},
				vpnList: [],
				pageSize: 20,
				currentPage: 1,
				total: 1,
				dialogFormVisible: false,
				dialogFormVisible2: false,
				serverSelect: '',
				multipleSelection: [],
				vpnUserComboList:[],
				vpnUserComboAreaList:[],
				ra:{
					'ros_domain':'',
					'combo_id':'',
					'start_date':'',
					'end_date':'',
					'raIds':'',
				},
				assignra:{
					'ros_domain':'',
					'ids':'',
					'ulist':'',
					'pwdlist':'',
					'combo_id':'',
					'provinces' : '',
					'raIds':'',
				},
				vpnuser:'',
				clientId:'1001',
				select_combo_id:0,
				select_ros_domain:'',
				select_checkbox:[],
				assign_combo_list:[],
				assign_combo_area_list:[],
				select_combo_area_list:[],
				loading:false,
				loading2:false,
				checkAllArea:false,
				isIndeterminate: true,
				checkAllProvince:false,
				isIndeterminate2:true,
				assign_combo_province_list:[],
				combo_list:[],
				order_sort:'',
		  		order_order:'',
			}
		},
		created:function(){
			var keyword = this.$route.query.keyword ? this.$route.query.keyword : ''
			var timerange = this.$route.query.timerange ? this.$route.query.timerange : ''
			this.search.keyword = keyword
			this.search.timerange = timerange
		},
		mounted: function () {
			this.getPageList();
		},
		metaInfo: {
			title: 'PPTP账号-亿洲网络', // set a title
		},
		beforeUpdate: function () {
			var page = this.$route.query.page
			if (this.$fun.isEmpty(page)) {
				this.currentPage = 1
			} else {
				this.currentPage = parseInt(page)
			}
		},
		watch: {
			'$route': 'getPageList',
		},
		methods: {
			sortChange: function(column, prop, order) {
	    		this.order_sort = column.prop
	    		this.order_order = column.order
    			this.getPageList();
			},
			getPageList: function () {
				var page = this.$route.query.page
				if (this.$fun.isEmpty(page)) {
					page = 1;
				}
				var combo_id = this.$route.query.combo_id ? this.$route.query.combo_id : ''
				var keyword = this.$route.query.keyword ? this.$route.query.keyword : ''
				var timerange = this.$route.query.timerange ? this.$route.query.timerange : ''
				var order_sort      = this.$route.query.order_sort ? this.$route.query.order_sort : this.order_sort
				var order_order     = this.$route.query.order_order ? this.$route.query.order_order : this.order_order
				var pagesize        = this.$route.query.pagesize ? this.$route.query.pagesize : this.pageSize
				this.$http.get(this.vpn_host  + 'vpn/userlist', {
					params: {
						'clientId':this.clientId,
						'combo_id' : combo_id,
						'keyword':keyword,
          				'timerange':timerange,
          				'sort':order_sort,
						'order':order_order,
						'pagesize':pagesize,
						'page': page
					}
				}).then(
					response => {
						var res = response.data
						if (res.state == 1) {
							this.$message({
								message: res.msg,
								type: 'error'
							});
						} else if (res.state == 0) {
							this.vpnList = res.data.list.data
							this.pageSize = res.data.list.per_page
							this.total = res.data.list.total
							this.combo_list = res.data.combo_list
						}
					})
			},
			search_data:function(){
				var param ={
					combo_id:this.search.combo_id,
					keyword:this.search.keyword,
          			timerange:this.search.timerange,
          		}
				this.$router.push({path:'/ucenter/pptpaccount2',query:param})
			},
			changePage: function (val) {
				this.select_combo_id = 0
				this.select_ros_domain = ''
				this.select_checkbox = []
				var combo_id = this.$route.query.combo_id ? this.$route.query.combo_id : ''
				var keyword = this.$route.query.keyword ? this.$route.query.keyword : ''
				var timerange = this.$route.query.timerange ? this.$route.query.timerange : ''
				var order_sort      = this.$route.query.order_sort ? this.$route.query.order_sort : this.order_sort
				var order_order     = this.$route.query.order_order ? this.$route.query.order_order : this.order_order
				//this.reload()
				this.$router.push({
					path: '/ucenter/pptpaccount2',
					query: {
						'clientId':this.clientId,
						'combo_id' : combo_id,
						'keyword':keyword,
          				'timerange':timerange,
          				'order_sort':order_sort,
						'order_order':order_order,
						'pagesize':this.pageSize,
						'page': val
					}
				})
			},
			handleSizeChange(val) {
			    this.select_combo_id = 0
				this.select_ros_domain = ''
				this.select_checkbox = []
				var combo_id = this.$route.query.combo_id ? this.$route.query.combo_id : ''
				var keyword = this.$route.query.keyword ? this.$route.query.keyword : ''
				var timerange = this.$route.query.timerange ? this.$route.query.timerange : ''
				var order_sort      = this.$route.query.order_sort ? this.$route.query.order_sort : this.order_sort
				var order_order     = this.$route.query.order_order ? this.$route.query.order_order : this.order_order
				var page     		= this.$route.query.page ? this.$route.query.page : 1
				//this.reload()
				this.$router.push({
					path: '/ucenter/pptpaccount2',
					query: {
						'clientId':this.clientId,
						'combo_id' : combo_id,
						'keyword':keyword,
          				'timerange':timerange,
          				'order_sort':order_sort,
						'order_order':order_order,
						'pagesize':val,
						'page': page
					}
				})
			},
			handleComboClick: function (row) {
				var status = row.status
				if(status !== 1){
					this.$message({
						message: '该帐号禁止操作',
						type: 'error'
					});
				}else{
					this.vpnuser = row
					var user_id = row.id
			    	this.vpnUserComboList = row.vpnUserCombo
			    	this.ra.combo_id = row.combo_id
			    	this.ra.start_date = ''
			    	this.ra.end_date = ''
			    	this.ra.raIds = this.getRaIdsToInt(row.combo_area_id)
			    	this.ra.ros_domain = row.ros_domain
			    	this.vpnUserComboAreaList = ''
			    	this.selectCombo(this.ra.combo_id)
					this.dialogFormVisible = true
				}
			},
			selectCombo:function(value){
				var combo_id = value
				let obj = {};
			    obj = this.vpnUserComboList.find((item)=>{
			          return item.combo_id === value;
			    });
			    this.ra.start_date = obj.start_date
			    this.ra.end_date = obj.end_date
			    this.vpnUserComboAreaList = obj.vpnCombo.combo_area_list
			},
			cutoverServer: function () {
				
				if(this.ra.raIds.length < 1){
					this.$message({
						message: '请选择地区',
						type: 'error'
					});
				}else{
					var data = {
						clientId:this.clientId,
						ros_domain:this.ra.ros_domain,
						ulist: this.vpnuser.login_name,
						pwdlist: this.vpnuser.login_pwd,
						combo_id:this.ra.combo_id,
						raIds:this.ra.raIds.join(','),
					}
					this.$http.post(this.vpn_host + 'vpn/ra', this.$qs.stringify(data)).then(
					response => {
						/*如果有来源登录成功返回来源*/
						var res = response.data

						if (res.state == 1) {
							this.$message({
								message: res.msg,
								type: 'error'
							});
						} else if (res.state == 0) {
							this.$message({
								message: res.msg,
								type: 'success'
							});
							this.dialogFormVisible = false
							this.reload()
						}
					})
				}
			},
			offLine: function () {
				var data = {
					clientId:this.clientId,
					ulist: this.vpnuser.login_name,
					pwdlist: this.vpnuser.login_pwd,
				}
				this.$http.post(this.vpn_host + 'vpn/kiffof', this.$qs.stringify(data)).then(
				response => {
					/*如果有来源登录成功返回来源*/
					var res = response.data

					if (res.state == 1) {
						this.$message({
							message: res.msg,
							type: 'error'
						});
					} else if (res.state == 0) {
						this.$message({
							message: res.msg,
							type: 'success'
						});
					}
				})
			},
			checkUser:function(item){
				
				if(item.vpnUserCombo.length == 0){
					return false
				}else{
					for(var i=0;i<item.vpnUserCombo.length;i++){
						
					}
				}
				
				return true
			},
			checkboxInit(row,index){
			   if(this.checkUser(row))
			   {
			   		return 1;//可勾选
			   }else{
			   		return 0;//不可勾选
			   }
			},
			toggleSelection(rows) {
		        if (rows) {
		          rows.forEach(row => {
		            this.$refs.multipleTable.toggleRowSelection(row);
		          });
		        } else {
		          this.$refs.multipleTable.clearSelection();
		        }
		    },
			handleSelectionChange(val) {
				this.multipleSelection = val;
				this.changeSelectCheckBoxData();
		    },
		    changeSelectCheckBoxData(){
		    	this.select_checkbox = []
		    	this.checkRa(this.multipleSelection)
		    	for(var i=0;i<this.multipleSelection.length;i++){
		    		var user_id = this.multipleSelection[i].id
		    		this.select_checkbox[user_id] = this.multipleSelection[i]
		    	}
		    },
		    handleSelectionOption(val,row){
		    	this.select_combo_id = row.combo_id
		    	this.select_ros_domain = row.ros_domain
		    },
		    checkboxchange:function(item,value){
		    	var user_id = item.id
		    	if(value == true){
		    		this.select_combo_id = item.combo_id
		    		this.select_ros_domain = item.ros_domain
		    		this.select_checkbox[user_id] = item
		    	}else{
		    		this.select_checkbox.splice(user_id,1)
		    		var j = 0
		    		for(var v in this.select_checkbox){
		    			j++
		    		}
		    		if(j == 0){
		    			this.select_combo_id = 0
		    			this.select_ros_domain = ''
		    			this.select_checkbox = []
		    		}
		    	}
		    },
		    goRa:function(){
				if(this.checkItem(2)){
					this.dialogFormVisible2 = true
					this.assignra.raIds = ''
					
					var selectoption = this.getSelectionUlist()
					var ids = selectoption['ids']
					var combo_id = selectoption['combo_id']
					var single_region = selectoption['single_region']
					var can_ra = selectoption['can_ra']
					if(can_ra == 0){
						this.$message({
							message: '该套餐不可切换',
							type: 'error'
						});
						this.execution_end();
					}else if(single_region == 1){
						this.$message({
							message: '纯单地区不可切换',
							type: 'error'
						});
						this.execution_end();
					}else{
						this.assignra.ids  = ids
						this.assignra.combo_id = combo_id
						this.assignra.raIds = selectoption['raIds']
						this.assignra.ulist = selectoption['ulist']
						this.assignra.pwdlist = selectoption['pwdlist']
						this.assignra.ros_domain = selectoption['ros_domain'] 
						this.assign_combo_list[0] = selectoption['vpnCombo']
						this.assign_combo_area_list = selectoption['vpnCombo']['combo_area_list']
						this.select_combo_area_list = this.assign_combo_area_list
						this.assign_combo_province_list = selectoption['vpnCombo']['combo_province_list']
					}
				}
			},
			checkRa:function(selectoption){
			    var select_length = selectoption.length
				for(var i = 0; i < select_length; i++) {
					if(i < select_length - 1) {
						if(selectoption[i].combo_id != selectoption[i + 1].combo_id) {
							this.$message({
								message: '您选择的账号不是同一个套餐，请分开来切换',
								type: 'error'
							});
							this.execution_end();
						}
						/*
						if(selectoption[i].tel != selectoption[i+1].tel){
							this.$message({
								message: '您选择的账号不是同一个手机号码客户，请分开来切换',
								type: 'error'
							});
							this.execution_end();
						}
						*/
						
					}
				}
			},
			goAssignRa:function(){
				if(this.assignra.raIds.length < 1){
					this.$message({
						message: '请选择地区',
						type: 'error'
					});
				}else{
					var data = {
						clientId:this.clientId,
						ros_domain:this.assignra.ros_domain,
						ulist: this.assignra.ulist,
						pwdlist: this.assignra.pwdlist,
						combo_id:this.assignra.combo_id,
						raIds:this.assignra.raIds.join(','),
					}
					this.execution_start();
					this.loading2 = true
					this.$http.post(this.vpn_host + 'vpn/ra', this.$qs.stringify(data)).then(
					response => {
						/*如果有来源登录成功返回来源*/
						var res = response.data

						if (res.state == 1) {
							this.$message({
								message: res.msg,
								type: 'error'
							});
						} else if (res.state == 0) {
							this.$message({
								message: res.msg,
								type: 'success'
							});
							this.dialogFormVisible2 = false
							this.loading2 = false
						}
						this.execution_end();
					})
				}
			},
			goCombo:function(){
				this.$router.push({
					path: '/ucenter/vpncombodetail'
				})
			},
			getSelectionUlist:function(){
				var selectoption = this.select_checkbox
				var ids = []
				var ulist = []
				var pwdlist = []
				var j = 0
				var v
				for(v in selectoption){
					
					ids[j] = []
					ids[j] = selectoption[v]['id']
					ulist[j] = []
					ulist[j] = selectoption[v]['login_name']
					pwdlist[j] = []
					pwdlist[j] = selectoption[v]['login_pwd']
					var combo_id = selectoption[v]['combo_id']
					var vpnCombo = selectoption[v]['vpnUserCombo'][0]['vpnCombo']
					var ros_domain = selectoption[v]['ros_domain']
					var raIds = selectoption[v]['combo_area_id']
					var single_region = selectoption[v]['combo_single_region']
					var can_ra = selectoption[v]['can_ra']
					j++
				}
				var arr = []
				arr['ids'] = ids
				arr['ulist'] = ulist.join(',')
				arr['pwdlist'] = pwdlist.join(',')
				arr['combo_id'] = combo_id
				arr['vpnCombo'] = vpnCombo
				arr['ros_domain'] = ros_domain
				raIds = raIds.split(',')
				raIds=raIds.map(function(data){
					return +data;
				});
				arr['raIds'] = raIds
				arr['single_region'] = single_region
				arr['can_ra'] = can_ra
				return arr
			},
			getRaIdsToInt:function(raIds){
				raIds = raIds.split(',')
				raIds=raIds.map(function(data){
					return +data;
				});
				return raIds
			},
			goOff:function(){
				if(this.checkItem(2)){
					this.$confirm('将把用户踢下线, 是否继续?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						var u_pwd_list = this.getSelectionUlist()
						this.execution_start();
						this.$http.post(this.vpn_host + 'vpn/kiffof', this.$qs.stringify({
							clientId:this.clientId,
							ulist: u_pwd_list['ulist'],
							pwdlist: u_pwd_list['pwdlist'],
						})).then(
							response => {
								var res = response.data
								if(res.state == 1) {
									this.$message({
										message: res.msg,
										type: 'error'
									});
								} else if(res.state == 0) {
									this.$message({
										message: res.msg,
										type: 'success'
									});
								}
								this.execution_end();
							})
	
					})
				}
			},
			execution_start:function(){
				this.loading = true
			},
			execution_end:function(){
				this.loading = false
				this.reload()
			},
			checkItem:function(num){
				if(num == 1 && this.select_checkbox.length != num){
					this.$message({
						message: '只能操作一项',
						type: 'error'
					});
				}else if(this.select_checkbox.length == 0){
					this.$message({
						message: '请至少选择一项',
						type: 'error'
					});
				}else{
					return true
				}
			},
			handleCheckAllChange(val) {
				if(val == true){
					var combo_area_list = this.select_combo_area_list
					var raId_arr = []
					for(var i=0;i<combo_area_list.length;i++){
						raId_arr[i] = parseInt(combo_area_list[i].id)
					}
					this.assignra.raIds = raId_arr
				}else{
					this.assignra.raIds = []
				}
		        this.isIndeterminate = false;
		    },
		    assignAreaChange(value){
		    	let selectCount = value.length;
		    	let totalCount = this.assign_combo_area_list.length
        		this.checkAll = selectCount === totalCount
        		this.isIndeterminate = selectCount > 0 && selectCount < totalCount
        		this.checkAllArea = selectCount == totalCount
		    },
		    isInArray:function(arr,value){
			    for(var i = 0; i < arr.length; i++){
			        if(value === arr[i]){
			            return true;
			        }
			    }
			    return false;
			},
		    assignProvinceChange(value){
		    	let selectCount = value.length;
		    	let totalCount = this.assign_combo_province_list.length
        		this.checkAll = selectCount === totalCount
        		this.isIndeterminate2 = selectCount > 0 && selectCount < totalCount
        		this.checkAllProvince = selectCount == totalCount
        		
        		let area_list = this.assign_combo_area_list
        		var select_area_list = []
        		var j = 0
        		for(var i=0;i<area_list.length;i++){
        			var province = area_list[i]['province']
        			if(this.isInArray(value,province)){
        				select_area_list[j] = area_list[i]
        				j++
        			}
        		}
        		this.select_combo_area_list = select_area_list
        		this.assignra.raIds = []
		    },
		    handleCheckAllChangeProvince(val){
		    	if(val == true){
					var combo_province_list = this.assign_combo_province_list
					var province_arr = []
					for(var i=0;i<combo_province_list.length;i++){
						province_arr[i] = parseInt(combo_province_list[i].id)
					}
					this.assignra.provinces = province_arr
				}else{
					this.assignra.provinces = []
				}
		        this.isIndeterminate2 = false
		        this.assignProvinceChange(this.assignra.provinces)
		    },
		},
	}
</script>

<style scoped>
	.page-w{
		margin-top:100px ;
		width: 100%;
		height: 950px;
		background-color: #f5f6f7;
	}
	.container{
		width: 1300px;
		height: 900px;
		margin: 0 auto;
		
	}
	.user-right{
		padding: 0 20px;
	}
	.el-table {
		margin-top: 20px;
	}

</style>
<style>
	.el-table .el-table__fixed-right{
		box-shadow:none;
		-webkit-box-shadow:none;
	}
	.el-table__body-wrapper.is-scrolling-left{
		overflow: hidden;
	}
	.el-table__fixed-right::before, .el-table__fixed::before{
		display: none;
	}
	.el-button--mini, .el-button--mini.is-round{
		padding: 7px 15px 9px;
	}
</style>