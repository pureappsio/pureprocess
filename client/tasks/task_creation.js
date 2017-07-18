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
            creationDate: new Date(),
            assignedId: $('#task-user :selected').val(),
            userId: Meteor.user()._id,
            status: 'new'
        }

        // Deadline
        if ($('#task-date').val() != '') {
            task.deadline = new Date($('#task-date').val());
        }

        // Deadline
        if ($('#task-description').val() != '') {
            task.description = $('#task-description').val();
        }

        // Domain
        if (Session.get('domainId')) {
            task.domainId = Session.get('domainId');
        } else {
            task.domainId = $('#domain-id :selected').val();
        }

        // Project
        if (Session.get('projectId')) {
            task.projectId = Session.get('projectId');
        }

        // Process?
        if ($('#task-process :selected').val() != 'no') {
            task.processId = $('#task-process :selected').val();
        }

        // Repeat?
        if ($('#task-repeat :selected').val() != 'no') {
            task.repeat = $('#task-repeat :selected').val();
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
