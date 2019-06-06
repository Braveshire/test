class Index{
    constructor(){
        this.notLogin = document.querySelector(".not-login")
        this.loginS = document.querySelector(".login-success")
        this.user = document.querySelector(".login-success span")

        this.logout = document.querySelector(".logout");

        // 获取所有的用户信息
        this.init();
        // 添加注销事件
        this.addEvent();
    }
    addEvent(){
        // 点击注销时
        this.logout.onclick = ()=>{
            for(var i=0;i<this.usermsg.length;i++){
                // 找到要注销的账号
                if(this.name == this.usermsg[i].user){
                    // 修改当前账号的登录状态为0
                    this.usermsg[i].onoff = 0;
                    // 隐藏登录成功的信息
                    this.notLogin.style.display = "block";
                    this.loginS.style.display = "none";
                    // 再将用户的信息设置回去，实现真正的注销
                    localStorage.setItem("usermsg",JSON.stringify(this.usermsg))
                    // 结束
                    return ;
                }
            }
        }
    }
    init(){
        // 获取所有的用户信息直接转换，方便使用
        this.usermsg = localStorage.getItem("usermsg") ? JSON.parse(localStorage.getItem("usermsg")) : [];
        // 开始验证
        this.check()
    }
    check(){
        // 拿到所有的信息
        for(var i=0;i<this.usermsg.length;i++){
            // 判断哪个用户的状态为已登录
            if(this.usermsg[i].onoff == 1){
                // 显示登录成功的信息
                this.notLogin.style.display = "none";
                this.loginS.style.display = "block";
                // 设置当前用户名
                this.user.innerHTML = this.usermsg[i].user;
                // 保存当前用户名，用作注销
                this.name = this.usermsg[i].user;
                
                return;
            }
        }
    }
}

new Index;

class Chongwu{
    constructor(){
        this.tab=document.querySelector("#shouji3 .tab");
        this.url="http://localhost:3000/index.json";
        this.init();
        
    }
    init(){
        var that=this;
        ajax({
            url:this.url,
            success:function(res){
                that.res=JSON.parse(res)
                console.log(that.res)
                that.display()
            }
        })
    }
    display(){
        var str="";
        for(var i=0;i<this.res.length;i++){
            str+=`
            <ul  abc=${this.res[i].goodsId} >
                <li>
                    <a target="_blank">
                        <img src="${this.res[i].src}" width="206" height="236">
                        <p>${this.res[i].name}</p>
                        <span>${"价格："+this.res[i].price}</span>
                        <b class="www">${this.res[i].details}</b>
                    </a>
                    <span>
                </li>
            </ul>
            `
        }
        this.addEvent();
        this.tab.innerHTML=str;
    }  
    addEvent(){
        var that = this;
        this.tab.addEventListener("click",function(eve){
            var e = eve || window.event;
            var target = e.target || e.srcElement;
            if(target.className == "www"){
                that.id = target.parentNode.parentNode.parentNode.getAttribute("abc");
                console.log(that.id)
                that.setCookie()
            }
        })
    }
    setCookie(){
        // this.goods = getCookie("shangpin");
    
        // console.log(this.goods) 
        // if(this.goods){
        //     this.goods = JSON.parse(this.goods)
        var data = [{id:this.id}]
        data = JSON.stringify(data);
        //     var onoff = true;
            setCookie("shangpin",data,{expires:3});
            window.open("details.1/details.html","_blank")
            // location.href="details.1/details.html";//不能在原基础上打开
            // for(var i=0;i<this.goods.length;i++){
            //     if(this.goods[i].id == this.id){
            //         this.goods[i].num ++;
            //         onoff = false;
            //     }
            }
            // if(onoff){
            //     this.goods.push({
            //         id:this.id,
            //         num:1
            //     })
            // }
        // }else{
        //     this.goods = [{
        //         id:this.id,
        //         num:1
        //     }]
        // }
        // setCookie("shangpin",JSON.stringify(this.goods))
    // }
}
new  Chongwu;