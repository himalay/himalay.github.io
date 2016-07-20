---
title: Make a POST request with JSON data using cURL
date: 2016-07-20 01:44:00 Z
tags:
- cURL
- cli
---

## Inline JSON

`curl -X POST -H "Content-Type: application/json" -d '{"username":"xyz","password":"xyz"}' http://example.com/api/v1/user`

## JSON file

`curl -X POST -H "Content-Type: application/json" --data @auth.json http://example.com/api/v1/user`