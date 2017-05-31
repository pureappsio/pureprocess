Template.calendarElement.helpers({

    number: function() {

        var number = (this.date).getDate();

        if (number == 1) {
            var month = moment(this.date).format("MMM");
            number = month + ' ' + number;
        }

        return number;

    },
    content: function() {

        var calendarDate = this.date;

        // var start = new Date(calendarDate.getTime() - 24 * 3600 * 1000);
        // var end = new Date(calendarDate.getTime() + 24 * 3600 * 1000);

        // var content = Content.find({ date: { $gte: start, $lte: end } });

        var content = Content.find({ $where: function() {
                return (this.date).getDate() == calendarDate.getDate() } });

        return content;

    }

});
