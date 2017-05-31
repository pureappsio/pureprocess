Meteor.methods({

    createContent: function(content) {
        console.log(content);
        Content.insert(content);
    },
    deleteContent: function(contentId){
    
        Content.remove(contentId);

    }

});
