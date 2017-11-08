---
title: Chrome DevTool - Snippets
date: 2017-11-08
categories:
- dev
tags:
- tips
layout: post
commentIssueId: 3
coverImage: /assets/images/posts/2017-11-08-devtool-snippet.jpg
coverImageCaption: Chrome DevTool - <a href="https://developers.google.com/web/tools/chrome-devtools/snippets" target="_blank">Snippets</a>
---

We can save any piece of JavaScript as Snippet in Chrome DevTool and you can run it on DevTool console any time you need.

To get to the Snippets, we have to go to the Sources tab on DevTool then click on the right double angle. Under the Snippets sub-tab, we can add multiple pieces of JavaScript code in separate snippets.

For example, we can add a snippet that toggles all the Checkboxes in the page.

```javascript
[...$$('[type="checkbox"]')]
.forEach(x => {
    x.checked = !x.checked
    })
```

In order to execute a snippet, we can right click on the snippet then click on `Run` on the menu, or we can quickly execute a snippet by pressing `Cmd + Shift + P` for Command Menu popup on the DevTool and entering `!` followed by the snippet name.

[Devtools-snippets page](https://bgrins.github.io/devtools-snippets/) contains a handful of useful snippets collection.
