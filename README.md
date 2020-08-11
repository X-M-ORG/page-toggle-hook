# page-toggle-hook

页面切换钩子，用户侦听页面的切换状态

## 安装

**import**

```npm
npm i page-toggle-hook -S
```

**use**

```js
import Vue from 'vue'
import pageToggleHook from 'page-toggle-hook'

Vue.use(pageToggleHook, { env: 'h5' })
```

**options**

| name | type   | require | default | desc                                                     |
| ---- | ------ | ------- | ------- | -------------------------------------------------------- |
| env  | String | false   | 'h5'    | 使用的环境，可选值: h5、miniapp ，后续有需求会支持快应用 |

## 使用

**vue**

```html
<template>
  <div></div>
</template>

<script>
  export default {
    onShow() {
      // 页面显示时触发
    },

    onHide() {
      // 页面隐藏时触发
    }
  }
<script>
```

## 不同环境

### H5

无需设置

### miniapp

需要在小程序的 webview 页面上， onShow 时给 src 添加 hash，如下：

```js
Page({
  data: {
    src: ''
  },

  onShow() {
    this.setData({ src: addTimestampToHash(this.data.src) })
  }
})

function addTimestampToHash(url) {
  const now = Date.now()

  let [routeStr, hashStr] = url.split('#')
  if (hashStr) {
    let [hashPath, hashQuery] = hashStr.split('?')

    if (hashQuery) {
      hashQuery = hashQuery.replace(/^[0-9]*/, '')
    }

    hashStr = [hashPath, hashQuery ? now + hashQuery : now].join('?')
  } else {
    hashStr = '/?' + now
  }

  return [routeStr, hashStr].join('#')
}
```

> 并非必须使用上面方法，只要能在 onShow 时更新 src 的 hash 即可，否则将不会触发 web 中的 onShow
