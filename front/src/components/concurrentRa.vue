<template>
	<div style="float: right;">
	<el-button type="warning" @click="raControll('showRa')" size="small">批量切换</el-button>

<!--批量切换 -->
		<el-dialog title="服务切换" :visible.sync="dialogVisiblera" width="30%" :before-close="raControll">
			<el-form>
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
					<el-select v-model="assignra.provinces" @change="(value)=>raControll('assignProvinceChange',value)" filterable multiple collapse-tags placeholder="请选择省份">
					    <el-option
					      v-for="item in assign_combo_province_list"
					      :key="item.id"
					      :label="item.name"
					      :value="item.id">
					    </el-option>
					</el-select>
					<el-checkbox :indeterminate="isIndeterminate2" v-model="checkAllProvince" @change="(value)=>raControll('handleCheckAllChangeProvince',value)">全选</el-checkbox>
				</el-form-item>
				<!--单地区-->
				<el-form-item label="选择地区：" v-if="assignra.single_region=='1'">
					<el-select v-model="assignra.raIds_single" placeholder="请选择地区" filterable collapse-tags="">
						<el-option
					      v-for="item in select_combo_area_list"
					      :key="item.id"
					      :label="item.name_alias"
					      :value="item.id"
					      :disabled="item.disabled">
					    </el-option>
					</el-select>
				</el-form-item>
			    <!--多地区-->
				<el-form-item label="选择地区:" v-else-if="assignra.single_region!='1'">
					  <el-select v-model="assignra.raIds" filterable multiple collapse-tags @change="(value)=>raControll('assignAreaChange',value)" placeholder="请选择地区">
					    <el-option
					      v-for="item in select_combo_area_list"
					      :key="item.id"
					      :label="item.name_alias"
					      :value="item.id"
					      :disabled="item.disabled">
					    </el-option>
					  </el-select>
					  <el-checkbox :indeterminate="isIndeterminate" v-model="checkAllArea" @change="(value)=>raControll('handleCheckAllChange',value)">全选</el-checkbox>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="raControll('closedialogVisiblera')">取 消</el-button>
				<el-button type="primary" @click="raControll('ra')">切换</el-button>
			</div>
		</el-dialog>
		</div>
</template>
<script>
	import Vpn from './VpnConcurrent'
	export default{
		inject: ['reload'],
		props: ['selectItem'],
		data() {
			return {
				multipleSelection:[],
				dialogVisiblera:false,
				assignra:{
					'ids':'',
					'iplist':'',
					'portlist':'',
					'combo_id':'',
					'provinces' : '',
					'raIds':'',
					'combo_area_id':'',
					'single_region' : '',
					'raIds_single':'',
				},
				assign_combo_list:[],
				assign_combo_province_list:[],
				assign_combo_area_list:[],
				select_combo_area_list:[],
				isIndeterminate: true,
				isIndeterminate2:true,
				checkAllProvince:false,
				checkAllArea:false,
			}
		},
		methods: {
			raControll:function(type,val){
				this.multipleSelection = this.selectItem
				if(type == 'closedialogVisiblera'){
					this.dialogVisiblera = false
					this.reload()
				}else if(type == 'handleCheckAllChange'){
			        var result = Vpn.raHandleCheckAllChange(val,this.select_combo_area_list,this.assignra)
			        this.assignra = result.assignra
			        this.isIndeterminate = result.isIndeterminate
				}else if(type == 'handleCheckAllChangeProvince' || type == 'assignProvinceChange'){
					if(type == 'handleCheckAllChangeProvince')
					{
						var result = Vpn.raHandleCheckAllChangeProvince(val,this.assign_combo_province_list,this.assign_combo_area_list,this.assignra)
					}else if(type == 'assignProvinceChange'){
						var result = Vpn.raAssignProvinceChange(val,this.assign_combo_province_list,this.assign_combo_area_list,this.assignra)
					}
					this.assignra = result.assignra
					this.checkAll = result.checkAll
					this.isIndeterminate2 = result.isIndeterminate2
					this.checkAllProvince = result.checkAllProvince
					this.select_combo_area_list = result.select_combo_area_list
				}else if(type == 'assignAreaChange'){
					var result = Vpn.raAssignAreaChange(val,this.assign_combo_area_list)
				}else if(type == 'assignAreaChangeSingle'){
				}else if(type == 'ra'){
					 let that = this
					 Vpn.ra(this.assignra).then(function(){
					 	that.reload()
					 })
				}else if(type == 'showRa'){
					var result = Vpn.showRa(this.multipleSelection)
					if(result != false){
						this.assignra = result.assignra
						this.assign_combo_list = result.assign_combo_list
						this.$http.post('/http/http_port/getComboInfo',this.$qs.stringify(this.assignra)).then(
						response => {
							var res = response.data
							if(res.state == 0){
								var combo_info = res.data.combo_info
								var combo_area_list = combo_info.combo_area_list
								this.select_combo_area_list = combo_area_list
								this.assign_combo_area_list = combo_area_list
								this.assign_combo_province_list = []
								var province_list = []
								for(var i = 0;i< combo_area_list.length;i++){
									var province_id = combo_area_list[i].provinceInfo.id 
									var province_name = combo_area_list[i].provinceInfo.name
									province_list[province_id] = []
									province_list[province_id]['id'] = province_id
									province_list[province_id]['name'] = province_name
								}
								var j=0
								for(var v in province_list){
									this.assign_combo_province_list[j] = []
									this.assign_combo_province_list[j] = province_list[v]
									j++
								}
								this.dialogVisiblera = true
							}else{
								this.$message({
									message: res.msg,
									type: 'error'
								});
							}
						})
						}
				}else{
					this.dialogVisiblera = false
					this.reload()
				}
			},
		},
	}
</script>