Template.tasks.helpers({

    processes: function() {
        return Procedures.find({});
    },
    domains: function() {
        return Domains.find({});
    },
    users: function() {
        return Meteor.users.find({});
    }

});

Template.tasks.onRendered(function() {

    Session.set('contentId', null);
    Session.set('domainId', null);
    Session.set('projectId', null);

});
