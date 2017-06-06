Template.projects.helpers({

    domains: function() {
        return Domains.find({});
    }

});

Template.projects.events({

    'click #create-project': function() {

        var project = {
            title: $('#project-name').val(),
            domain: $('#project-domain :selected').val(),
            status: 'new'
        }

        Meteor.call('addProject', project);

    }

});
