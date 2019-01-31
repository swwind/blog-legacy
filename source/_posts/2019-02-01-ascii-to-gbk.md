---
title: GBK 乱码问题
date: 2019-02-01 02:36:24
categories: 工具
toc: false
---

最近在网上下载了一个压缩包，据说密码写在压缩包注释中。

我的解压软件可爱地把压缩包的注释告诉了我：

    Comment =
    ½âÑ¹ÃÜÂë£ºJune

我沉默了。。。

那么我们就来聊一聊 GBK 乱码的解决方法。

好吧，其实简单的不得了。

```js
const source = '½âÑ¹ÃÜÂë£ºJune';
const array = new Uint8Array(source.split([]).map((c) => c.charCodeAt(0)));
console.log(new TextDecoder('GBK').decode(array));
// => "解压密码：June"
```

既然如此我就直接写个工具了。

<div id="app">
  <textarea v-model="source" @input="handleChange" class="left" placeholder="输入..."></textarea>
  <div class="middle"></div>
  <div v-text="result" class="right"></div>
</div>

<style>
#app {
  display: flex;
  width: 100%;
  box-sizing: border-box;
  height: 200px;
  background: #eee;
  border-radius: 5px;
  justify-content: space-between;
}
#app .middle {
  background: #aaa;
  width: 2px;
}
#app .left {
  background: transparent;
  flex: 1;
  border: none;
  outline: none;
  padding: 10px;
  font-family: monospace;
  resize: none;
}
#app .right {
  flex: 1;
  padding: 10px;
}
</style>

<script type="text/javascript" src="/js/vue.min.js"></script>
<script type="text/javascript">
new Vue({
  el: '#app',
  data: {
    source: '',
    result: ''
  },
  methods: {
    handleChange() {
      const array = new Uint8Array(this.source.split([]).map((c) => c.charCodeAt(0)));
      this.result = new TextDecoder('GBK').decode(array);
    }
  }
});
</script>


