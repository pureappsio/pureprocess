Template.contentDetails.helpers({

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
    tasks: function() {
        return Tasks.find({ contentId: this._id }, { sort: { order: 1 } });
    },
    notes: function() {
        return Notes.find({ contentId: this._id });
    },
    areNotes: function() {
        notes = Notes.find({ contentId: this._id }).count();

        if (notes > 0) {
            return true;
        }
    },
    categories: function() {

        return Categories.find({ type: 'content' });

    }

});

Template.contentDetails.events({

    'change #content-category': function() {

        Meteor.call('changeContentCategory', this._id, $('#content-category :selected').val());

    },

    'click #delete-content': function() {

        Meteor.call('deleteContent', this._id, function(err, data) {

            Router.go('/calendar');

        });

    }

});


Template.contentDetails.onRendered(function() {

    if (this.data) {

        Session.set('contentId', this.data._id);
        Session.set('domainId', this.data.domain);

        // Category
        if (this.data.categoryId) {
            $('#content-category').val(this.data.categoryId);
        } else {
            $('#content-category').val('none');
        }


        // taskId = this.data._id;
        // deadline = this.data.date;

        // // Countdown
        // $('.datetimepicker').datetimepicker({
        //     defaultDate: deadline
        // }).on('dp.change', function(e) {
        //     var date = e.date;
        //     date = (e.date).toDate();
        //     Meteor.call('changeContentDate', date, taskId);
        // });

    }

});
