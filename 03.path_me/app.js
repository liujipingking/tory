//引入http模块
let http = require ("http");
//引入路径
let path = require("path");
//配置网站根目录
let rootPath = path.join(__dirname,'www');
//引入文件系统
let fs = require("fs");
//开启服务
 http.createServer(( request,response)=>{
        console.log('请求来啦');
        //根据请求的url服务这边拼接成完整绝对路径
        let filePath = path.join(rootPath,request.url);
        //判断以上目录是否存在
        let  isExist = fs.existsSync(filePath);
        //如果存在
        if(isExist){
               // 只有存在才需要继续走
      // 生成文件列表
      fs.readdir(filePath, (err, files) => {
        // 如果是文件
        if (err) {
          console.log(err);
          // console.log('不是文件夹');
          // 能够进到这里 说明是文件
          // 读取文件 返回读取的文件
          fs.readFile(filePath, (err, data) => {
            // 直接返回
            response.end(data);
          });
        }
        // 如果是文件夹 
        else {
          console.log(files); 
          // 直接判断是否存在首页
          if (files.indexOf("index.html") != -1) {
            console.log("有首页");
            // 读取首页即可
            fs.readFile(path.join(filePath,'index.html'),(err,data)=>{
                if(err){
                    console.log(err);
                }else{
                    response.end(data);
                }
            })
          }
          // 如果没有首页
          else {
            // 没有首页
            let backData = "";
            for (let i = 0; i < files.length; i++) {
              backData += `<h2><a href="./${files[i]}">${files[i]}</a></h2>`;
            }
            response.writeHead(200, {
              "content-type": "text/html;charset=utf-8"
            });
            response.end(backData);
          }
        }
      }); 
        }
        else{
             // 不存在 返回 404
      response.writeHead(404, {
        "content-type": "text/html;charset=utf-8"
      });
      response.end(`
                <!DOCTYPE HTML PUBLIC "-//IETF//DTD HTML 2.0//EN">
                <html><head>
                <title>404 Not Found</title>
                </head><body>
                <h1>Not Found</h1>
                <p>The requested URL /index.hththt was not found on this server.</p>
                </body></html>
        `);
        }
  }).listen(80,"10.254.5.134",()=>{
      console.log("开启监听10.254.5.134");
  })