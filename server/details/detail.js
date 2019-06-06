// console.log($("#allbox"))
// console.log($(".mainbox"))
$("#allbox").hover(function(){
    $(".mainbox").css({
        "display":"block"
    })
},function(){
    $(".mainbox").css({
        "display":"none"
    })
})

// console.log($("#hongLingJinImgUrl"))
// $("#toBuyPhone").hover(function(){
//     $("#hongLingJinImgUrl").css({"display":"block"})
// },function(){
//     $("#hongLingJinImgUrl").css({"display":"none"})
// })
// 	console.log($("#toBuyPhone"))
function Magnifier(){
    //			2.获取元素
                this.sBox = document.querySelector(".s_box")
                this.bBox = document.querySelector(".b_box")
                this.span = document.querySelector(".s_box span")
                this.bImg = document.querySelector(".b_box img")
    //			3.绑定事件
                this.init()
            }
            Magnifier.prototype.init = function(){
                var that = this;
                this.sBox.onmouseover = function(){
                    that.show()
                }
                this.sBox.onmouseout = function(){
                        that.hide()
                }
                this.sBox.onmousemove = function(eve){
                    var e = eve || window.event
                    that.move(e)
                }
            }
            Magnifier.prototype.move = function(e){
                var l = e.pageX - this.sBox.offsetLeft - this.span.offsetWidth/2;
                var t = e.pageY - this.sBox.offsetTop - this.span.offsetHeight/2;
                
                if(l<0) l=0;
                if(t<0) t=0;
                if(l > this.sBox.offsetWidth - this.span.offsetWidth){
                    l = this.sBox.offsetWidth - this.span.offsetWidth;
                }
                if(t > this.sBox.offsetHeight - this.span.offsetHeight){
                    t = this.sBox.offsetHeight - this.span.offsetHeight;
                }
                
                this.span.style.left = l + "px";
                this.span.style.top = t + "px";
                var x = l/(this.sBox.offsetWidth - this.span.offsetWidth);
                var y = t/(this.sBox.offsetHeight - this.span.offsetHeight);
                this.bImg.style.left = x * -(this.bImg.offsetWidth-this.bBox.offsetWidth) + "px";
                this.bImg.style.top = y * -(this.bImg.offsetHeight-this.bBox.offsetHeight) + "px";
            }
            Magnifier.prototype.show = function(){
    //			显示
                this.span.style.display = "block";
                this.bBox.style.display = "block";
            }
            Magnifier.prototype.hide = function(){
    //			隐藏
                this.span.style.display = "none";
                this.bBox.style.display = "none";
            }
            
            new Magnifier();

            // var ali = document.getElementsByClassName("kill-l-ul")[0].children;
            var ali=document.getElementById("tiemer").children;
            var date2 = new Date("2019/6/18 00:00:00");
            console.log(date2)
            var timer2 = parseInt(date2.getTime()/1000);
            var date;
            var time3 = setInterval(function(){
                date = new Date();
                var timer =parseInt(date.getTime()/1000);
                var d = num(parseInt((timer2-timer)/3600/24));
                var h = num(parseInt((timer2-timer)/3600%24));
                var m = num(parseInt((timer2-timer)/60%60));
                var s = num(parseInt((timer2-timer)%60));

                ali[0].innerHTML = h;
                ali[1].innerHTML = m;
                ali[2].innerHTML = s;
            },1000);
            function num(a){
                return  a>=10? a:"0"+a;
                }