Meteor.methods({

    createStep: function(step) {

        // Find order
        var steps = Steps.find({ processId: step.processId }).fetch();
        order = steps.length + 1;
        step.order = order;

        // Video ?
        if (step.lessonId) {

        	// Grab URL
        	var lesson = Meteor.call('getLesson', step.lessonId);
        	step.videoUrl = lesson.url;

        }

        console.log(step);

        Steps.insert(step);

    },
    deleteStep: function(stepId) {
        Steps.remove(stepId);
    },
    editStep: function(stepId, parameter, value) {

        var query = {};
        query[parameter] = value;

        console.log(stepId);
        Steps.update(stepId, {$set: query});

    }

});
