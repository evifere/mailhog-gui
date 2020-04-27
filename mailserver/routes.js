const koaRouter = require('koa-router')
const router = new koaRouter();

require('./controllers/index')(router);
require('./controllers/initmails')(router);
require('./controllers/send')(router);



module.exports = router