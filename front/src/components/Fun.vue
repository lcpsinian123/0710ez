<script>
	import md5 from 'js-md5'
	var isEmpty = function(obj) {
		if(typeof obj == "undefined" || obj == null || obj == "") {
			return true;
		} else {
			return false;
		}
	}

	var IsPC = function() {
		var userAgentInfo = navigator.userAgent;
		var Agents = ["Android", "iPhone",
			"SymbianOS", "Windows Phone",
			"iPad", "iPod"
		];
		var flag = true;
		for(var v = 0; v < Agents.length; v++) {
			if(userAgentInfo.indexOf(Agents[v]) > 0) {
				flag = false;
				break;
			}
		}
		return flag;
	}
	
	var getRequest = function() {
		var url = window.location.href; //获取url中"?"符后的字串 
		var idx = url.indexOf('?')
		var theRequest = new Object()
		var strs = new Array()
		if(idx != -1) {
			var str = url.substr(idx + 1)
			if(str.indexOf("&") != -1) {
				strs = str.split("&")
			} else {
				strs[0] = str
			}

			for(var i = 0; i < strs.length; i++) {
				let param = strs[i].split("=");
				theRequest[param[0]] = unescape(param[1]);
			}
		}
		return theRequest;
	}

	var postMakeSign = function(data, secret) {
		var params = new Object() //参数对象
		var arr = data.split("&") //参数分割
		for(var i = 0; i < arr.length; i++) {
			let param = arr[i].split("=")
			if(!isEmpty(param[1])) {
				params[decodeURI(param[0])] = decodeURI(param[1])
			}
		}

		var ret = makeSign(params, secret, 'post')
		return ret
	}

	var getMakeSign = function(data, secret) {
		var ret = makeSign(data, secret, 'get')
		return ret
	}

	var makeSign = function(params, secret, method) {
		var sign = "" //签名

		var timestamp = Math.floor((new Date().getTime()) / 1000)
		params.timestamp = timestamp
		var keys = Object.keys(params).sort();
		var urlstr = ""
		for(var k in keys) {

			if((keys[k] != "sign") && (params[keys[k]] != "") && (!Array.isArray(params[keys[k]]) && (keys[k].indexOf('[') == -1))) {
				urlstr += keys[k] + '=' + params[keys[k]] + "&"
			}
		}

		var signstr = urlstr + 'key' + '=' + secret

		sign = md5(signstr)
		sign = sign.toUpperCase()
		urlstr = 'timestamp' + '=' + timestamp + '&' + 'sign' + "=" + sign
		params.sign = sign

		if(method == 'post') {
			return urlstr
		} else if(method == 'get') {
			return params
		}
	}

	export default {
		isEmpty,
		getRequest,
		makeSign,
		postMakeSign,
		getMakeSign,
		IsPC
	}
</script>