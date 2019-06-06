$("#allbox").hover(function(){
    $(".mainbox").css({
        "display":"block"
    })
},function(){
    $(".mainbox").css({
        "display":"none"
    })
})
class Detail{
    constructor(){
        this.tbody = document.querySelector(".myimg");
        this.tbody2 = document.querySelector("#productBeanName");
        this.tbody3 = document.querySelector("#tianprice");
        this.tbody4 = document.querySelector("#bianhao");
        this.tbody5 = document.querySelector("#fangda");
        this.url = "http://localhost:3000/index.json";

        // 请求所有数据
        this.init();
        // D1.绑定span的点击事件
        this.addEvent()
    }
    init(){
        var that = this;
        ajax({
            url:this.url,
            success:function(res){
                that.res = JSON.parse(res)
                // 拿到cookie
                that.getCookie()
            }
        })
    }
    getCookie(){
        console.log(this.res)
        this.goods = JSON.parse(getCookie("shangpin"));
        // 渲染页面
        this.display();
    }
    display(){
        // console.log(this.res)
        console.log(this.goods)
        var str1 = "";
        var str2="";
        var str3="";
        var str4="";
        var str5="";
        // 遍历所有数据
        for(var i=0;i<this.res.length;i++){ 
            // 遍历所有cookie
            for(var j=0;j<this.goods.length;j++){
                console.log(this.goods[j].id)
                // 两相对比，发现id重复，那就是要加入购物车的商品
                if(this.res[i].goodsId == this.goods[j].id){
                    str1= `<ul index="${this.goods[j].id}">
                                <img src="${this.res[i].src}">
                            </ul>
                                
                            `
                    str2+=`<p>${this.res[i].name}</p>`
                    str3=`<p>${this.res[i].price}</p>`
                    str4=`<p>${this.goods[j].id}</p>`
                    str5=`<img src="${this.res[i].src}">`
                }
            }
        }
        this.tbody.innerHTML = str1;
        this.tbody2.innerHTML = str2;
        this.tbody3.innerHTML = str3;
        this.tbody4.innerHTML = str4;
        this.tbody5.innerHTML = str5;
    }
    addEvent(){
        var that = this;
        // 利用事件委托绑定span的事件
        this.tbody.addEventListener("click",function(eve){
            if(eve.target.className == "delete"){
                // D2.保存商品id
                that.id = eve.target.parentNode.parentNode.getAttribute("index");
                // D3.删除DOM元素
                eve.target.parentNode.parentNode.remove()
                // D4.删除cookie中的数据
                that.changeCookie(function(i){
                    that.goods.splice(i,1)
                })
            }
        })
        this.tbody.addEventListener("input",function(eve){
            if(eve.target.type == "number"){
                // U1.保存商品id
                that.id = eve.target.parentNode.parentNode.getAttribute("index");
                // 保存输入框的值
                // that.num = eve.target.value;
                // U2.修改cookie中的数据
                that.changeCookie(function(i){
                    that.goods[i].num = eve.target.value;
                })
            }
        })
    }
    changeCookie(callback){ 
        for(var i=0;i<this.goods.length;i++){
            if(this.goods[i].id == this.id){
                // 删除或修改
                callback(i)
                break;
            }
        }
        setCookie("shangpin",JSON.stringify(this.goods))
    }
    // removeCookie(){
    //     // 遍历cookie，找到符合点击的商品的数据
    //     for(var i=0;i<this.goods.length;i++){
    //         if(this.goods[i].id == this.id){
    //             // 从数组中将符合条件的数据，剔除出去
    //             this.goods.splice(i,1);
    //             break;
    //         }
    //     }
    //     // D5.把剔除了数据之后的数组，再塞回去
    //     setCookie("shangpin",JSON.stringify(this.goods))
    // }
    // setCookie(){
    //     // 遍历cookie，找到符合点击的商品的数据
    //     for(var i=0;i<this.goods.length;i++){
    //         if(this.goods[i].id == this.id){
    //             // 从数组中将符合条件的数据，修改
    //             this.goods[i].num = this.num;
    //             break;
    //         }
    //     }
    //     // U3.把剔除了数据之后的数组，再塞回去
    //     setCookie("shangpin",JSON.stringify(this.goods))
    // }
}

new Detail;



function Magnifier(){
                this.sBox = document.querySelector(".s_box")
                this.bBox = document.querySelector(".b_box")
                this.span = document.querySelector(".s_box span")
                this.bImg = document.querySelector(".b_box img")
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
                this.span.style.display = "block";
                this.bBox.style.display = "block";
            }
            Magnifier.prototype.hide = function(){
                this.span.style.display = "none";
                this.bBox.style.display = "none";
            }
            
            new Magnifier();