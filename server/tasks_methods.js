Meteor.methods({

    createTask: function(task) {

        console.log(task);
        Tasks.insert(task);

    },
    deleteTask: function(taskId) {
        Tasks.remove(taskId);
    },
    completeTask: function(taskId) {
        Tasks.update(taskId, { $set: { status: 'completed' } });
    }

});
