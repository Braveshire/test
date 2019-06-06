let gulp=require("gulp");

// gulp.task("task",async()=>{
//     await console.log("hello")
// })

gulp.task("index",()=>{
    gulp.src("src/project/**/*").pipe(gulp.dest("server"));
})

gulp.task("watch",()=>{
    gulp.watch(["src/project/**/*"],["index"])
})
