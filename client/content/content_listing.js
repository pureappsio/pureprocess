Template.contentListing.helpers({

    categoryName: function() {
        if (this.categoryId) {
            return ' - ' + Categories.findOne(this.categoryId).name;
        }
    },
    notes: function() {

        return Notes.find({ contentId: this._id }).count();

    },
    tasks: function() {

        return Tasks.find({ contentId: this._id }).count();

    },
    progress: function() {

        var completedTasks = Tasks.find({ status: 'completed', contentId: this._id }).count();
        var allTasks = Tasks.find({ contentId: this._id }).count();

        if (allTasks == 0) {
            return 0;
        }
        else {
            return (completedTasks/allTasks * 100).toFixed(0);
        }

    }

});

Template.contentListing.events({

    'click .content-delete': function() {

        Meteor.call('deleteContent', this._id);

    }

});