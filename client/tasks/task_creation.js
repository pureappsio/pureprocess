Template.taskCreation.onRendered(function() {

    // Countdown
    $('.datetimepicker').datetimepicker();

});

Template.taskCreation.helpers({

    processes: function() {
        return Procedures.find({});
    },
    domains: function() {
        return Domains.find({});
    },
    users: function() {
        return Meteor.users.find({});
    },
    domainColor: function() {
        if (Session.get('domainId')) {
            return Domains.findOne(Session.get('domainId')).color;
        }
    },
    domainDefined: function() {

        if (Session.get('domainId')) {
            return Domains.findOne(Session.get('domainId')).name;
        }

    }

});

Template.taskCreation.events({

    'click #create-task': function() {

        // Task
        var task = {
            name: $('#task-name').val(),
            deadline: new Date($('#task-date').val()),
            creationDate: new Date(),
            assignedId: $('#task-user :selected').val(),
            userId: Meteor.user()._id,
            status: 'new'
        }

        // Domain
        if (Session.get('domainId')) {
            task.domainId = Session.get('domainId');
        } else {
            task.domainId = $('#domain-id :selected').val();
        }

        // Process?
        if ($('#task-process :selected').val() != 'no') {
            task.processId = $('#task-process :selected').val();
        }

        // Attachement?
        if (Session.get('attachementId')) {
            task.attachementId = Session.get('attachementId');
        }

        // Content ID?
        if (Session.get('contentId')) {
            task.contentId = Session.get('contentId');
        }

        Meteor.call('createTask', task);
    }

});
