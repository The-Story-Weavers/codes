// 打包后文件复制和重命名操作
const fs = require('fs')
const path = require('path');
// 删除文件夹 如果文件夹里面有文件删除不了，需要递归删除
const del = (url)=>{
	//获得所有文件
	let arr = fs.readdirSync(url);
	//循环所有文件
	arr.forEach((x)=>{
		//组合文件路径
		let fileurl = path.resolve(url,x);
		//获得文件的详细信息
		let xinxi =  fs.statSync(fileurl);
		// 判断
		if(xinxi.isFile()){
			fs.unlinkSync(fileurl);//是文件删除
		}else if(xinxi.isDirectory()){
			del(fileurl);//是文件夹递归调用
		}
	})
	//删除文件夹(如果文件夹里面有文件删除不了)
	fs.rmdirSync(url);
}
try {
    // 拷贝打包后的index.html到views目录，并重命名为login
    fs.copyFileSync('./pts/browser/index.html','./pts/views/login.html');
    // 拷贝打包后的index.html到views目录
    fs.copyFileSync('./pts/browser/index.html','./pts/views/index.html');
    // 拷贝完后，删除原位置的index.html
    fs.unlinkSync('./pts/browser/index.html');
    console.log('login.html,index.html复制完成,index.html删除完成')
    // 删除多余的文件夹
    // del(path.resolve(__dirname,'./pts/assets/views'))
    console.log('assets文件夹下的views目录删除完成')
  } catch (err) {
    console.error(err)
  }