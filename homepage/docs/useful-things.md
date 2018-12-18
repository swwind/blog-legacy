# Useful things

The biggest advantage of the Roigu Theme is that it has a lot of interesting things which you can used in your post.

If you have more great ideas, welcome to submit your pull request!

## Special classes

### truth

It represents the truth that you want others to know.

```markdown
<span class="truth">Hey boy!</span>
```

It will be rendered with black background and black text color. If you move your mouse hover it, the color of text will become white and then you can see the words in it.

Idea from <https://moegirl.org>

### hide

It will hide your text by color it in fill white.

```markdown
<span class="hide">I'm white!</span>
```

Only press `ctrl+A` to see it.

## Special tags

### truth

You can use tags instead of HTML.

```markdown
{% truth [title] %}
Hey boy!
{% endtruth %}
```

### blockquote

It can include author and link.

```markdown
{% blockquote [author] [link] %}
What he/she said...
{% endblockquote %}
```

### youtube

```markdown
{% youtube id %}
```

### bilibili

```markdown
{% bilibili aid [pid] %}
```

P.S. This is not a video player but a card links to the video. The whitelist was not friendly to us.

### bilibili video

```markdown
{% bilibilivideo aid [pid] %}
```

This is the real player.
