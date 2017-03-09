Template.step.events({

});

Template.stepTask.onRendered(function() {

    if (this.data) {

        stepId = this.data._id;

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
