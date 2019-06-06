
class List{
    constructor(){
        this.cont = document.getElementById("cont");
        this.url = "http://localhost:3000/shoppingcar/goods.json";


        this.init();
        this.addEvent1();
    }
    init(){
        var that = this;
        ajax({
            url:this.url,
            success:function(res){
                that.res = JSON.parse(res)
                that.display();
            }
        })
    }

    display(){
        var str = "";
        for(var i=0;i<this.res.length;i++){
            str += `<div class="boxi" index="${this.res[i].goodsId}">
                        <img src="${this.res[i].src}">
                        <p>${this.res[i].name}</p>
                        <span>${this.res[i].price}</span>
                        <em class="btn">加入购物车</em>
                    </div>`
        }
        this.cont.innerHTML = str;
    }
    addEvent1(){
        var that = this;
        this.cont.addEventListener("click",function(eve){
            var e = eve || window.event;
            var target = e.target || e.srcElement;
            if(target.className == "btn"){
                // 1.点击时存储当前的商品id
                that.id = target.parentNode.getAttribute("index");
                // 2.准备设置cookie
                that.setCookie()
            }
        })
    }

    setCookie(){
        // 点击商品的情况
        // 存cookie，存什么格式的字符
            // 商品：对象		{id:,num:}
            // 所有商品：数组	[{id:,num:},{id:,num:},{id:,num:}]
        
        // 3.先获取cookie用来判断第一次还是后面的次
        this.goods = getCookie("shangpin");
        // 开始判断
        if(this.goods){
            // 5.之后点击，先解析数据
            this.goods = JSON.parse(this.goods)
            // 6.判断点的是否是重复数据
            var onoff = true;
            for(var i=0;i<this.goods.length;i++){
                if(this.goods[i].id == this.id){
                    // 是重复数据
                    this.goods[i].num ++;
                    onoff = false;
                }
            }
            // 7.点的是新数据
            if(onoff){
                this.goods.push({
                    id:this.id,
                    num:1
                })
            }
        }else{
            // 4.第一次点击，直接存
            this.goods = [{
                id:this.id,
                num:1
            }]
        }
        // 8.以上都只是在操作数组，最后要设置回cookie
        setCookie("shangpin",JSON.stringify(this.goods))
    }
}

new List;

