---
title: 使用 WebSocket 和 ffmpeg 直播 canvas
date: 2018-08-23 15:42:11
tags: [canvas, ffmpeg, websocket]
categories: 颓废
---

最近一直在折腾 rtmp 直播的相关内容，想要用 electron 写一个直播的软件。

现在打算写一下我的实现方法。

在这之前，我们需要了解两个浏览器提供的 API: CanvasCaptureMediaStream 和 MediaRecorder API。

[CanvasCaptureMediaStream][ccms] 用于从 canvas 元素创建原始视频流。

[MediaRecorder API][mra] 允许在浏览器中使用编解码器，将原始视频转换为可有效发送到服务器的 VP8，VP9 或 H.264 编码视频。

获取到视频之后，我们需要使用 WebSocket 将数据发送到后台，再在后台使用 ffmpeg 进行 rtmp 推流。

大致思路就是这样。

## 搭建 rtmp 服务器

网上教程太多了。。。

推荐个 [gwuhaolin/livego][livego]，下载即用，不用装什么乱七八糟的 nginx。

启动之后可以直接 `rtmp://localhost:1935/live/video` 推流，之后用 VLC 播放器打开 `rtmp://localhost:1935/live/video.flv` 即可看到直播内容。

可以先试着用 ffmpeg 推一个视频看看效果： `ffmpeg -re -i your_video.mp4 -vcodec libx264 -acodec aac -f flv rtmp://localhost:1935/live/video`

不出意外一切正常。

## 前端

短的不得了

```html
<canvas></canvas>
```

```js
const ws = new WebSocket('ws://localhost:16547');

ws.addEventListener('open', (e) => {

  const mediaStream = document.querySelector('canvas').captureStream(30); // 30 FPS

  const mediaRecorder = new MediaRecorder(mediaStream, {
    mimeType: 'video/webm;codecs=h264',
    // audioBitsPerSecond: 44100,       // 44.1kHz
    videoBitsPerSecond: 3 * 1024 * 1024 // 3000k 画质
  });

  mediaRecorder.addEventListener('dataavailable', (e) => {
    // 将数据发送到后台
    // 发送时 e.data 的类型是 Blob
    ws.send(e.data);
  });

  // 开始录制并每隔 1s 发送一次数据
  mediaRecorder.start(1000);

});
```

## 后端

后端采用 nodejs 编写，打算用 PHP 的请退群。

安装依赖：

```bash
npm install ws
```

同样也是短的不得了

```js
#!/bin/node

const WebSocketServer = require('ws').Server;
const wss = new WebSocketServer({ port: 16547 }); // 随便开个端口

const { spawn } = require('child_process');

const RTMP_SERVER = 'rtmp://localhost:1935/live/video';

wss.on('connection', (ws) => {

  const ffmpeg = spawn('ffmpeg', [
    // 从 stdin 中读入视频数据
    '-i', '-',

    // 视频转码
    // 由于视频已经是 H.264 编码，可以直接复制
    // 若需要转码则填 libx264
    '-vcodec', 'copy',

    // 音频转码
    '-acodec', 'aac',

    // 输出为 flv 格式
    '-f', 'flv',

    // RTMP 服务器
    RTMP_SERVER
  ]);

  ws.on('message', (msg) => {
    // 收到时 msg 的类型是 Buffer
    ffmpeg.stdin.write(msg);
  });
  
  ws.on('close', (e) => {
    // 断开链接即中断推流
    ffmpeg.kill('SIGINT');
  });

});
```

## 客户端

可以直接使用 [DPlayer][dp] 和 [flv.js][flvjs] 来播放 HTTP-FLV 直播流。

照样短的不得了

```html
<script src="flv.min.js"></script>
<script src="dplayer.min.js"></script>
<link rel="stylesheet" href="dplayer.min.css">

<div id="dplayer"></div>
```

```js
const dp = new DPlayer({
  container: document.getElementById('dplayer'),
  video: {
    url: 'http://localhost:7001/live/video.flv'
  },
  live: true,
  autoplay: true
});
```

## 后话

由于我最终使用 electron 包装，所以 WebSocket 这一步就免了。

然后我就被 Blob、Buffer、ArrayBuffer 等一大堆东西的互相转换搞得头大死了。

## 参考资料

<https://github.com/fbsamples/Canvas-Streaming-Example>

P.S.

关于怎么合入音轨我不是很了解，也许你需要另行 Google。

[end]

[ccms]: https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasCaptureMediaStream
[mra]: https://developer.mozilla.org/zh-CN/docs/Web/API/MediaRecorder
[livego]: https://github.com/gwuhaolin/livego
[dp]: https://github.com/MoePlayer/DPlayer
[flvjs]: https://github.com/Bilibili/flv.js
