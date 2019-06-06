class List{
    constructor(){
        this.cont = document.getElementById("cont");
        this.url = "http://localhost:3000/shoppingcar/goods.json";
        this.left = document.getElementById("btnL");
        this.right = document.getElementById("btnR");
        this.pageCont = document.getElementById("pageCont");

        this.num=5;
        this.index=0;

        this.init();
        this.addEvent1();
        this.addEvent2();
    }
    init(){
        var that = this;
        ajax({
            url:this.url,
            success:function(res){
                that.res = JSON.parse(res)
                that.display();
                that.createPage()
            }
        })
    }


    // for(var i=this.num*this.index;i<this.num*this.index+this.num;i++){
        //             // 当i不在length范围内时不拼接
        //             if(i < this.res.length){
        //                 str += `<li>
        //                         <img src="${this.res[i].url}" alt="" class="img">        
        //                         <h2>商品名称:<span>${this.res[i].name}</span></h2>
        //                         <h2>商品介绍:<span>${this.res[i].tip}</span></h2>
        //                         <h2>商品价格:<span>${this.res[i].price}</span></h2>
        //                     </li>`;
        //             }
        //         }




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
    addEvent2(){
        var that = this;
        this.left.onclick = function(){
            // 6-1.计算索引
            that.changeIndex("l")
        }
        this.right.onclick = function(){
            // 6-2.计算索引
            that.changeIndex("r")
        }
    }
    createPage(){
        // 计算一共有几页
        this.maxNum = Math.ceil(this.res.length / this.num);
        // 渲染页码
        var str = "";
        for(var i=0;i<this.maxNum;i++){
            str += `<li>${i+1}</li>`
        }
        this.pageCont.innerHTML = str;
        // 设置当前页的当前项
        this.pageCont.children[this.index].className = "active";
    }
    changeIndex(type){
        if(type == "l"){
            if(this.index == 0){
                this.index = this.maxNum-1;
            }else{
                this.index--
            }
        }else{
            if(this.index == this.maxNum-1){
                this.index = 0
            }else{
                this.index++
            }
        }
        // 7.渲染页面
        this.display()
        // 8.改变页码的当前项
        this.changeActive()
    }
    changeActive(){
        // 改变页码的当前项
        for(var i=0;i<this.pageCont.children.length;i++){
            this.pageCont.children[i].className = "";
        }
        this.pageCont.children[this.index].className = "active";
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

// class Page{
//     constructor(){
//         // 1.选择元素
//         this.list = document.getElementById("List");
//         this.left = document.getElementById("btnL");
//         this.right = document.getElementById("btnR");
//         this.pageCont = document.getElementById("pageCont");
//         this.url = "http://localhost:3000/shoppingcar/goods.json";

//         // 一页显示几条数据
//         this.num = 5;
//         // 默认在第几页
//         this.index = 0;

//         // 2.请求数据
//         this.load();
//         // 5.绑定点击事件
//         this.addEvent()
//     }
//     load(){
//         var that = this;
//         ajax({
//             url:this.url,
//             success:function(res){
//                 // 解析数据
//                 that.res = JSON.parse(res);
//                 // 3.渲染页面
//                 that.display()
//                 // 4.渲染页码
//                 that.createPage()
//             }
//         })
//     }
//     display(){
//         // console.log(this.res)
//         // 开始渲染页面
//         var str = "";
        
//         // 根据index和num显示每页的数据

//         // 0~5     this.num5 * this.index0 ~ this.num5 * this.index0 + this.num5
//         // 5~10    this.num5 * this.index1 ~ this.num5 * this.index1 + this.num5
//         // 10~15   this.num5 * this.index2 ~ this.num5 * this.index2 + this.num5
//         for(var i=this.num*this.index;i<this.num*this.index+this.num;i++){
//             // 当i不在length范围内时不拼接
//             if(i < this.res.length){
//                 str += `<li>
//                         <img src="${this.res[i].url}" alt="" class="img">        
//                         <h2>商品名称:<span>${this.res[i].name}</span></h2>
//                         <h2>商品介绍:<span>${this.res[i].tip}</span></h2>
//                         <h2>商品价格:<span>${this.res[i].price}</span></h2>
//                     </li>`;
//             }
//         }
//         this.list.innerHTML = str;
//     }
//     createPage(){
//         // 计算一共有几页
//         this.maxNum = Math.ceil(this.res.length / this.num);
//         // 渲染页码
//         var str = "";
//         for(var i=0;i<this.maxNum;i++){
//             str += `<li>${i+1}</li>`
//         }
//         this.pageCont.innerHTML = str;
//         // 设置当前页的当前项
//         this.pageCont.children[this.index].className = "active";
//     }
//     addEvent(){
//         var that = this;
//         this.left.onclick = function(){
//             // 6-1.计算索引
//             that.changeIndex("l")
//         }
//         this.right.onclick = function(){
//             // 6-2.计算索引
//             that.changeIndex("r")
//         }
//     }
//     changeIndex(type){
//         if(type == "l"){
//             if(this.index == 0){
//                 this.index = this.maxNum-1;
//             }else{
//                 this.index--
//             }
//         }else{
//             if(this.index == this.maxNum-1){
//                 this.index = 0
//             }else{
//                 this.index++
//             }
//         }
//         // 7.渲染页面
//         this.display()
//         // 8.改变页码的当前项
//         this.changeActive()
//     }
//     changeActive(){
//         // 改变页码的当前项
//         for(var i=0;i<this.pageCont.children.length;i++){
//             this.pageCont.children[i].className = "";
//         }
//         this.pageCont.children[this.index].className = "active";
//     }
// }


// new Page()