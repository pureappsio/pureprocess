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
            status: 'new'
        }

        // Process?
        if ($('#task-process :selected').val() != 'no') {
            task.processId = $('#task-process :selected').val();
        }

        Meteor.call('createTask', task);
    }

});

Template.tasks.helpers({

    processes: function() {
        return Procedures.find({});
    },
    users: function() {
        return Meteor.users.find({});
    },
    tasks: function() {
    	return Tasks.find({status: 'new'}, {sort: {date: 1}});
    },
    completedTasks: function() {
    	return Tasks.find({status: 'completed'}, {sort: {date: 1}});
    }

});
