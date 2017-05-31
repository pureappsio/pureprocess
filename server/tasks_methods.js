Meteor.methods({

    createTask: function(task) {        

        // Create task
        console.log(task);
        var taskId = Tasks.insert(task);

        // Get user
        var user = Meteor.users.findOne(task.assignedId);

        // Notify user
        SSR.compileTemplate('newTaskEmail', Assets.getText('task_email.html'));
        templateData = {
            taskLink: Meteor.absoluteUrl() + taskId,
            taskName: task.name
        }
        text = SSR.render("newTaskEmail", templateData);

        var emailData = {
            to: user.emails[0].address,
            subject: 'A new task was assigned to you',
            text: text
        }
        Meteor.call('sendEmail', emailData);

    },
    deleteTask: function(taskId) {
        Tasks.remove(taskId);
    },
    completeTask: function(taskId) {

        // Complete
        Tasks.update(taskId, { $set: { status: 'completed' } });

        // Get task
        var task = Tasks.findOne(taskId);
        var user = Meteor.users.findOne(task.assignedId);

        if (user.userName) {
            var assignedName = user.userName;
        }
        else {
            var assignedName = user.emails[0].address;
        }

        // Send email to admin
        SSR.compileTemplate('completedTaskEmail', Assets.getText('completed_task_email.html'));
        templateData = {
            taskName: task.name,
            assignedName: assignedName
        }
        text = SSR.render("completedTaskEmail", templateData);

        var emailData = {
            to: Meteor.settings.adminUser.email,
            subject: 'Completed task: ' + task.name,
            text: text
        }
        Meteor.call('sendEmail', emailData);

    }

});
