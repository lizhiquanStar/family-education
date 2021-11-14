# 下载依赖
yarn

# cli 初始化
yarn cli:build
# 快速上手
yarn docs

# 运行项目
yarn serve

ps: 下载其他依赖请使用,请加上 -W

# 其他说明
若想避开微信登录请执行下方步骤
public/config.js 中放开 wechatCode
global.api.ts 中放开 checkOpenId getOpenId 中的 mock
