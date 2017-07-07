Template.projectDetails.helpers({

    tasks: function() {
        return Tasks.find({ projectId: this._id }, { sort: { status: -1, creationDate: 1 } });
    },
    notes: function() {
        return Notes.find({ projectId: this._id });
    }

});

Template.projectDetails.onRendered(function() {

    if (this.data) {

        Session.set('contentId', null);
        Session.set('projectId', this.data._id);
        Session.set('domainId', this.data.domain);

    }

});
