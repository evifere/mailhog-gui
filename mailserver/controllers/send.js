
const sendmail = require('sendmail')({
    devPort: 1025, // Default: False
    devHost: 'localhost', // Default: localhost
    smtpHost: 'localhost',
    smtpPort: 1025
})

module.exports = function (router) {
    router.post('send', '/send', async (ctx) => {
     
        const params = ctx.request.body;
        console.log('ctx',ctx.request.body)
        sendmail({
            logger: {
                debug: console.log,
                info: console.info,
                warn: console.warn,
                error: console.error
            },
            silent: false,
            from: 'test@mailhog.api.local',
            to: params.to,
            subject: params.subject,
            html:  params.body
        }, function (err, reply) {
            console.log('errors :', err && err.stack)
            console.dir('reply = ', reply)
            ctx.body = { "message": "send mail ok" };
        })

        ctx.body = { "message": "send mail done" };

    })
};


