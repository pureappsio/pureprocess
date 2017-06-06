Template.calendar.events({

    'click #create-content': function() {

        var content = {
            title: $('#content-name').val(),
            date: new Date($('#content-date').val()),
            type: $('#content-type :selected').val(),
            domain: $('#content-domain :selected').val(),
            status: 'scheduled'
        }

        // Category ?
        var category = $('#content-category :selected').val();

        if (category != 'none') {
            content.categoryId = category;
        }

        Meteor.call('createContent', content);

    },
    'change #calendar-view': function() {

        Session.set('calendarView', $('#calendar-view :selected').val());

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
    categories: function() {

        return Categories.find({ type: 'content' });

    },
    calendarElements: function() {

        // Variables
        var elements = [];
        var now = new Date();

        // Get offset
        var offset = now.getDay() - 1;

        // Generate days
        for (i = -7; i < 21; i++) {

            calendarDate = new Date(now.getTime() + (i - offset) * 24 * 3600 * 1000);

            // Push while skipping Sundays
            if (calendarDate.getDay() != 0) {
                elements.push({
                    date: calendarDate
                });
            }

        }

        // Group by 6
        // var elementsGroups = [];
        // for (j = 0; j < elements.length / 6; j++) {
        //     elementsGroups.push(elements.slice(j * 6, 6 * (j + 1)));
        // }

        // console.log(elementsGroups);

        return elements;

    }

});

Template.calendar.onRendered(function() {

    // if (!Session.get('calendarView')) {
    //     Session.set('calendarView', 'all');
    // }

    // Countdown
    $('.datetimepicker').datetimepicker();

});
