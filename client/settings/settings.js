Template.settings.events({

    'click #set-username': function() {

        Meteor.call('setUsername', $('#user-name').val(), Meteor.user()._id);

    }

});

Template.settings.helpers({

    userName: function() {

       return Meteor.user().userName;

    }

});

