
const comment = require('./data/comment/comment.json');
const axios = require('axios');
const md5 = require('md5');

const work = async (url) => {
  for (const url in comment) {
    if ((/^\/\d{4}\/\d{2}/).test(url)) {
      const slug = url.slice(9, -1);
      const reply = comment[url].sort((a, b) => {
        return new Date(a.createTime) - new Date(b.createTime);
      });
      console.log(slug);
      const rs = new Map();
      for (let i = 0; i < reply.length; ++ i) {
        rs.set(reply[i].id, i);
      }
      for (let i = 0; i < reply.length; ++ i) {
        const rep = reply[i];
        await axios.put(`http://new.swwind.me/api/post/by-slug/${slug}/reply`, {
          content: rep.content,
          email: rep.mail,
          githubId: '',
          gravatar: rep.mail ? md5(rep.mail) : '',
          replyTo: rep.rid ? rs.get(rep.rid) : null,
          site: rep.link,
          user: rep.nick,
          __$datetime: new Date(rep.createTime).getTime(),
        }, {
          headers: {
            'User-Agent': rep.ua
          }
        });
      }
    }
  }
}

work();

