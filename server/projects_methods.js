Meteor.methods({

    removeProject: function(projectId) {

        Projects.remove(projectId);

    },
    addProject: function(project) {

        console.log(project);
        Projects.insert(project);

    }   

});
