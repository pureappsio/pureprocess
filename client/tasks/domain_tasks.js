Template.domainTasks.helpers({
    tasks: function() {
        return Tasks.find({ status: 'new', domainId: this._id }, { sort: { date: 1 } });
    },
    completedTasks: function() {
        return Tasks.find({ status: 'completed', domainId: this._id }, { sort: { date: 1 } });
    }
});
