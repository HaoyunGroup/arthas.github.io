# souyao_webpc

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# run all tests
npm test
```

## 项目布局

```txt

├── build                                       // webpack配置文件
├── config                                      // 项目打包路径
├── dist                                        // 打包文件
├── src                                         // 源码目录
│   ├── api                                     // 请求接口
│   ├── common                                  // 公共工具
│   ├── assets                                  // 需要编译的静态资源
│   ├── components                              // 组件
│   ├── pages                                   // 页面
│   ├── router                                  // 路由文件
│   ├── store                                   // vuex的状态管理
│   │   ├── action.js                           // 配置actions
│   │   ├── index.js                            // 引用vuex，创建store
│   │   ├── modules                             // store模块
│   │   ├── types.js                            // 定义常量muations名
│   │   └── mutations.js                        // 配置mutations
│   ├── App.vue                                 // 页面入口文件
│   ├── main.js                                 // 程序入口文件，加载各种公共组件
├── static                                      // 不需要编译的静态资源

```
