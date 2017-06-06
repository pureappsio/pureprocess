Template.procedures.events({

    'click #create-process': function() {

        var process = {
            name: $('#process-name').val(),
            userId: Meteor.user()._id,
            categoryId: $('#category :selected').val()
        }

        Meteor.call('createProcess', process);

    }

});

Template.procedures.helpers({

    processes: function() {
        return Procedures.find({ categoryId: { $exists: false } });
    },
    categories: function() {
        return Categories.find({ type: { $exists: false } });
    }

});
