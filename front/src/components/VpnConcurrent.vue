<script>
	import Fun from './Fun'
	import ElementUI from 'element-ui'
	import Config from './Config'
	import axios from 'axios'
	import qs from 'qs';
	/*
	 * @param combo_price 	套餐价格
	 * @param period_count  周期数
	 * @param count  		帐号数量
	 */
	var computePercent = function(simple_percent, period_count, count, type, login_price, login_count) {
		var total_percent = 0;
		var base_percent = simple_percent * period_count;

		if(type == 3) {
		} else {
			total_percent = base_percent*count;
		}

		return total_percent;
	}
	
	
	var getSimplePercent = function(combo_price,open_time,count){
		var simple_percent = 100
		for(var i=0;i<combo_price.length;i++){
			if(combo_price[i].min_value <= count && combo_price[i].max_value >= count){
				if(open_time == 1) {
					simple_percent 	= combo_price[i].price_percent1
				} else if(open_time == 7) {
					simple_percent 	= combo_price[i].price_percent7
				} else if(open_time == 30) {
					simple_percent 	= combo_price[i].price_percent30
				}
			}
		}
		simple_percent = (100 + simple_percent)/100
		return simple_percent
	}

	var getTotalPercent = function(combo_price,open_time,period_count,count,combo_type,login_price,login_count){
		var simple_percent 	= getSimplePercent(combo_price,open_time,count)
		var total_percent 	= computePercent(simple_percent,period_count,count,combo_type,login_price,login_count)
		return total_percent 
	}
	
	var getTotalPrice = function(area_price,combo_price,open_time,period_count,count,combo_type,login_price,login_count,device_count){
		var total_percent = getTotalPercent(combo_price,open_time,period_count,count,combo_type,login_price,login_count)
		var total_price   = parseFloat(total_percent * area_price * open_time * device_count).toFixed(3)
		return total_price
	}
	
	var isInArray = function(arr,value){
	    for(var i = 0; i < arr.length; i++){
	        if(value === arr[i]){
	            return true;
	        }
	    }
	    return false;
	}
	
	var raAssignProvinceChange = function(value,assign_combo_province_list,assign_combo_area_list,assignra){
    	let selectCount = value.length;
    	let totalCount = assign_combo_province_list.length
		var checkAll = selectCount === totalCount
		var isIndeterminate2 = selectCount > 0 && selectCount < totalCount
		var checkAllProvince = selectCount == totalCount
		
		let area_list = assign_combo_area_list
		var select_area_list = []
		var j = 0
		for(var i=0;i<area_list.length;i++){
			var province = area_list[i]['province']
			if(isInArray(value,province)){
				select_area_list[j] = area_list[i]
				j++
			}
		}
		var select_combo_area_list = select_area_list
		assignra.raIds = []
		var result = {
			'assignra' :assignra,
			'checkAll' :checkAll,
			'isIndeterminate2' : isIndeterminate2,
			'checkAllProvince' : checkAllProvince,
			'select_combo_area_list' : select_combo_area_list,
		}
		return result
	}
	
	
	var raHandleCheckAllChange =  function(val,select_combo_area_list,assignra){
		if(val == true){
			var combo_area_list = select_combo_area_list
			var raId_arr = []
			for(var i=0;i<combo_area_list.length;i++){
				raId_arr[i] = parseInt(combo_area_list[i].id)
			}
			assignra.raIds = raId_arr
		}else{
			assignra.raIds = []
		}
        var result ={
        	'assignra' : assignra,
        	'isIndeterminate' : false,
        }
        return result
	}
	
	var raHandleCheckAllChangeProvince = function(val,assign_combo_province_list,assign_combo_area_list,assignra){
		if(val == true){
			var combo_province_list = assign_combo_province_list
			var province_arr = []
			for(var i=0;i<combo_province_list.length;i++){
				province_arr[i] = parseInt(combo_province_list[i].id)
			}
			assignra.provinces = province_arr
		}else{
			assignra.provinces = []
		}
        var result = raAssignProvinceChange(assignra.provinces,assign_combo_province_list,assign_combo_area_list,assignra)
        return result
	}
	
	var raAssignAreaChange = function(value,assign_combo_area_list){
		let selectCount = value.length;
    	let totalCount = assign_combo_area_list.length
		this.checkAll = selectCount === totalCount
		this.isIndeterminate = selectCount > 0 && selectCount < totalCount
		this.checkAllArea = selectCount == totalCount
	}
	
	
	var showRa = function(multipleSelection){
		var user_ids = []
		if(Fun.isEmpty(multipleSelection)) {
			ElementUI.MessageBox.alert('请选择要切换的账号');
			return false
		}
		var select_length = multipleSelection.length
		var assignra = {
					'ids':'',
					'iplist':'',
					'portlist':'',
					'combo_id':'',
					'provinces' : '',
					'raIds':'',
					'combo_area_id':'',
				}
		var assign_combo_list = []
		var assign_combo_province_list = []
		var select_combo_area_list = []
		var assign_combo_area_list = []
		var dialogVisiblera = false
		assignra.raIds = []
		assignra.raIds_single = ''
		assignra.iplist = []
		assignra.portlist = []
		for(var i = 0; i < select_length; i++) {
			if(multipleSelection[i].valid_combo.single_region == 2){
				ElementUI.MessageBox.alert('您选择的账号套餐不可切换')
				return false
			}
			if(i < select_length - 1) {
				if(multipleSelection[i].combo_id != multipleSelection[i + 1].combo_id) {
					ElementUI.MessageBox.alert('您选择的账号不是同一个套餐，请分开来切换')
					return false
				}
				if(multipleSelection[i].tel != multipleSelection[i+1].tel){
					ElementUI.MessageBox.alert('您选择的账号不是同一个手机号码客户，请分开来切换');
					return false;
				}
				
			}
			user_ids.push(multipleSelection[i].id)
			assignra.iplist.push(multipleSelection[i].http_ip)
			assignra.portlist.push(multipleSelection[i].http_port)
			assign_combo_list[0] = []
			assign_combo_list[0]['id'] 		= multipleSelection[i]['valid_combo'].combo_id
			assign_combo_list[0]['name'] 	= multipleSelection[i]['valid_combo'].combo_name
			assignra.combo_id = multipleSelection[i]['valid_combo'].combo_id
			assignra.combo_id = multipleSelection[i].combo_id
			assignra.single_region 	= multipleSelection[i]['valid_combo'].single_region
			var combo_area_id       = multipleSelection[i]['valid_combo'].combo_area_id
			var combo_area_list 	= combo_area_id.split(',')
			var raId_arr = []
			for(var j=0;j<combo_area_list.length;j++){
				raId_arr[j] = parseInt(combo_area_list[j])
			}
			if(assignra.single_region == 1){
				assignra.raIds_single 	= raId_arr[0]
			}else{
				assignra.raIds  		= raId_arr
			}
		}
		assignra.ids = user_ids
		var result = {
						'assignra' :assignra,
						'assign_combo_list' : assign_combo_list,
						'assign_combo_province_list':assign_combo_province_list,
						'select_combo_area_list':select_combo_area_list,
						'assign_combo_area_list':assign_combo_area_list,
						'dialogVisiblera':dialogVisiblera,
					}
		return result
	}
	
	var ra = function(assignra){
		assignra.combo_area_id = assignra.raIds.join(',')
		return new Promise(function(resolve, reject){
			axios.post('/http/http_port/ra', qs.stringify(assignra)).then(
			response => {
				var res = response.data
				if(res.state == 0) {
					ElementUI.MessageBox({
						message: res.msg,
						type: 'success'
					});
					resolve(true)
				} else {
					ElementUI.MessageBox({
						message: res.msg,
						type: 'error'
					});
					reject(false)
				}
			})
		})
	}
	
	
	axios.defaults.baseURL = Config.host
	axios.defaults.withCredentials = true
	export default{
		computePercent,
		getSimplePercent,
		getTotalPercent,
		getTotalPrice,
		raHandleCheckAllChange,
		raHandleCheckAllChangeProvince,
		raAssignProvinceChange,
		raAssignAreaChange,
		showRa,
		ra,
	}
</script>
