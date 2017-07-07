Meteor.methods({

    changeStepOrder: function(stepId, orderChange) {

        // Get step
        var element = Steps.findOne(stepId);
        var currentOrder = element.order;
        var elements = Steps.find({ processId: element.processId }).fetch();

        if (elements.length == currentOrder && orderChange == 1) {
            console.log('Not changing order');
        } else if (currentOrder == 0 && orderChange == -1) {
            console.log('Not changing order');
        } else {

            console.log('Changing order');

            if (orderChange == 1) {
                var pastElement = Steps.findOne({ processId: element.processId, order: currentOrder + 1 });
            }
            if (orderChange == -1) {
                var pastElement = Steps.findOne({ processId: element.processId, order: currentOrder - 1 });
            }

            // Current element
            Steps.update(stepId, { $inc: { order: orderChange } });

            // Past
            if (orderChange == 1) {
                Steps.update(pastElement._id, { $inc: { order: -1 } });
            }
            if (orderChange == -1) {
                Steps.update(pastElement._id, { $inc: { order: 1 } });
            }
        }

    },
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
        Steps.update(stepId, { $set: query });

    }

});
