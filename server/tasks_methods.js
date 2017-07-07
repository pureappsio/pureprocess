Meteor.methods({

    changeTaskOwner: function(taskId, assignedId) {

        // Change
        Tasks.update(taskId, { $set: { assignedId: assignedId } });

        // Send email
        Meteor.call('sendTaskEmail', taskId);

    },
    changeTaskDate: function(date, taskId) {

        Tasks.update(taskId, { $set: { deadline: date } });

    },
    sendTaskEmail: function(taskId) {

        // Get task
        var task = Tasks.findOne(taskId);

        if (task.deadline) {

            // Build email data
            var emailData = Meteor.call('generateEmailData', task)

            // Send
            Meteor.call('sendEmail', emailData);

        }

    },
    generateEmailData: function(task) {

        // Get user
        var user = Meteor.users.findOne(task.assignedId);

        // Notify user
        SSR.compileTemplate('newTaskEmail', Assets.getText('task_email.html'));
        templateData = {
            taskLink: Meteor.absoluteUrl() + 'tasks/' + task._id,
            taskName: task.name
        }
        text = SSR.render("newTaskEmail", templateData);

        var emailData = {
            to: user.emails[0].address,
            subject: 'A new task was assigned to you',
            text: text
        }

        return emailData;

    },
    createTask: function(task) {

        // Create task
        console.log(task);
        var taskId = Tasks.insert(task);

        // Send email if assigned
        if (task.assignedId) {

            Meteor.call('sendTaskEmail', taskId);

        }

    },
    createDefault: function(defaultTask) {

        // Get order
        var query = { type: defaultTask.type, domainId: defaultTask.domainId };
        if (defaultTask.categoryId) {
            query.categoryId = defaultTask.categoryId;
        }
        var order = DefaultTasks.find(query).count() + 1;
        defaultTask.order = order;

        console.log(defaultTask);

        DefaultTasks.insert(defaultTask);

    },
    deleteDefaultTask: function(taskId) {
        DefaultTasks.remove(taskId);
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
        } else {
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

        // Check if repeat
        if (task.repeat) {

            // Create task
            var newTask = JSON.parse(JSON.stringify(task));
            delete newTask._id;
            newTask.creationDate = new Date();
            newTask.status = 'new';

            console.log(newTask);

            // Set deadline
            previousDeadline = new Date(task.deadline);

            if (task.repeat == 'day') {
                newTask.deadline = new Date(previousDeadline.getTime() + 1 * 24 * 3600 * 1000);
            }
            if (task.repeat == '7days') {
                newTask.deadline = new Date(previousDeadline.getTime() + 7 * 24 * 3600 * 1000);
            }

            console.log(newTask);

            // Insert new task
            Tasks.insert(newTask);

        }

    }

});
