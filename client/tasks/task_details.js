Template.taskDetails.onRendered(function() {

    if (this.data) {

        taskId = this.data._id;
        deadline = this.data.deadline;

        // Countdown
        $('.datetimepicker').datetimepicker({
            defaultDate: deadline
        }).on('dp.change', function(e) {
            var date = e.date;
            date = (e.date).toDate();
            Meteor.call('changeTaskDate', date, taskId);
        });

        if (this.data.assignedId) {
            $('#assigned-id').val(this.data.assignedId);
        }

    }

});

Template.taskDetails.helpers({

    users: function() {
        return Meteor.users.find({});
    },

    processName: function() {
        if (this.processId) {
            return Procedures.findOne(this.processId).name;
        }
    },
    contentName: function() {

        if (this.contentId) {
            return '(' + Content.findOne(this.contentId).title + ')';
        }

    },
    fileLink: function() {
        return Files.findOne(this.attachementId).link();
    },
    steps: function() {
        return Steps.find({ processId: this.processId });
    },
    deadlineDate: function() {
        return moment(this.deadline).format('MMMM Do YYYY');
    },
    assignedTo: function() {

        var user = Meteor.users.findOne(this.assignedId);

        if (user) {
            if (user.userName) {
                return user.userName;

            } else {
                return user.emails[0].address;
            }
        }

    },
    completedColor: function() {

        if (this.status == 'completed') {
            return 'completed-task';
        } else {

            // Check if late 
            var now = new Date();
            var diff = now.getTime() - (this.deadline).getTime();
            if (diff > 0) {

                return 'late-task';

            }
        }

    },
    isActive: function() {
        if (this.status == 'completed') {
            return false;
        } else {
            return true;
        }
    }

});

Template.taskDetails.events({

    'change #assigned-id': function() {

        Meteor.call('changeTaskOwner', this._id, $('#assigned-id :selected').val());

    },
    'click .task-delete': function() {
        Meteor.call('deleteTask', this._id);
    },
    'click .task-check': function() {
        Meteor.call('completeTask', this._id);
    }


});
