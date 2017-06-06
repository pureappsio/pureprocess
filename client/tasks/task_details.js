Template.taskDetails.onRendered(function() {

    if (this.data) {

        taskId = this.data._id;
        deadline = this.data.deadline;

        // Countdown
        $('.datetimepicker').datetimepicker({
            defaultDate: deadline
        }).on('dp.change', function(e) {
            var date = e.date;
            date = (e.date).toDate();
            Meteor.call('changeTaskDate', date, taskId);
        });

        if (this.data.assignedId) {
            $('#assigned-id').val(this.data.assignedId);
        }

    }

    // Init
    CKEDITOR.replace('note-content', {
        height: '100px',
        extraPlugins: 'autolink'
    });

    Session.set('noteAttachment', null);

});

Template.taskDetails.helpers({

    users: function() {
        return Meteor.users.find({});
    },

    notes: function() {
        return Notes.find({ taskId: this._id });
    },

    processName: function() {
        if (this.processId) {
            return Procedures.findOne(this.processId).name;
        }
    },
    contentName: function() {

        if (this.contentId) {
            return '(' + Content.findOne(this.contentId).title + ')';
        }

    },
    fileLink: function() {
        return Files.findOne(this.attachementId).link();
    },
    steps: function() {
        return Steps.find({ processId: this.processId });
    },
    deadlineDate: function() {
        return moment(this.deadline).format('MMMM Do YYYY');
    },
    assignedTo: function() {

        var user = Meteor.users.findOne(this.assignedId);

        if (user) {
            if (user.userName) {
                return user.userName;

            } else {
                return user.emails[0].address;
            }
        }

    },
    completedColor: function() {

        if (this.status == 'completed') {
            return 'completed-task';
        } else {

            // Check if late 
            var now = new Date();
            var diff = now.getTime() - (this.deadline).getTime();
            if (diff > 0) {

                return 'late-task';

            }
        }

    },
    isActive: function() {
        if (this.status == 'completed') {
            return false;
        } else {
            return true;
        }
    }

});

Template.taskDetails.events({

    'click #add-note': function() {

        var note = {
            taskId: this._id,
            date: new Date(),
            writerId: Meteor.user()._id
        }

        // Content
        if (CKEDITOR.instances['note-content'].getData() != '') {
            note.content = CKEDITOR.instances['note-content'].getData();
        }

        // Attachment
        if (Session.get('noteAttachment')) {
            note.attachmentId = Session.get('noteAttachment');
        }

        Meteor.call('addNote', note, function() {

            Session.set('noteAttachment', null);

        });

    },

    'change #assigned-id': function() {

        Meteor.call('changeTaskOwner', this._id, $('#assigned-id :selected').val());

    },
    'click .task-delete': function() {
        Meteor.call('deleteTask', this._id);
    },
    'click .task-check': function() {
        Meteor.call('completeTask', this._id);
    }


});
