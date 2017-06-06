Template.contentCalendar.helpers({

    icon: function() {

        if (this.type == 'video') {
            return 'video-camera';
        }
        if (this.type == 'article') {
            return 'file-text-o';
        }
        if (this.type == 'podcast') {
            return 'podcast';
        }

    },
    categoryName: function() {

        if (this.categoryId) {
            return Categories.findOne(this.categoryId).name;
        }

    },
    progress: function() {

        var numberTasks = Tasks.find({ contentId: this._id }).count();

        if (numberTasks > 0) {

            var completedTasks = Tasks.find({ status: 'completed', contentId: this._id }).count();

            return (completedTasks / numberTasks * 100).toFixed(0) + '%';

        }

    },
    domainName: function() {
        return Domains.findOne(this.domain).name;
    },
    domainColor: function() {
        return Domains.findOne(this.domain).color;
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

Template.contentCalendar.events({

    'click .calendar-content': function() {

        Router.go('/content/' + this._id);

    }

});
