const koaRouter = require('koa-router')
const router = new koaRouter();

require('./controllers/index')(router);
require('./controllers/initmails')(router);



module.exports = router