---
title: Password Generator
toc: false
comments: false
date: 2018-10-07 15:09:52
---

<div id="div">
  <table style="margin: 100px auto;">
    <tr>
      <td style="width: 100px;">
        <span>密码 1</span>
      </td>
      <td>
        <input type="password" v-model="str1" @input="handleChange">
      </td>
    </tr>
    <tr>
      <td>
        <span>密码 2</span>
      </td>
      <td>
        <input type="password" v-model="str2" @input="handleChange">
      </td>
    </tr>
    <tr>
      <td>
        <span>密码 3</span>
      </td>
      <td>
        <input type="password" v-model="str3" @input="handleChange">
      </td>
    </tr>
    <tr>
      <td>
        <span>Type</span>
      </td>
      <td>
        <input type="text" v-model="type" @input="handleChange">
      </td>
    </tr>
    <tr>
      <td>
        <span>密码</span>
      </td>
      <td>
        <input type="text" :value="res" @click="$event.target.select()"></input>
      </td>
    </tr>
  </table>
</div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.5.17-beta.0/vue.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/blueimp-md5/2.10.0/js/md5.js"></script>
<script type="text/javascript">
{
  const vue = new Vue({
    el: '#div',
    data: {
      str1: '',
      str2: '',
      str3: '',
      type: '',
      res: ''
    },
    methods: {
      handleChange() {

        if (!this.str1 && !this.str2 && !this.str3) {
          return this.res = '';
        }

        const hash = (str, key, times) => {
          return times ? hash(md5(str + key), str, times - 1) : str;
        }

        const h1 = hash(this.str1, this.str2, 10);
        const h2 = hash(this.str2, this.str3, 10);
        const h3 = hash(this.str3, this.str1, 10);

        const h4 = hash(this.str1, this.str3, 10);
        const h5 = hash(this.str2, this.str1, 10);
        const h6 = hash(this.str3, this.str2, 10);

        const r1 = hash(md5(h1 + h2 + h3), this.type, 10);
        const r2 = hash(md5(h4 + h5 + h6), this.type, 10);

        this.res = hash(r1, r2, 10).slice(0, 16);
      }
    }
  });
}
</script>
