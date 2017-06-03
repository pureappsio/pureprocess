Template.ideas.helpers({

    domains: function() {
        return Domains.find({});
    }

});

Template.ideas.events({

    'click #create-idea': function() {

        var idea = {
            title: $('#idea-name').val(),
            type: $('#idea-type :selected').val(),
            domain: $('#idea-domain :selected').val(),
            status: 'idea'
        }

        Meteor.call('createIdea', idea);

    }

});