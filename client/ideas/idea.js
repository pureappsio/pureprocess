Template.idea.events({

    'click .idea-delete': function() {

        Meteor.call('deleteContent', this._id);

    }

});
