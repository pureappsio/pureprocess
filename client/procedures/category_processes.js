Template.categoryProcesses.helpers({

    processes: function() {
        return Procedures.find({categoryId: this._id});
    }

});
