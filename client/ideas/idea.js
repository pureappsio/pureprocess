Template.idea.events({

    'click .idea-delete': function() {

        Meteor.call('deleteContent', this._id);

    },
    'click .schedule-idea': function() {

        Meteor.call('scheduleIdea', this._id, $("#content-date-" + this._id).val(), function(err, data) {

            Router.go('/calendar');

        });

    }

});

Template.idea.helpers({

    notes: function() {

        return Notes.find({ contentId: this._id }).count();

    },
    categoryName: function() {
    	if (this.categoryId) {
    		return ' - ' + Categories.findOne(this.categoryId).name;
    	}
    }

});


Template.idea.onRendered(function() {

    // Countdown
    $('.datetimepicker').datetimepicker();

});
