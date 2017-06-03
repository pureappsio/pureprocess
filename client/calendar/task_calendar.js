Template.taskCalendar.helpers({

    domainName: function() {
        return Domains.findOne(this.domainId).name;
    },
    domainColor: function() {
        return Domains.findOne(this.domainId).color;
    },
    contentName: function() {
        if (this.contentId) {
            return Content.findOne(this.contentId).title;
        }
    },
    assignedPic: function() {

        if (this.assignedId) {
            var user = Meteor.users.findOne(this.assignedId);

            if (user.pictureId) {
                return Files.findOne(user.pictureId).link();

            }
        }
    }
});

Template.taskCalendar.events({

    'click .calendar-content': function() {

        Router.go('/tasks/' + this._id);

    }

});
