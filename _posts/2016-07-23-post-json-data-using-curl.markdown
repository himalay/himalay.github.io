---
title: Post JSON data using cURL
date: 2016-07-23 02:53:21 Z
category: cli
tags: [cURL]
layout: post
---

In this post I would like to show how to make post request with `JSON` data using `curl` cli tool.

### Inline JSON

`curl -X POST -H "Content-Type: application/json" -d '{"username":"xyz","password":"xyz"}' http://example.com/api/v1/user`

### JSON file

`curl -X POST -H "Content-Type: application/json" --data @auth.json http://example.com/api/v1/user`
