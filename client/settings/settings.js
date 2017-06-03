Template.settings.events({

    'click #set-username': function() {

        Meteor.call('setUsername', $('#user-name').val(), Meteor.user()._id);

    },
    'click #set-picture': function() {

        Meteor.call('setUserPicture', Session.get('userPicture'), Meteor.user()._id);

    },
    'click #set-preference': function() {

        var preference = {
            processId: $('#tasks :selected').val(),
            userId: Meteor.user()._id,
            date: parseInt($('#date :selected').val()),
        }

        Meteor.call('setPreference', preference);

    }


});

Template.settings.helpers({

    userName: function() {

        return Meteor.user().userName;

    },
    userPic: function() {

        if (Meteor.user().pictureId) {
            return Files.findOne(Meteor.user().pictureId).link();
        }

    },
    processes: function() {
        return Procedures.find({});
    },
    preferences: function() {
        return Preferences.find({});
    }

});
