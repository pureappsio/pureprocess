Template.defaultTask.events({

    'click .task-delete': function() {
        Meteor.call('deleteDefaultTask', this._id);
    }

});

Template.defaultTask.helpers({

    processName: function() {
        return Procedures.findOne(this.processId).name;
    },
    categoryName: function() {
        if (this.categoryId) {
            return ' - ' + Categories.findOne(this.categoryId).name;
        } else {
            return ' - Generic';
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

    }

});
