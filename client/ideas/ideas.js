Template.ideas.helpers({

    domains: function() {
        return Domains.find({});
    },
    categories: function() {

        return Categories.find({ type: 'content' });

    }

});

Template.ideas.onRendered(function() {

    if (!Session.get('ideaDomain')) {
        Session.set('ideaDomain', 'all');
    }

});


Template.ideas.events({

    'change #domain-select': function() {

        Session.set('ideaDomain', $('#domain-select :selected').val());

    },
    'click #create-idea': function() {

        var idea = {
            title: $('#idea-name').val(),
            type: $('#idea-type :selected').val(),
            domain: $('#idea-domain :selected').val(),
            status: 'idea'
        }

        // Category ?
        var category = $('#content-category :selected').val();

        if (category != 'none') {
            idea.categoryId = category;
        }

        Meteor.call('createIdea', idea);

    }

});
