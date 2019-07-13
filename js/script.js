//  脚本在head标签中引用，调用页面加载后执行脚本函数
window.onload = function () {
    var index = 0, //设置图片索引为0
        pics = byId("content").getElementsByTagName("div"), //获取banner图
        size = pics.length, //获取banner的个数
        tits = byId("title").getElementsByTagName("div"), //获取切换项
        main = byId("main"), //整个tag切换页
        timer = null; //定时器

    // 设定函数byId用于接收id
    function byId(id) {
        return typeof (id) === "string" ? document.getElementById(id) : id;
    }

    // 用于兼容主流浏览器和IE浏览器
    function addHandler(element, type, handler) {
        // 主流浏览器支持DOM2级的
        if (element.addEventListener) {
            element.addEventListener(type, handler, false);
            // IE浏览器中支持DOM2级的
        } else if (element.attachEvent) {
            element.attachEvent("on" + type, handler);
            // IE浏览器中不支持DOM2级的，即DOM0级事件
        } else {
            element["on" + type] = handler;
        }
    }

    // 图片每1秒钟切换1次
    function startAutoplay() {
        timer = setInterval(function () {
            index++;
            if (index >= size) {
                index = 0;
            }
            changeImg()
        }, 1000)
    }
    startAutoplay();

    // 停止轮播的函数
    function stopAutoplay() {
        if (timer) {
            clearInterval(timer);
        }
    }

    /*     图片的切换方法单独封装于一个函数中，方便能多次被调用，
    当图片发生轮播切换时，在不点击选项卡的前提下，相应的选项卡背景颜色也自动发生变化
     */
    function changeImg() {
        for (var i = 0; i < size; i++) {
            pics[i].style.display = "none";
            tits[i].style.background = "#fff"; //当鼠标没有点击选项卡时，背景颜色是白色的
            tits[i].className = "";
        }
        pics[index].style.display = "block";
        tits[index].style.background = "#ffcc00"; //当鼠标点击选项卡后，背景颜色是#ffcc00
        tits[index].className = "home"; //当鼠标点击选项卡后，边框圆角以及字体粗细有了相应的变化
    }
    /* 轮播图的图片不管有几张，当打开页面或者刷新页面是，初始的图片均是第一张 */
    changeImg(pics[0]);
    
    // 点击选项卡切换图片、背景颜色以及字体
    for (var d = 0; d < size; d++) {
        tits[d].setAttribute("data-id", d);
        addHandler(tits[d], "click", function () {
            index = this.getAttribute("data-id");
            changeImg();
        })
    }
    // 当鼠标停留在tab切换页上时，轮播图停止轮播
    addHandler(main, "mouseover", stopAutoplay)
    // 当鼠标离开tab切换页时，图片继续轮播
    addHandler(main, "mouseout", startAutoplay)
};