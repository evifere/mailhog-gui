
module.exports = function(router) {
    router.get('initmails', '/initmails', (ctx) => {
        ctx.body = {"message":"init mails done"};
      })
  };


