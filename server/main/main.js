// 切换选项卡
var ali=document.querySelectorAll(".title  li");
var m2=document.querySelectorAll(".m2");
for(var i=0;i<ali.length;i++){
    ali[i].setAttribute("xuhao",i)
    ali[i].onmouseover=function(){
        for(var j=0;j<m2.length;j++){
            m2[j].style.display="none"
        }
        var index = this.getAttribute("xuhao");
        m2[index].style.display="block"
    }
}
// 爬楼
    $(".stair").children("li").click(function(){
        console.log($(this))
        $("html").animate({
        scrollTop:$(".floor").eq($(this).index()).offset().top
        } )
    })
    


// 点击存储cookie，让商品详情使用
class Godds{
    constructor(){
        this.cont=document.querySelector("#shouji3 .tab")

        this.addEvent();
    }
    addEvent(){
        
    }
}
new Godds;

