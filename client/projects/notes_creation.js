Template.notesCreation.onRendered(function() {

    // Init
    CKEDITOR.replace('note-content', {
        height: '100px',
        extraPlugins: 'autolink'
    });

    Session.set('noteAttachment', null);

});

Template.notesCreation.events({

    'click #add-note': function() {

        var note = {
            date: new Date(),
            writerId: Meteor.user()._id
        }

        // Task ID?
        if (Session.get('taskId')) {
            note.taskId = Session.get('taskId');
        }

        // Project ID?
        if (Session.get('projectId')) {
            note.projectId = Session.get('projectId');
        }

        // Content ID?
        if (Session.get('contentId')) {
            note.contentId = Session.get('contentId');
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

    }

});
