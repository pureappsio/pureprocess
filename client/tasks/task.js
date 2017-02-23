Template.task.helpers({

    processName: function() {
        return Procedures.findOne(this.processId).name;
    },
    deadlineDate: function() {
        return moment(this.deadline).format('MMMM Do YYYY');
    },
    assignedTo: function() {
        return Meteor.users.findOne(this.assignedId).emails[0].address;
    },
    completedColor: function() {
        if (this.status == 'completed') {
            return 'completed-task';
        }
    },
    isActive: function() {
        if (this.status == 'completed') {
            return false;
        }
        else {
            return true;
        }
    }

});

Template.task.events({

    'click .task-delete': function() {
        Meteor.call('deleteTask', this._id);
    },
    'click .check-task': function() {
        Meteor.call('completeTask', this._id);
    }


});

