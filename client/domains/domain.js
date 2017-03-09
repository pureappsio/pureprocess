Template.domain.events({

    'click .domain-delete': function() {

        Meteor.call('deleteDomain', this._id);

    }

});