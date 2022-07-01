# hm_toutiao

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


发送ajax请求
1.yarn add axios


为什么要同时使用vuex和本地存储？
1.vuex数据是响应式，用vuex只要数据变化，其他地方会自动更新   但是不能刷新，一刷新就消失
2.本地存储可以实现出久华，但是需要手动操作，麻烦