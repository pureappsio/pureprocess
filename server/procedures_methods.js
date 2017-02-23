Meteor.methods({

    createProcess: function(process) {

        console.log(process);
        Procedures.insert(process);

    },
    changeCategory: function(categoryId, processId) {

        Procedures.update(processId, { $set: { categoryId: categoryId } });

    }

});
