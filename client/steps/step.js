Template.step.events({

    'click .step-delete': function() {

        Meteor.call('deleteStep', this._id);

    },
    'click .step-up': function() {

        Meteor.call('changeStepOrder', this._id, -1);

    },
    'click .step-down': function() {

        Meteor.call('changeStepOrder', this._id, 1);

    },
    'click .edit': function() {

        Meteor.call('editStep', this._id, 'content', $('#step-content-' + this._id).summernote('code'));

    }

});

Template.step.onRendered(function() {

    if (this.data) {

        stepId = this.data._id;

        if (Meteor.user().role == 'admin') {
            $('#step-content-' + this.data._id).summernote({
                minHeight: 100 // set editor height,
                    // callbacks: {
                    //     onChange: function() {
                    //         Meteor.call('editStep', stepId, 'content', $('#step-content-' + stepId).summernote('code'));
                    //     }
                    // }
            });
        }

        if (this.data.videoUrl) {

            if (videojs.getPlayers()['video-step-' + stepId]) {
                delete videojs.getPlayers()['video-step-' + stepId];
            }

            videojs("video-step-" + stepId, {}, function() {
                // Player (this) is initialized and ready.
            });
        }

    }

});
