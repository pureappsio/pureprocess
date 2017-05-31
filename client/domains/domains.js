Template.domains.helpers({

    domains: function() {
        return Domains.find({});
    }

});

Template.domains.events({

    'click #create-domain': function() {
        var domain = {
            userId: Meteor.user()._id,
            name: $('#domain-name').val(),
            url: $('#domain-url').val()
        }

        Meteor.call('createDomain', domain);
    },
    'click #set-colors': function() {
        
        Meteor.call('setColors');
    }

});
