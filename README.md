# Express + MongoDB + Vue 实现简单的管理系统全栈项目

> 目录结构

```
.
├── README.md
├── client                                  ---> 客户端vue项目
│   ├── README.md
│   ├── babel.config.js
│   ├── package.json
│   ├── public
│   │   ├── favicon.ico
│   │   └── index.html
│   ├── src
│   │   ├── App.vue
│   │   ├── assets
│   │   │   ├── 404.png
│   │   │   ├── background-img.jpg
│   │   │   └── loading-bgimg.jpg
│   │   ├── components                      ---> 组件   
│   │   │   ├── Header.vue
│   │   │   └── LeftMenu.vue
│   │   ├── http.js                         ---> 配置axios
│   │   ├── main.js                         ---> vue 入口文件
│   │   ├── router.js                       ---> vue 路由文件
│   │   ├── store.js                        ---> vuex 状态管理库
│   │   └── views                           ---> 页面
│   │       ├── 404.vue
│   │       ├── About.vue
│   │       ├── Account.vue
│   │       ├── Home.vue
│   │       ├── Index.vue
│   │       ├── Login.vue
│   │       └── Register.vue
│   ├── static
│   │   └── reset.css
│   ├── vue.config.js
│   └── yarn.lock
├── config                                  ---> 以下服务端 Express项目
│   ├── keys.js                             
│   └── passport.js                         ---> passport 验证登录状态
├── models                                  ---> 数据模型
│   ├── Profile.js
│   └── User.js                             
├── package.json
├── public                                  ---> 封装公共响应头
│   └── msg.js
├── routes                                  ---> 路由文件
│   └── api
│       ├── profiles.js                     ---> 数据增删改查接口
│       └── users.js                        ---> 注册登录接口
├── server.js                               ---> express 入口文件
└── verification                            ---> 验证文件
    ├── isLogin.js
    ├── isProfile.js
    ├── isRegister.js
    └── isValid.js

13 directories, 39 files
```

> 接口文档

```
 * ===================================================== *
 * 注册接口 POST
 * 注册用户
 * Address: http://api.link97.com:8085/profile/register
 * 参数: name、email、password、management
 * Type:String
 * management 只接受两个值 ‘管理员’或‘员工’  string
 * ===================================================== *

 # 响应头
 
    @成功

    {
        "flag": 1,
        "msg": "注册成功!",
        "data": {
            "_id": "5c0ca60397cc865414873a1c",
            "name": "test name ",
            "email": "test@test2.com",
            "password": "$2b$10$nZ8i50Ji4h9VFCemiauTaOWSLiphWj9ZYAdPErH3SUE4K7PrKzkPe",
            "avatar": "http://www.gravatar.com/avatar/3e1163777d25d2b935057c3ae393efee?s=200&r=pg&d=mm",
            "management": "员工",
            "date": "2018-12-09T05:20:03.742Z",
            "__v": 0
        },
        "status": 200
    }    

 
 * ===================================================== *
 * 登录接口 POST
 * 注册用户
 * Address: http://api.link97.com:8085/profile/login
 * 参数: email、password
 * Type:String
 * ===================================================== *

 # 响应头

    @成功
    {
        "flag": 1,
        "msg": "登录成功!",
        "data": {
            "name": "display li",
            "email": "test@test.com",
            "avatar": "http://www.gravatar.com/avatar/b642b4217b34b1e8d3bd915fc65c4452?s=200&r=pg&d=mm",
            "management": "管理员",
            "token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1YzBhOWIzYWRlMDExZTRmOGQzMDMxZDkiLCJtYW5hZ2VtZW50Ijoi566h55CG5ZGYIiwiZW1haWwiOiJ0ZXN0QHRlc3QuY29tIiwiYXZhdGFyIjoiaHR0cDovL3d3dy5ncmF2YXRhci5jb20vYXZhdGFyL2I2NDJiNDIxN2IzNGIxZThkM2JkOTE1ZmM2NWM0NDUyP3M9MjAwJnI9cGcmZD1tbSIsIm5hbWUiOiJkaXNwbGF5IGxpIiwiaWF0IjoxNTQ0MzMyOTUyLCJleHAiOjE1NDQzMzY1NTJ9.d9Y6W-pR_Ft5X8h3DNISxMc051Iir7bnbXLUQMfnvHE"
        },
        "status": 200
    }





 * ===================================================== *
 * 添加数据接口 POST
 * 添加数据
 * Address: http://api.link97.com:8085/profile/add
 * 参数: types、details、income、expend、account、remarks
 * Type:String
 * income、expend、account 这三个参数必须是字符串类型的数字 
 * ===================================================== *

  # 响应头
    自己测吧





 * ===================================================== *
 * 查询数据接口 POST
 * 获取所有用户的全部数据
 * Address: http://api.link97.com:8085/profile/getAll
 * 参数: null
 * Type:null
 * ===================================================== *

  # 响应头
    自己测吧





 * ===================================================== * 
 * 编辑数据接口 POST
 * 编辑数据
 * Address: http://api.link97.com:8085/profile/edit
 * 参数: types、details、income、expend、account、remarks、id
 * Type:String
 * income、expend、account 这三个参数必须是字符串类型的数字
 * ===================================================== *

  # 响应头
    自己测吧





 * ===================================================== *
 * 删除数据接口 POST
 * 删除数据
 * Address: http://api.link97.com:8085/profile/delete
 * 参数: id
 * Type:String
 * ===================================================== *



   # 响应头
    自己测吧
```

