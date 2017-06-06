Template.task.helpers({

    processName: function() {
        if (this.processId) {
            return Procedures.findOne(this.processId).name;
        }
    },

    deadlineDate: function() {
        if (this.deadline) {
            return moment(this.deadline).format('MMMM Do YYYY');
        }

    },
    process: function() {

        if (Session.get('projectId')) {
            return false;
        } else {
            return true;
        }

    },
    nameSize: function() {

        if (Session.get('projectId')) {
            return '7';
        } else {
            return '4'
        }

    },
    assignedPic: function() {

        if (this.assignedId) {
            var user = Meteor.users.findOne(this.assignedId);

            if (user.pictureId) {
                return Files.findOne(user.pictureId).link();

            }
        }
    },
    assignedTo: function() {

        if (this.assignedId) {
            var user = Meteor.users.findOne(this.assignedId);

            if (user.userName) {
                return user.userName;

            } else {
                return user.emails[0].address;
            }
        } else {
            return 'Not assigned';
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

Template.task.events({

    'click .task-delete': function() {
        Meteor.call('deleteTask', this._id);
    },
    'click .check-task': function() {
        Meteor.call('completeTask', this._id);
    }


});
