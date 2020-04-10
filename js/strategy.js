var Strategy = (function() {
	var s = {
		// 空白格
		"notEmpty": function(str) {
			// 正则
			var reg = /^\s+$/
			if (reg.test(str)) {
				return "请填写内容";
			}
		},
		// 纯英文
		"allEn": function(str) {
			var reg = /^[a-zA-Z]{4,10}$/;
			if (reg.test(str)) {
				return "";
			}
			return "请输入6~10位的英文字符"
		}
	}
	return {
		add: function(type, handler) {
			if (s[type]) {
				new Error("该策略已存在");
			}
			s[type] = handler;
		},
		use: function(type, str) {
			if (s[type]) {
				return s[type](str);
			}
			throw  new Error(type + "策略不存在")
		}
	}
})();