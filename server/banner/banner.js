$(".banner1").banner({
    items:$(".banner1 .imgbox").children(),
    left:$(".banner1 #left"),
    right:$(".banner1 #right"),
    list:true,
    autoPlay:true
});
var ali =$(".lt-tabtit li")
var lt1 = $(".lt-ct1");
var lt3 = $(".lt-ct3");

ali.eq(0).hover(function(){
    // console.log($(this).parent().parent().parent().children(".lt-ct1"))
    $(this).parent().parent().parent().children(".lt-ct1").css(
        "display","block" 
    )
    $(this).parent().parent().parent().children(".lt-ct3").css(
        "display","none" 
    )
},function(){
    // $(this).parent().parent().parent().children(".lt-ct1").css(
    //     "display","block" 
    // )
    $(this).parent().parent().parent().children(".lt-ct3").css(
        "display","block" 
    )
    $(this).parent().parent().parent().children(".lt-ct1").css(
        "display","none" 
    )
})
ali.eq(1).hover(function(){
    $(this).parent().parent().parent().children(".lt-ct3").css(
        "display","block" 
    )
    $(this).parent().parent().parent().children(".lt-ct1").css(
        "display","none" 
    )
},function(){
        $(this).parent().parent().parent().children(".lt-ct3").css(
            "display","none" 
        )
        $(this).parent().parent().parent().children(".lt-ct1").css(
                "display","block" 
            )
})
// console.log(lt3)
        // var ali1 = document.querySelectorAll(".lt-tabtit .first");
        // var ali2 = document.querySelectorAll(".lt-tabtit .second");
		// var amsg = document.querySelectorAll(".msg")
        // var lt1 = document.querySelector(".lt-ct1");
        // var lt3 = document.querySelector(".lt-ct3");
		// console.log(ali1)
		// console.log(ali2)
		// ali1.onclick=function(){
        //     lt1.style.display="block"
        //     lt3.style.display="none"
        // }
		// // ali2.onclick=function(){
        // //     lt1.style.display="block"
        // //     lt3.style.display="none"
        // // }

		