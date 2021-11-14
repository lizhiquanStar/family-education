```
$ pps create [项目名称]
# 选择对应模版

# 创建成功，执行：
$ yarn

# 查看当前模版文档介绍，熟悉模版具有的组件，函数工具库等
$ yarn docs

# 创建基础组件
$ yarn cli:b

# cli:m 创建模块，及当前模块中会包含多个子模块，如产品管理模版包含产品详情，产品列表等子模块.最终创建如下：
- product
    - product-list
    - product-detail
    - index.route.ts
$ yarn cli:m

# cli:v 创建独立子模块，可选择对应父模块则会在对应父模块创建当下子模块，也可不选择则创建独立路由
$ yarn cli:v

ps: 创建完毕执行 yarn format 可自动根据设定规范格式化代码（前提代码运行起来了 及yarn sever 成功）, 专治强迫症患者
```
