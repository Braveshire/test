class Car{
    constructor(){
        this.tbody = document.querySelector("tbody");
        this.url = "http://localhost:3000/shoppingcar/goods.json";

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
        // console.log(this.res)
        this.goods = JSON.parse(getCookie("shangpin"));
        // 渲染页面
        this.display();
    }
    display(){
        // console.log(this.res)
        console.log(this.goods)
        var str = "";
        // 遍历所有数据
        for(var i=0;i<this.res.length;i++){ 
            // 遍历所有cookie
            for(var j=0;j<this.goods.length;j++){
                console.log(this.goods[j].id)
                // 两相对比，发现id重复，那就是要加入购物车的商品
                if(this.res[i].goodsId == this.goods[j].id){
                    str += `<tr index="${this.goods[j].id}">
                                <td><input type="checkbox"></td>
                                <td><img src="${this.res[i].src}"></td>
                                <td>${this.res[i].name}</td>
                                <td>${this.res[i].price}</td>
                                <td><input type="number" value="${this.goods[j].num}" min=1></td>
                                <td><span class="delete">删除</span></td>
                                <td><span class="money">总价</span></td>
                            </tr>`
                }
            }
        }
        this.tbody.innerHTML = str;
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

new Car;