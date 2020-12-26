var funs = {
	// 发送验证码
	sendVerifycode: function(callback, phone) {
		$.ajax({
			url: "/captcha/sent",
			type: "get",
			dataType: "json",
			// phone:phone可写作phone
			data: {
				phone
			},
			success: function(result) {
				callback(result);
			},
			error: function(XMLHttpRequest) {
				var msg = JSON.parse(XMLHttpRequest.responseText)
				// var msg=XMLHttpRequest.responseJSON;
				alert(msg.msg)

			}
		})

	},
	// 注册(修改密码)
	updatePsd: function(callback, phone, password, captcha, nickname) {
		$.ajax({
			url: "/register/cellphone",
			type: "post",
			dataType: "json",
			// phone:phone可写作phone
			data: {
				phone,
				password,
				captcha,
				nickname
			},
			success: function(result) {
				callback(result);
			},
			error: function(XMLHttpRequest) {
				var msg = XMLHttpRequest.responseJSON;
				console.log(msg)
				alert(msg.msg)
			}
		})
	},
	// 登录请求
	userLogin: function(callback, phone, password) {
		$.ajax({
				url: "/login/cellphone",
				type: "post",
				dataType: "json",
				// phone:phone可写作phone
				data: {
					phone,
					password,
				},
				success: function(result) {
					callback(result);
				},
				error: function(XMLHttpRequest) {
					var msg = XMLHttpRequest.responseJSON;
					console.log(msg);
					alert(msg.msg)
				}
			})
		}


}
