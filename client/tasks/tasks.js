Template.tasks.helpers({

    processes: function() {
        return Procedures.find({});
    },
    domains: function() {
        return Domains.find({});
    },
    users: function() {
        return Meteor.users.find({});
    },
    tasks: function() {
        return Tasks.find({
            status: 'new',
            assignedId: Meteor.user()._id,
            deadline: { $exists: true }
        }, { sort: { deadline: 1 } });
    },
    allTasks: function() {
        if (Session.get('tasksView')) {
            if (Session.get('tasksView') == 'all') {
                return true;
            } else {
                return false;
            }
        } else {
            return true;
        }
    }

});

Template.tasks.onRendered(function() {

    Session.set('contentId', null);
    Session.set('domainId', null);
    Session.set('projectId', null);

    Session.set('tasksView', 'all');

});

Template.tasks.events({

    'change #task-view': function() {
        Session.set('tasksView', $('#task-view :selected').val());
    }

});
