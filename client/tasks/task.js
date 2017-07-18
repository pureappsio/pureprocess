Template.task.helpers({

    processName: function() {
        if (this.processId) {
            return Procedures.findOne(this.processId).name;
        }
    },

    noFilter: function() {

        if (Session.get('tasksView')) {
            if (Session.get('tasksView') == 'all') {
                return true;
            } else {
                return false;
            }
        } else {
            return true;
        }

    },
    contentName: function() {
        if (this.contentId) {
            return '(' + Content.findOne(this.contentId).title + ')';
        }

        if (this.projectId) {
            return '(' + Projects.findOne(this.projectId).title + ')';
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
        } else if (Session.get('tasksView')) {
            if (Session.get('tasksView') == 'all') {
                return '4';
            } else {
                return '6';
            }
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

            if ((this.deadline).getDate() == now.getDate() && (this.deadline).getMonth() == now.getMonth()) {

                return 'today-task';

            } else if (diff > 0) {
                return 'late-task';

            } else {
                return 'default-task';
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
