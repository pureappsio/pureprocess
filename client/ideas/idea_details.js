Template.ideaDetails.helpers({

    notes: function() {
        return Notes.find({ contentId: this._id });
    },
    categories: function() {

        return Categories.find({ type: 'content' });

    }

});

Template.ideaDetails.onRendered(function() {

    // Countdown
    $('.datetimepicker').datetimepicker();

    // Category
    if (this.data) {
        if (this.data.categoryId) {
            $('#content-category').val(this.data.categoryId);
        } else {
            $('#content-category').val('none');
        }
    }

    // Init
    CKEDITOR.replace('note-content', {
        height: '100px',
        extraPlugins: 'autolink'
    });

});

Template.ideaDetails.events({

    'click #add-note': function() {

        var note = {
            content: CKEDITOR.instances['note-content'].getData(),
            contentId: this._id,
            date: new Date(),
            writerId: Meteor.user()._id
        }

        Meteor.call('addNote', note);

    },
    'change #content-category': function() {

        Meteor.call('changeContentCategory', this._id, $('#content-category :selected').val());

    },
    'click #schedule': function() {

        Meteor.call('scheduleIdea', this._id, $("#content-date").val(), function(err, data) {

            Router.go('/calendar');

        });

    }

});
