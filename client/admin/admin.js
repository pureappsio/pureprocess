Template.admin.helpers({

    users: function() {
        return Meteor.users.find({});
    },
    integrations: function() {
        return Integrations.find({});
    }

});

Template.admin.events({

    'click #set-user-picture': function() {

        Meteor.call('setUserPicture', Session.get('userPicture'), $('#user-picture-id :selected').val());

    },
    'click #set-user-password': function() {

        Meteor.call('setUserPassword', $('#user-password').val(), $('#user-password-id :selected').val());

    },
    'click #add-category': function() {

        Meteor.call('addCategory', {
            name: $('#category-name').val(),
            userId: Meteor.user()._id,
        });

    },
    'click #add-content-category': function() {

        Meteor.call('addCategory', {
            name: $('#content-category-name').val(),
            userId: Meteor.user()._id,
            type: 'content'
        });

    },
    'click #set-user-name': function() {

        Meteor.call('setUsername', $('#user-name').val(), $('#user-id :selected').val());

    },
    'click #set-operator': function() {
        Meteor.call('setOperator', $('#operator :selected').val());
    },
    'click #add-integration': function() {

        var accountData = {
            type: $('#integration-type :selected').val(),
            key: $('#integration-key').val(),
            url: $('#integration-url').val(),
            userId: Meteor.user()._id
        };
        Meteor.call('addIntegration', accountData);

    }

});
