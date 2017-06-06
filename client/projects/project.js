Template.project.helpers({

    notes: function() {

        return Notes.find({ projectId: this._id }).count();

    },
    tasks: function() {

        return Tasks.find({ projectId: this._id }).count();

    },
    progress: function() {

        var completedTasks = Tasks.find({ status: 'completed', projectId: this._id }).count();
        var allTasks = Tasks.find({ projectId: this._id }).count();

        if (allTasks == 0) {
            return 0;
        }
        else {
            return (completedTasks/allTasks * 100).toFixed(0);
        }

    }

});

Template.project.events({

    'click .project-delete': function() {

        Meteor.call('removeProject', this._id);

    }

});