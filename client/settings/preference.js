Template.preference.helpers({

    processName: function() {

        return Procedures.findOne(this.processId).name;

    },
    day: function() {

        if (this.date == 1) {
            return 'Monday';
        }
        if (this.date == 2) {
            return 'Tuesday';
        }
        if (this.date == 3) {
            return 'Wednesday';
        }
        if (this.date == 4) {
            return 'Thursday';
        }
        if (this.date == 5) {
            return 'Friday';
        }
        if (this.date == 6) {
            return 'Saturday';
        }

    }

});
