'use strict';
const koa = require('koa')
const json = require('koa-json')
const koaRouter = require('koa-router')
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');
const app = new koa()

app.use(cors());
app.use(json());
app.use(bodyParser());
const router = require('./routes');


app.use(router.routes())
  .use(router.allowedMethods())

app.listen(1234, () => console.log('running on port 1234'))