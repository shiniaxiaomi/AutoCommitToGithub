var fs=require("fs")
var shell = require('shelljs');

// var delay=5000;//1小时
var delay=1*60*60;//1小时

var path="F:\\code\\mdToHtml";

//进入到笔记目录下
shell.cd(path);

//保存定时器的id
var timeid=undefined;

//监听文件改动
fs.watch(path, function (event, filename) {
    //排除.git目录
    if (filename!=".git") {//如果改变了,则等待两秒后上传
        clearTimeout(timeid);
        timeid=setTimeout(function(){
            gitPush();
        },10000)
    }
});


//推送笔记
function gitPush(){
    shell.exec("git add . && git commit -m 'Auto-commit' && git push", function(code, stdout, stderr) {
        if(code!=0){//报错
            console.log(new Date().toLocaleString()+'上传失败:'+stderr);
        }else{
            console.log(new Date().toLocaleString()+'上传成功:'+stdout);
        }
      })
}


