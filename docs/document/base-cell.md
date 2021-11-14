# 查看
##### 记得修改浏览器中端口为自己服务端口
See [base-cell](http://localhost:8083/base-cell).

# USAGE
```html
<template>
  <base-cell
    class="view-base"
    :showImg="false"
    title="张森严"
    sub="不展示图片"
  ></base-cell>
  <base-cell
    class="view-base-cell"
    imgUrl="https://img.yzcdn.cn/vant/cat.jpeg"
    title="张森严"
    sub="完整表现"
    tag="隐私客户"
    rightText="右边内容"
    :showArrow="true"
    @right-click="rightClick"
    @click="allClick"
  ></base-cell>
  <base-cell
    class="view-base-cell"
    imgUrl="https://img.yzcdn.cn/vant/cat.jpeg"
    title=""
    sub="无主标题"
    tag="隐私客户"
  ></base-cell>
  <base-cell
    class="view-base-cell"
    imgUrl="https://img.yzcdn.cn/vant/cat.jpeg"
    title="张森严"
    sub="没有tag"
  ></base-cell>
  <base-cell
    class="view-base-cell"
    imgUrl=""
    title="张森严"
    sub="名字作为图片"
  ></base-cell>
  <base-cell
    class="view-base-cell"
    imgUrl=""
    title="Jason Boker"
    sub="英文名取首字母"
  ></base-cell>
  <base-cell
    class="view-base-cell"
    imgUrl=""
    title="Jasonbbeee"
    sub="单英文取前两位"
  ></base-cell>
  <base-cell
    class="view-base-cell"
    imgUrl=""
    title="Jasonbbeee"
    :showDefaultImg="true"
    sub="取默认图片"
  ></base-cell>
  <base-cell
    class="view-base-cell"
    imgUrl=""
    title="Jasonbbeee"
    sub="自定义默认图片"
  >
    <template #loadingSlot>
      <van-icon name="friends-o" />
    </template>
  </base-cell>
</template>

```

## Properties

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|-----------|-----------|-----------|-------------|-------------|
| imgUrl | 图片地址 | `String` | - | - |
| title | 标题 | `String ｜ Number` | - | - |
| sub | 副标题 | `String ｜ Number` | - | - |
| showDefaultImg | imgUrl为空是否使用默认图片 | `Boolean` | - | false(默认为标题对应规则取值) |
| tag | 主标题右侧标识占位 | `String` | - | - |
| showArrow | 右侧是否有箭头 | `Boolean` | - | false|
| rightText | 右侧内容 | `String ｜ Number` | - | -|

## Events
| 事件名 | 说明 |
|-----------|-----------|
| right-click | 右侧单击事件 |

## Slots
| 名称 | 说明 |
|-----------|-----------|
| loadingSlot | 图片加载默认内容 |
| errorSlot | 加载失败显示内容 |
| title | 自定义主题内容 |
| sub | 自定义副主题内容 |
