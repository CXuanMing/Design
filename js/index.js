(function() {
	var $imgs = $("#imgs ul li");
	var $circles = $("#circles ol li");
	var $carousel = $("#carousel")
	// 创建一个猫腻图
	var $maoni = $('<li class="maoni"></li>').appendTo("#imgs ul")
	// 点击close  让对应的蒙版消失
	$(".close").click(function() {
		$(this).parent().fadeOut(1000);
	});
	// 当页面加载时第一个蒙版淡入
	$(".mask").eq(0).fadeOut(0).stop(true).fadeIn(1000);

	// 定义一个数组，用于保存18张碎图片
	// x: 6行    y: 3列
	// wither: 138.333px    height: 143.666px
	var arr = (function() {
		// 定义一个数组用于存储
		var temp = [];
		console.log(temp)
		for (var i = 0; i < 3; i++) {
			for(var j = 0; j < 6; j++){
				temp.push($('<div></div>').css({
					"width": 0,
					"height": 0,
					"background": "url(images/slider-img1.jpg) no-repeat " + j * -138.333 + "px " + i * -143.666 + "px",
					"position": "absolute",
					"left": j * 138.333,
					"top": i * 143.666
				}).appendTo($maoni));
			}
		}
		return temp;
	})()
	// 定义小圆点信号量
	var small_idx = 0;
	// 定义大图信号量
	var big_idx = 0;
	// 定义锁
	var lock = true;

	// 定义定时器
	var timer = setInterval(function() {
		// 小圆点信号量改变
		small_idx++;
		// 判断信号量保证信号量有效
		if (small_idx > $circles.length - 1) {
			small_idx = 0;
		}
		change.call($circles.eq(small_idx));
	}, 5000)
	// 当鼠标进入carousel的时候停止定时器
	$carousel.mouseenter(function() {
		// 清除定时器
		clearInterval(timer);
	});
	// 当鼠标离开的时候开启定时器
	$carousel.mouseleave(function() {
		// 设表先关
		clearInterval(timer);
		// 重新赋值timer
		timer = setInterval(function() {
		// 小圆点信号量改变
			small_idx++;
			// 判断信号量保证信号量有效
			if (small_idx > $circles.length - 1) {
				small_idx = 0;
			}
			change.call($circles.eq(small_idx));
		}, 5000);
	})
	// 给小圆点添加点击事件
	$circles.click(change);
	function change() {
		// 定义锁
		if (!lock) {
			return;
		}
		// 关闭锁
		lock = false;
		// 改变小圆点信号量
		small_idx = $(this).index();
		console.log(small_idx)
		// 当小圆点信号量与大图信号量相等 什么也不做
		if (small_idx === big_idx) {
			// 开锁
			lock = true;
			return;
		}
		// 点击那个小圆点那个添加cur
		$(this).addClass('cur').siblings().removeClass('cur');
		// 原来大图的蒙版消失
		$(".mask").eq(big_idx).stop(true).fadeOut(1000);
		// 猫腻图出现
		$maoni.addClass('active')
		// 轮换猫腻图
		$.each(arr, function(index, value) {
			// 对应的小圆点信号量大图出现
			value.css("backgroundImage", "url(images/slider-img" + (small_idx + 1) + ".jpg)").animate({
				"width": 138.333,
				"height": 143.666
			}, 800 + Math.random() * 3000)
		})
		// 定义延时器 当碎图加载完毕之后要做的事
		setTimeout(function() {
			// 当所有碎图显示之后 宽高变0
			$.each(arr, function(index, div) {
				div.css({
					"width": 0,
					"height": 0
				})
			})
			// 猫腻图显示之后大图出现
			big_idx = small_idx;
			// console.log(big_idx = small_idx)
			// 大图出现要加active
			$imgs.eq(big_idx).addClass('active').siblings().removeClass("active");
			// 定义大图的蒙版淡入
			$(".mask").eq(big_idx).fadeOut(0).stop(true).fadeIn(1000)
			// 所有事情完毕之后开锁
			lock = true;
		}, 3800)
	}
})()
