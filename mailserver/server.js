'use strict';
const koa = require('koa')
const json = require('koa-json')
const koaRouter = require('koa-router')

const app = new koa()

app.use(json());

const router = require('./routes');


app.use(router.routes())
  .use(router.allowedMethods())

app.listen(1234, () => console.log('running on port 1234'))