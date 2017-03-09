// Import SendGrid
import sendgridModule from 'sendgrid';
const sendgrid = require('sendgrid')(Meteor.settings.sendGridAPIKey);

Meteor.methods({

    sendEmail(emailData) {

        // Build mail
        var helper = sendgridModule.mail;
        from_email = new helper.Email('process@schwartzindustries.com');
        to_email = new helper.Email(emailData.to);
        subject = emailData.subject;
        content = new helper.Content("text/html", emailData.text);
        mail = new helper.Mail(from_email, subject, to_email, content);

        mail.from_email.name = "PureProcess";

        // Send
        var requestBody = mail.toJSON()
        var request = sendgrid.emptyRequest()
        request.method = 'POST'
        request.path = '/v3/mail/send'
        request.body = requestBody

        sendgrid.API(request, function(err, response) {

            console.log('Email sent');
            if (err) { console.log(err); }

        });

    }

});
