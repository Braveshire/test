
// var flag=0;
// $(".left").children("a").eq(1).click(function(eve){
//     if(flag==0){
//         $("#wechat").children("img").css({
//             "display": "block"
//         })
//         flag=1;
//     }else{
//         $("#wechat").children("img").css({
//             "display": "none"
//         }) 
//         flag=0
//     }
//     var event = eve || window.event;
//     event.stopPropagation()
// })
// $(document).click(function(){
//     $("#wechat").children("img").css({
//         "display": "none"
//     })
//     flag=0;

// })


// console.log(  $("#wechat").children("img"))
// console.log("6666");

$(".mainbox").find("li").eq(0).hover(function(){
    $(this).parent().parent().parent().next().css({
        "display":"block"
    })
},function(){
    $(this).parent().parent().parent().next().css({
        "display":"none"
    })

})