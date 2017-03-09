Template.tasks.onRendered(function() {

    // Countdown
    $('.datetimepicker').datetimepicker();

});

Template.tasks.events({

    'click #create-task': function() {

        // Task
        var task = {
            name: $('#task-name').val(),
            deadline: new Date($('#task-date').val()),
            creationDate: new Date(),
            assignedId: $('#task-user :selected').val(),
            userId: Meteor.user()._id,
            status: 'new',
            domainId: $('#domain-id :selected').val()
        }

        // Process?
        if ($('#task-process :selected').val() != 'no') {
            task.processId = $('#task-process :selected').val();
        }

        // Attachement?
        if (Session.get('attachementId')) {
            task.attachementId = Session.get('attachementId');
        }

        Meteor.call('createTask', task);
    }

});

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
