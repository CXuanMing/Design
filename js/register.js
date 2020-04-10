/*登录注册*/
// 获取登录注册切换按钮
var $left_btn = $("#left_btn");
var $right_btn = $("#right_btn");
// 获取表单元素
var $login_form = $("#login_form");
var $regist_form = $("#regist_form");
// 添加切换事件
$left_btn.click(function() {
	$left_btn.addClass('active');
	$right_btn.removeClass('active');
	$regist_form.addClass('hide');
	$login_form.removeClass('hide')
});
$right_btn.click(function() {
	$right_btn.addClass('active');
	$left_btn.removeClass('active');
	$login_form.addClass('hide');
	$regist_form.removeClass('hide')
});
// 当用户填写注册用户名的时候 先检测填写在检测正则 在发送ajax
var $regist_username = $("#regist_username");
var $regist_tips = $("#regist_tips");
// 定义锁
var regist_username_lock = false;
var regist_password_lock = false;

$regist_username.blur(function() {
	// 获取用户输入信息
	var val = $(this).val();
	// 判定是空白
	var result = Strategy.use("notEmpty", val);
	if (result) {
		regist_username_lock = false;
		$regist_tips.html(result);
		return
	}
	// 判定是否全英文
	var result1 = Strategy.use("allEn", val);
	if (result1) {
		regist_username_lock = false;
		$regist_tips.html(result1);
		return
	}
	// 发送ajax
	$.ajax({
		url: "/checkName",
		type: "get",
		data: {
			username: val
		},
		dataType: "json",
		success: function(data) {
			console.log(data)
			$regist_tips.html(data.data);
			if (!data.error) {
				regist_username_lock = true;
			} else {
				regist_username_lock = false;
			}
		}
	})
	// 获取注册按钮
	var $regist_btn = $("#regist_btn");
	$regist_btn.click(function() {
		// 方法1 使用表单序列化函数方式提交
		// var form = $("form").serialize()
		// 方法2 使用ajax2.0formdata发送数据
		var formData = new FormData($regist_form.get(0));
		$.ajax({
			url: "/regist",
			type: "post",
			data: formData,
			// data: form,
			dataType: "json",
			// 内容类型设置
			contentType: false,
			// 序列化数据
			processData: false,
			success: function(data) {
				console.log(data);
				// 如果注册成功让用户登录
				$left_btn.trigger('click');
			}
		})
	});
});


























/*头像*/
// 图片元素
var $pic = $("#pic")
// 提交更换按钮
var $upload = $("#upload")
// 点击图片更换头像
$(function() {
	$pic.click(function() {
		$upload.click();
		$upload.on("change", function() {
			// 获取图片信息
			var info = this.files[0];
			var src = window.URL.createObjectURL(info);
			$pic.attr("src", src);
		})
	})
})