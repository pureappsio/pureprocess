Meteor.methods({

    removeNote: function(noteId){

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
    createContent: function(content) {

        // Create content
        console.log(content);
        var contentId = Content.insert(content);

        // Check if there are default task for this
        if (DefaultTasks.findOne({ domainId: content.domain, type: content.type })) {

            // Get all default tasks
            var tasks = DefaultTasks.find({ domainId: content.domain, type: content.type }).fetch();

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

                Meteor.call('createTask', task);

            }

        }

    },
    deleteContent: function(contentId) {

        Content.remove(contentId);

    }

});
