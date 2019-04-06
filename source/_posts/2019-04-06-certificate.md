---
title: 给 localhost 颁发一份证书
date: 2019-04-06 11:01:55
categories: 教程
desc: 这样就能在开发环境中使用 https 了
---

~~我们可以直接使用 `openssl`。~~

什么 `openssl`，不存在的，我就是要用 nodejs 写。

npm 上有一个 `node-forge` 库，相当于纯 js 写的 `openssl`。

我们来讲讲怎么用它。

# 生成并安装自签名的 CA 根证书

```js
// 创建一份随机钥匙对
const keys = forge.pki.rsa.generateKeyPair(2048);
// 创建证书
const cert = forge.pki.createCertificate();
// 使用公钥
cert.publicKey = keys.publicKey;
// 序列号（？
cert.serialNumber = String(Date.now());
// 设置有效日期
cert.validity.notBefore = new Date();
cert.validity.notBefore.setFullYear(cert.validity.notBefore.getFullYear() - 5);
cert.validity.notAfter = new Date();
cert.validity.notAfter.setFullYear(cert.validity.notAfter.getFullYear() + 20);
// 属性设置
const attrs = [
  { name: 'commonName', value: 'My Certificate Authority' },
  { name: 'countryName', value: 'CN' },
  { shortName: 'ST', value: 'Zhejiang' },
  { name: 'localityName', value: 'Shaoxing' },
  { name: 'organizationName', value: 'Myself' },
  { shortName: 'OU', value: 'https://blog.swwind.me' }
];
// 设置 subject
cert.setSubject(attrs);
// 设置颁发者
cert.setIssuer(attrs);
// 设置 Extensions
// 这里不用改
cert.setExtensions([{
  name: 'basicConstraints',
  critical: true,
  cA: true
}, {
  name: 'keyUsage',
  critical: true,
  keyCertSign: true
}, {
  name: 'subjectKeyIdentifier'
}]);

// 用自己的私钥给 CA 根证书签名
cert.sign(keys.privateKey, forge.md.sha256.create());

// 公钥 ca.crt
console.log(forge.pki.certificateToPem(cert));
// 私钥 ca.key.pem
console.log(forge.pki.privateKeyToPem(keys.privateKey));
```

接下来我们需要的是安装我们的 CA 根证书（添加到信任列表）。

## Windows

```cmd
certutil -addstore -f "ROOT" ca.crt
```

## MacOS

```bash
sudo security add-trusted-cert -d -r trustRoot -k /Library/Keychains/System.keychain ca.crt
```

## Linux

直接通过浏览器 import，简单粗暴。

# 签发 localhost 的证书

```js
// 读取根证书 caCert 和 caKey
const caCertPem = fs.readFileSync('ca.crt', 'utf8');
const caKeyPem = fs.readFileSync('ca.key.pem', 'utf8');
const caCert = forge.pki.certificateFromPem(caCertPem);
const caKey = forge.pki.privateKeyFromPem(caKeyPem);

// 生成随机秘钥对
const keys = forge.pki.rsa.generateKeyPair(2048);
// 生成证书
const cert = forge.pki.createCertificate();
cert.publicKey = keys.publicKey;
cert.serialNumber = String(Date.now());
cert.validity.notBefore = new Date();
cert.validity.notBefore.setFullYear(cert.validity.notBefore.getFullYear() - 1);
cert.validity.notAfter = new Date();
cert.validity.notAfter.setFullYear(cert.validity.notAfter.getFullYear() + 10);

const attrs = [
  { name: 'commonName', value: 'localhost' },
  { name: 'countryName', value: 'CN' },
  { shortName: 'ST', value: 'Zhejiang' },
  { name: 'localityName', value: 'Shaoxing' },
  { name: 'organizationName', value: 'Myself' },
  { shortName: 'OU', value: 'https://blog.swwind.me' }
];

// 颁发者设置为根证书
cert.setSubject(attrs);
cert.setIssuer(caCert.subject.attributes);

// 证书设置
cert.setExtensions([{
  name: 'basicConstraints',
  critical: true,
  cA: false
}, {
  name: 'keyUsage',
  keyCertSign: true,
  digitalSignature: true,
  nonRepudiation: true,
  keyEncipherment: true,
  dataEncipherment: true
}, {
  name: 'extKeyUsage',
  serverAuth: true,
  clientAuth: true,
  codeSigning: true,
  emailProtection: true,
  timeStamping: true
}, {
  name: 'nsCertType',
  client: true,
  server: true,
  email: true,
  objsign: true,
  sslCA: true,
  emailCA: true,
  objCA: true
}, {
  name: 'subjectAltName',
  // 这里填多个域名或者 ip
  altNames: [{
    type: 2, // DNS
    value: 'localhost'
  }, {
    type: 7, // ipv4
    ip: '127.0.0.1'
  }, {
    type: 7, // ipv6
    ip: '[::1]'
  }]
}, {
  name: 'subjectKeyIdentifier'
}]);
// 使用根证书签名
cert.sign(caKey, forge.md.sha256.create());

// 公钥 localhost.crt
console.log(forge.pki.certificateToPem(cert));
// 私钥 localhost.key.pem
console.log(forge.pki.privateKeyToPem(keys.privateKey));
```

然后就可以用 `localhost.crt` 和 `localhost.key.pem` 为所欲为啦。

可以用 `http-server` 测试一下

```bash
yarn global add http-server
echo hello world > index.html
http-server -S -C localhost.crt -K localhost.key.pem
```

效果：

![chrome-https](/img/chrome-https.png)

<span class="truth" title="还是我操作不对">firefox 上截不了图</span>

# 其他偷懒方法

~~[mkcert](https://github.com/FiloSottile/mkcert) 只需要两句话~~

```bash
mkcert -install
mkcert localhost 127.0.0.1 ::1
```

<span class="hide">我就是要把最方便的方法放在最后面</span>

[end]
