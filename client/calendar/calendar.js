Template.calendar.events({

    'click #create-content': function(){

    	var content = {
    		title: $('#content-name').val(),
    		date: new Date($('#content-date').val()),
    		type: $('#content-type :selected').val(),
    		domain: $('#content-domain :selected').val()
    	}

    	Meteor.call('createContent', content);

    }

});

Template.calendar.helpers({

	domains: function() {
        return Domains.find({});
    },

    calendarTitle: function() {

        return [
            { title: 'MON' },
            { title: 'TUE' },
            { title: 'WED' },
            { title: 'THU' },
            { title: 'FRI' },
            { title: 'SAT' },
        ]

    },
    calendarElements: function() {

        // Variables
        var elements = [];
        var now = new Date();

        // Generate days
        for (i = -12; i < 12; i++) {

            calendarDate = new Date(now.getTime() + i * 24 * 3600 * 1000);

            // Push
            elements.push({
                date: calendarDate
            });
        }

        console.log(elements);

        return elements;

    }

});

Template.calendar.onRendered(function() {

    // Countdown
    $('.datetimepicker').datetimepicker();

});
