
const sendmail = require('sendmail')({
    devPort: 1025, // Default: False
    devHost: 'localhost', // Default: localhost
    smtpHost: 'localhost',
    smtpPort: 1025
})

module.exports = function (router) {
    router.get('initmails', '/initmails', (ctx) => {
        sendmail({
            logger: {
                debug: console.log,
                info: console.info,
                warn: console.warn,
                error: console.error
            },
            silent: false,
            from: 'test@mailhog.api.local',
            to: 'info@mailhog.api.local',
            /*  replyTo: 'jason@mailhog.api.local',*/
            subject: 'MailComposer sendmail',
            html: 'Mail of test sendmail '
        }, function (err, reply) {
            console.log('errors :', err && err.stack)
            console.dir('reply = ', reply)
            ctx.body = { "message": "init mails done" };
        })

        ctx.body = { "message": "init mails done" };

    })
};


