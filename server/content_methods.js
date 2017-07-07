Meteor.methods({

    verifySchedule: function() {

        // Get dates
        var today = new Date();
        var futureDate = new Date(today.getTime() + 30 * 24 * 3600 * 1000);

        // Get all domains
        var domains = Domains.find({}).fetch();

        for (i in domains) {

            var message = "";

            if (Schedules.findOne({ domainId: domains[i]._id })) {

                // Get schedule
                var schedules = Schedules.find({ domainId: domains[i]._id }).fetch();

                for (s in schedules) {

                    // Calculate number
                    var schedule = schedules[s];

                    if (schedules[s].period == 'day') {
                        var expectedNumber = schedules[s].number * 30;
                    }
                    if (schedules[s].period == 'week') {
                        var expectedNumber = schedules[s].number * 4;
                    }
                    if (schedules[s].period == '2weeks') {
                        var expectedNumber = schedules[s].number * 2;
                    }
                    if (schedules[s].period == 'month') {
                        var expectedNumber = schedules[s].number;
                    }

                    console.log(expectedNumber);

                    // Get all content for this type
                    var contentNumber = Content.find({
                        domain: domains[i]._id,
                        status: 'scheduled',
                        type: schedules[s].type,
                        date: { $gte: today, $lte: futureDate }
                    }).count();

                    console.log(contentNumber);

                    var diff = expectedNumber - contentNumber;

                    if (diff > 0) {

                        message[schedules[s].type] = diff;

                        if (schedules[s].type == 'article') {
                            message += diff + ' articles ';
                        }
                        if (schedules[s].type == 'video') {
                            message += diff + ' videos ';
                        }
                        if (schedules[s].type == 'podcast') {
                            message += diff + ' podcasts ';
                        }
                    }

                }

                if (message == "") {
                    message = 'On schedule';
                } else {
                    message += ' missing';
                }

            } else {
                message = 'No schedule defined';
            }

            Domains.update(domains[i]._id, { $set: { message: message } });

        }

    },
    addSchedule: function(schedule) {

        console.log(schedule);

        Schedules.insert(schedule);

    },
    addReference: function(reference) {

        console.log(reference);

        References.insert(reference);

    },
    changeContentCategory: function(contentId, categoryId) {

        if (categoryId == 'none') {

            Content.update(contentId, { $unset: { categoryId: "" } });

        } else {
            Content.update(contentId, { $set: { categoryId: categoryId } });
        }

        console.log(Content.findOne(contentId));

    },
    changeContentDate: function(date, contentId) {

        // Calculate difference
        var content = Content.findOne(contentId);
        var contentDate = new Date(content.date);
        var newDate = new Date(date);

        var difference = newDate.getTime() - contentDate.getTime();

        // Update date
        Content.update(contentId, { $set: { date: newDate } });

        // Update all dependent tasks
        var tasks = Tasks.find({ contentId: contentId }).fetch();

        for (i in tasks) {

            var newTaskDate = new Date((tasks[i].deadline).getTime() + difference);

            // Not on Sundays
            if (newTaskDate.getDay() == 0) {
                newTaskDate = new Date(newTaskDate.getTime() - 24 * 3600 * 1000);
            }

            Tasks.update(tasks[i]._id, { $set: { deadline: newTaskDate } });

        }

        console.log(Content.findOne(contentId));

    },
    removeNote: function(noteId) {

        Notes.remove(noteId);

    },
    addNote: function(note) {

        console.log(note);
        Notes.insert(note);

    },
    setPreference: function(preference) {

        console.log(preference);

        Preferences.insert(preference);

    },
    createIdea: function(idea) {

        console.log(idea);
        Content.insert(idea);

    },
    scheduleIdea: function(contentId, date) {

        console.log(contentId);
        console.log(date);

        // Update to scheduled & set date
        Content.update(contentId, { $set: { status: 'scheduled', date: new Date(date) } });

        // Create tasks
        Meteor.call('createContentTasks', contentId);

    },
    createContentTasks: function(contentId) {

        // Get content
        var content = Content.findOne(contentId);

        console.log(content);

        // Check if there are default task for this
        var query = { domainId: content.domain, type: content.type };
        if (content.categoryId) {
            query.categoryId = content.categoryId;
        }

        console.log(query);

        if (DefaultTasks.findOne(query)) {

            // Get all default tasks
            var tasks = DefaultTasks.find(query).fetch();
            var emailData = [];

            for (i in tasks) {

                // Default task
                var defaultTask = tasks[i];

                // Get process
                var process = Procedures.findOne(defaultTask.processId);

                // Task
                var task = {
                    name: process.name,
                    creationDate: new Date(),
                    userId: Meteor.user()._id,
                    status: 'new',
                    order: defaultTask.order
                }

                // Deadline
                if (defaultTask.date == 'sameday') {
                    deadline = content.date;
                }
                if (defaultTask.date == 'oneday') {
                    deadline = new Date((content.date).getTime() - 24 * 3600 * 1000);
                }
                if (defaultTask.date == 'threedays') {
                    deadline = new Date((content.date).getTime() - 3 * 24 * 3600 * 1000);
                }
                if (defaultTask.date == 'oneweek') {
                    deadline = new Date((content.date).getTime() - 7 * 24 * 3600 * 1000);
                }
                if (defaultTask.date == 'dayafter') {
                    deadline = new Date((content.date).getTime() + 24 * 3600 * 1000);
                }

                // Not on Sundays
                if (deadline.getDay() == 0) {
                    deadline = new Date(deadline.getTime() - 24 * 3600 * 1000);
                }

                // Check if preferences
                if (Preferences.findOne({ processId: defaultTask.processId, userId: Meteor.user()._id })) {

                    // Get preference
                    var preference = Preferences.findOne({
                        processId: defaultTask.processId,
                        userId: Meteor.user()._id
                    });

                    // Get day
                    var preferenceDay = preference.date;
                    var deadlineDay = deadline.getDay();
                    var offset = preferenceDay - deadlineDay;

                    deadline = new Date(deadline.getTime() + offset * 24 * 3600 * 1000);

                }

                task.deadline = deadline;

                // Assigned
                if (defaultTask.assignedId) {
                    task.assignedId = defaultTask.assignedId;
                }

                // Domain
                task.domainId = defaultTask.domainId;

                // Process
                task.processId = defaultTask.processId;

                // Content ID
                task.contentId = contentId;

                // Insert
                var taskId = Tasks.insert(task);

                // Email data
                if (task.assignedId) {
                    emailData.push({
                        taskLink: Meteor.absoluteUrl() + 'tasks/' + taskId,
                        taskName: task.name,
                        user: task.assignedId
                    });
                }
            }

            // Form email data
            var emailDataUser = {};
            for (i in emailData) {
                emailDataUser[emailData[i].user] = [];
            }

            for (i in emailData) {
                emailDataUser[emailData[i].user].push(emailData[i]);
            }

            // Send emails
            for (i in emailDataUser) {

                var user = Meteor.users.findOne(i);

                var data = emailDataUser[i];

                SSR.compileTemplate('newTaskEmail', Assets.getText('content_tasks_email.html'));
                templateData = {
                    tasks: data,
                    contentName: content.title,
                    contentLink: Meteor.absoluteUrl() + 'content/' + contentId,
                }
                text = SSR.render("newTaskEmail", templateData);

                var emailData = {
                    to: user.emails[0].address,
                    subject: 'New task(s) were assigned to you',
                    text: text
                }

                // Send
                Meteor.call('sendEmail', emailData);

            }


        }

    },
    createContent: function(content) {

        // Create content
        console.log(content);
        var contentId = Content.insert(content);

        // Create tasks
        Meteor.call('createContentTasks', contentId);

    },
    deleteContent: function(contentId) {

        // Remove content
        Content.remove(contentId);

        // Remove all tasks
        Tasks.remove({ contentId: contentId });

    }

});
