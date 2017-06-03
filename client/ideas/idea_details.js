Template.ideaDetails.helpers({

    notes: function() {
        return Notes.find({ contentId: this._id });
    }

});

Template.ideaDetails.events({

    'click #add-note': function() {

        var note = {
            content: $("#note-content").val(),
            contentId: this._id,
            date: new Date(),
            writerId: Meteor.user()._id
        }

        Meteor.call('addNote', note);

    }

});
