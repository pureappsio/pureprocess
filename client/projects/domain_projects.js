Template.domainProjects.helpers({

    projects: function() {
        return Projects.find({ domain: this._id }, { sort: { date: 1 } });
    },
    areProjects: function() {
        
        var projects = Projects.find({ domain: this._id }).count();

        if (projects > 0) {
            return true;
        }
    }

});
