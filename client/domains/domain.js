Template.domain.events({

    'click .domain-delete': function() {

        Meteor.call('deleteDomain', this._id);

    }

});

Template.domain.helpers({

    messageColor: function() {

        if (this.message) {

        	if (this.message == 'No schedule defined') {
        		return 'text-info';
        	}
        	else if (this.message == 'On schedule') {
        		return 'text-success';
        	}
        	else {
        		return 'red';
        	}

        }

    }

});
