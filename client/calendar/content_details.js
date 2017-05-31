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
        return Tasks.find({ contentId: this._id });
    }

});

Template.contentDetails.events({

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

    }

});
