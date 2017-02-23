Meteor.startup(function() {

    // Mail URL
    process.env.MAIL_URL = Meteor.settings.MAIL_URL;
    
    // Create users
    Meteor.call('createUsers');

});
