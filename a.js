var fs=require("fs")
var shell = require('shelljs');

var isChange=false;
var delay=10000;

var path="C:\\Users\\yingjie.lu\\Desktop\\新建文件夹";

//保存定时器的id
var timeid=setTime(delay);

//监听文件改动
fs.watch(path, function (event, filename) {
    if (filename) {//如果改变了,则等待两秒后上传
        isChange=true;
        clearInterval(timeid);
        timeid=setTime(delay);
    }
});

//设置定时器,如果改动则进行上传
function setTime(time){
    var id=setInterval(function(){
        if(isChange){
            gitPush();
            isChange=false;
        }
    },time)

    return id;
}

function gitPush(){
    shell.exec('git add .', {silent:true}).stdout;
    shell.exec("git commit -m 'bc'", {silent:true}).stdout;
    shell.exec('git push', {silent:true}).stdout;
}


