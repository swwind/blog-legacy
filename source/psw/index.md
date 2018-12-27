---
title: Password Generator
toc: false
comments: false
date: 2018-10-07 15:09:52
---

<div id="div"><table style="margin: 100px auto;"><tr><td style="width: 100px;"><span>密码 1</span></td><td><input type="password" v-model="str1" @input="handleChange"></td></tr><tr><td><span>密码 2</span></td><td><input type="password" v-model="str2" @input="handleChange"></td></tr><tr><td><span>密码 3</span></td><td><input type="password" v-model="str3" @input="handleChange"></td></tr><tr><td><span>分区</span></td><td><input type="text" v-model="type" @input="handleChange"></td></tr><tr><td><span>密码</span></td><td><input type="text" :value="res" @click="$event.target.select()"></input></td></tr></table></div>
<script src="/js/vue.min.js"></script>
<script src="/js/md5.min.js"></script>
<script type="text/javascript">"use strict";var vue=new Vue({el:"#div",data:{str1:"",str2:"",str3:"",type:"",res:""},methods:{handleChange:function(){if(!this.str1&&!this.str2&&!this.str3)return this.res="";var t=function t(s,r,i){return i?t(md5(s+r),s,i-1):s},s=t(this.str1,this.str2,10),r=t(this.str2,this.str3,10),i=t(this.str3,this.str1,10),h=t(this.str1,this.str3,10),e=t(this.str2,this.str1,10),n=t(this.str3,this.str2,10),a=t(md5(s+r+i),this.type,10),d=t(md5(h+e+n),this.type,10);this.res=btoa(t(a,d,10)).slice(0,16)}}});</script>
