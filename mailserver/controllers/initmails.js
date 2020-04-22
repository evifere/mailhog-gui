
const sendmail = require('sendmail')({
    devPort: 1025, // Default: False
    devHost: 'localhost', // Default: localhost
    smtpHost: 'localhost',
    smtpPort: 1025
})

const LoremIpsum = require("lorem-ipsum").LoremIpsum;

const lorem = new LoremIpsum({
    sentencesPerParagraph: {
      max: 8,
      min: 4
    },
    wordsPerSentence: {
      max: 16,
      min: 4
    },
    format:"html"
  });

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
            subject: lorem.generateWords(5),
            html:  lorem.generateParagraphs(7)
        }, function (err, reply) {
            console.log('errors :', err && err.stack)
            console.dir('reply = ', reply)
            ctx.body = { "message": "init mails done" };
        })

        ctx.body = { "message": "init mails done" };

    })
};


