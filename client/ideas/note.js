Template.note.events({

    'click .note-delete': function() {

        Meteor.call('removeNote', this._id);

    }

});

Template.note.helpers({

    imageLink: function() {

        if (this.attachmentId) {

            return Files.findOne(this.attachmentId).link();

        }

    },
    assignedPic: function() {

        if (this.writerId) {
            var user = Meteor.users.findOne(this.writerId);

            if (user.pictureId) {
                return Files.findOne(user.pictureId).link();

            }
        }
    },
    assignedTo: function() {

        if (this.writerId) {
            var user = Meteor.users.findOne(this.writerId);

            if (user.userName) {
                return user.userName;

            } else {
                return user.emails[0].address;
            }
        }

    },

});
