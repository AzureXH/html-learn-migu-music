// 调用函数
pwd_msisdn();

// 1----分别定义手机号 验证码 密码 昵称的正则表达式
// 定义变量存放手机号和验证码的正则表达式
var phonereg = /^1[3456789][0-9]{9}$/;
var captchareg = /^\d{4}$/;
// 必须包含字母和数字的组合
// (?![0-9]+$)排除只有数字的组合
// (?![a-zA-Z]+$)排除只有字母的组合
// [0-9A-Za-z]{6-12} 6-12位包含字母和数字
var passwordreg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/;
// 设置昵称 字母 汉字 数字
var nicknamereg = /^[a-zA-Z0-9_\u4e00-\u9fa5]+$/;

// 2----定义变量存放输入的手机号和验证码，全局变量正则表达式
// 定义变量存放输入的信息,reg正则表达式
var phone, captcha, password, nickname, reg;


// 创建一个函数
function pwd_msisdn() {
	// 3----给input标签绑定是哪个时间 获取焦点 失去焦点 文本框输入内容
	// 给input标签绑定多个事件,bind()只限于绑定自己本身元素
	$(".validform .form-item input.txt").bind({
		//获取焦点
		focus: function() {
			$(this).addClass("active");
		},
		//失去焦点
		blur: function() {
			$(this).removeClass("active");
		},
		//文本框内容发生改变则触发函数
		input: function() {
			// 当输入哪一个文本框的时候则获取对应的文本框内容
			// $.trim() 删除字符串前后的空格
			var inputText = $.trim($(this).val());
			// 获取输入文本框当前input的自定义属性data-type
			var dataType = $(this).attr("data-type");
			// 判断输入文本框的内容的正则表达式
			if (dataType == "phone") {
				reg = phonereg;
			} else if (dataType == "captcha") {
				reg = captchareg;
			} else if (dataType == "psdvalid") {
				reg = passwordreg;
			} else if (dataType == "nickname") {
				reg = nicknamereg;
			};


			// 获取输入的当前input标签上的nullmsg和errormsg信息
			var nullmsg = $(this).attr("nullmsg");
			var errormsg = $(this).attr("errormsg");


			// 1-验证4个文本框中输入的内容是否为空/是否正确
			if (inputText == "") {
				$(this).siblings(".validform-error").show().text(nullmsg);
				if (dataType == "phone") {
					$(".form-msgcode input.btn").addClass("disabled")
				}
			}
			// test() 将输入的手机号和正则表达式进行匹配
			// 如果成功则返回true，反之输入false
			else if (!reg.test(inputText)) {
				$(this).siblings(".validform-error").show().text(errormsg);
				if (dataType == "phone") {
					$(".form-msgcode input.btn").addClass("disabled")
				}
			} else {
				$(this).siblings(".validform-error").hide();
				// 如果手机号输入正确，则可以点击获取验证码
				if (dataType == "phone") {
					$(".form-msgcode input.btn").removeClass("disabled").click(function() {
						// 发送请求 
						funs.sendVerifycode(sendVerifycodecallback, inputText);
						// 回调函数处理数据
						function sendVerifycodecallback(result) {
							console.log(result);
						}
						// 定义验证码的有效时间
						var time = 3;
						var This = $(this);
						if (time = 3) {
							// 定义一个定时器
							var timer = setInterval(function() {
								if (time == 0) {
									This.val("获取验证码");
									// 清除定时器
									clearInterval(timer);
									// 取消无法点击的类
									This.removeClass("disabled");
								} else {
									// 添加无法点击类
									This.addClass("disabled");
									This.val("重新获取(" + time + ")");
									time--;
								}
							}, 1000)
						}
					});
				}


			}
		}
	})


}

// 当点击注册则
$("#regist").click(function() {
	redistdata();
})


function redistdata() {
	phone = $.trim($("#J_phone").val());
	password = $.trim($("#J_NewPassword").val());
	captcha = $.trim($("#J_msgcode").val());
	nickname = $.trim($("#J_nickname").val());

	funs.updatePsd(updatePsdcallback, phone, password, captcha, nickname);

	function updatePsdcallback(result) {
		console.log(result);
		if (result.code == 200) {
			$(".regist-content").html(`
			<h1 class="regist-ok">修改密码成功，请进行登录</h1>
			`)
		}
	}
}


$("#userLogin").click(function(){
	userLogindata();
})
// 2--登录函数
function userLogindata(){
	phone = $.trim($("#J_phone").val());
	password = $.trim($("#J_NewPassword").val());
	funs.userLogin(userLogincallback,phone,password);
	function userLogincallback(result){
		console.log(result);
		if(result.code==200){
			window.location.href="http://localhost:3000/";
		}
	}
}
