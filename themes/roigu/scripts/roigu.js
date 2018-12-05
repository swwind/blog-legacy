let rUrl = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[.\!\/\\w]*))?)/;

const fs = require('fs');
const __ = hexo.render.renderSync({path: `./themes/${hexo.config.theme}/languages/${hexo.config.language || 'default'}.yml`});

hexo.extend.tag.register('truth', function (args, content) {
  return hexo.render.renderSync({text: content.replace('\n', '<br>'), engine: 'markdown'})
    .replace(/<p>/img, `<span title="${args.join(' ')}" class="truth">`)
    .replace(/<\/p>/img, `</span>`);
}, {ends: true});

hexo.extend.tag.register('blockquote', function (args, content) {
  content = hexo.render.renderSync({text: content, engine: 'markdown'});
  if (args.length) {
    if (rUrl.test(args[args.length - 1])) {
      let url = args[args.length - 1];
      let aut = args.slice(0, args.length - 1).join(' ') || 'Unknow';
      return `
        <blockquote>
          ${content}
          <span class="speaker"><a href="${url}">${aut}</a></span>
        </blockquote>
      `;
    } else {
      let aut = args.join(' ');
      return `
        <blockquote>
          ${content}
          <span class="speaker">${aut}</span>
        </blockquote>
      `;
    }
  } else {
    return `
      <blockquote>
        ${content}
      </blockquote>
    `;
  }
}, {ends: true});

hexo.extend.tag.register('youtube', function (args) {
  let id = args[0];
  return `
    <div class="video-container">
      <iframe src="https://www.youtube.com/embed/${id}" frameborder="0" allowfullscreen width="750" height="421.875">
        ${__.no_iframe}
      </iframe>
    </div>
  `;
});
hexo.extend.tag.register('bilibili', function (args) {
  let aid = args[0] || "170001";
  let page = args[1] || "1";
  return `<div class="bilibili-card-pre" data-aid="${aid}" data-page="${page}"></div>`
});
hexo.extend.tag.register('bilibilivideo', function (args) {
  let aid = args[0] || "170001";
  let page = args[1] || "1";
  return `
    <div class="video-container">
      <iframe src="//player.bilibili.com/player.html?aid=${aid}&page=${page}" frameborder="0" allowfullscreen width="750" height="550" allowfullscreen scrolling="no" frameborder="no">
        ${__.no_iframe}
      </iframe>
    </div>
  `;
});

let aplayer_count = 0;

hexo.extend.tag.register('aplayer', function (args) {
  let inc = '';
  if (!this.aplayer) {
    inc = '<script src="https://cdnjs.cloudflare.com/ajax/libs/aplayer/1.6.0/APlayer.min.js"></script>';
    this.aplayer = true;
  }
  ++ aplayer_count;
  let url = args[0];
  if (!url) return '<div class="warning">APlayer has no URL</div>';
  let title = args[1] || 'Untitled';
  let author = args[2] || 'Unknow Artist';
  return inc + `
    <div class="aplayer" id="aplayer-${aplayer_count}"></div>
    <script type="text/javascript">
      new APlayer({
        element: document.getElementById('aplayer-${aplayer_count}'),
        music: {
          title: '${title}',
          author: '${author}',
          url: '${url}'
        }
      })
    </script>
  `;
});

let dplayer_count = 0;

hexo.extend.tag.register('dplayer', function (args) {
  let inc = '';
  if (!this.dplayer) {
    inc = `
      <script src="https://cdnjs.cloudflare.com/ajax/libs/dplayer/1.22.0/DPlayer.min.js"></script>
      <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/dplayer/1.22.0/DPlayer.min.css">
    `;
    this.dplayer = true;
  }
  ++ dplayer_count;
  let url = args[0];
  if (!url) return '<div class="warning">DPlayer has no URL</div>';
  return inc + `
    <div class="dplayer" id="dplayer-${dplayer_count}"></div>
    <script type="text/javascript">
      new DPlayer({
        element: document.getElementById('dplayer-${dplayer_count}'),
        video: {
          url: '${url}'
        }
      })
    </script>
  `;
});
hexo.extend.tag.register('remark', function (args, content) {
  content = hexo.render.renderSync({text: content, engine: 'markdown'});
  return `
    <div class="remark">
      <p class="rmk-title">${__.remark}</p>
      ${content}
    </div>
  `;
}, {ends: true});

