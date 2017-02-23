Template.admin.helpers({

    users: function() {
        return Meteor.users.find({});
    },
    integrations: function() {
        return Integrations.find({});
    }

});

Template.admin.events({

    'click #add-category': function() {

        Meteor.call('addCategory', {
            name: $('#category-name').val(),
            userId: Meteor.user()._id
        });

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
