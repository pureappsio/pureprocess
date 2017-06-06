Template.domainDetails.helpers({

    processes: function() {
        return Procedures.find({});
    },
    defaultTasks: function() {
        return DefaultTasks.find({ domainId: this._id }, { sort: { type: 1, order: 1 } });
    },
    users: function() {
        return Meteor.users.find({});
    },
    categories: function() {

        return Categories.find({ type: 'content' });

    }

});

Template.domainDetails.events({

    'click #create-default': function() {

        var defaultTask = {
            type: $('#content-type :selected').val(),
            processId: $('#tasks :selected').val(),
            domainId: this._id,
            userId: Meteor.user()._id,
            date: $('#date :selected').val()
        }

        // Category ?
        var category = $('#content-category :selected').val();

        if (category != 'none') {
            defaultTask.categoryId = category;
        }

        // User?
        var user = $('#user :selected').val();

        if (user != 'none') {
            defaultTask.assignedId = user;
        }

        Meteor.call('createDefault', defaultTask);

    }

});


Template.domainDetails.onRendered(function() {

    // $('#tasks').multiselect();

});
