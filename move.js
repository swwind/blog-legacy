const db = require('./db.json');
const axios = require('axios');

const cs = new Map();
for (const cate of db.models.Category) {
  cs.set(cate._id, cate.name);
}
const ts = new Map();
for (const tag of db.models.Tag) {
  ts.set(tag._id, tag.name);
}

const ps = new Map();
for (const post of db.models.Post) {
  ps.set(post._id, {
    body: [{
      content: post._content,
      format: 'markdown',
      language: 'zh',
      default: true,
      title: post.title,
    }],
    cover: '',
    date: post.date,
    hideOnIndex: false,
    insertCover: false,
    password: '',
    slug: post.slug,
    tags: [],
    category: 'Default',
  });
}

for (const cate of db.models.PostCategory) {
  const p = ps.get(cate.post_id);
  p.category = cs.get(cate.category_id);
}
for (const tag of db.models.PostTag) {
  const p = ps.get(tag.post_id);
  p.tags.push(ts.get(tag.tag_id));
}

const push = async (post) => {
  await axios.put('http://new.swwind.me/api/post?token=bUKZVHnLBIsCyiP', post);
}

const work = async () => {
  for (const post of ps) {
    console.log(post[1].category);
    await push(post[1]);
  }
}

work();

