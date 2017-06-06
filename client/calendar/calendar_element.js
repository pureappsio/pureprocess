Template.calendarElement.helpers({

    number: function() {

        var number = (this.date).getDate();

        if (number == 1) {
            var month = moment(this.date).format("MMM");
            number = month + ' ' + number;
        }

        return number;

    },
    showTasks: function() {

        if (Session.get('calendarView')) {
            var view = Session.get('calendarView');
        } else {
            var view = 'all';
        }

        if (view != 'content') {
            return true;
        }

    },
    content: function() {

        var calendarDate = this.date;

        var content = Content.find({
            $where: function() {
                return (this.status == 'scheduled') && ((this.date).getDate() == calendarDate.getDate())
            }
        });

        return content;

    },
    generalTasks: function() {

        var calendarDate = this.date;

        if (Session.get('calendarView')) {
            var view = Session.get('calendarView');
        } else {
            var view = 'all';
        }

        if (view == 'all') {

            var tasks = Tasks.find({
                $where: function() {
                    if (this.deadline) {
                        return ((this.status == 'new') && (this.deadline).getDate() == calendarDate.getDate())
                    }
                }
            });

        } else {

            var tasks = Tasks.find({
                $where: function() {
                    if (this.deadline) {
                        return ((this.assignedId == Meteor.user()._id) && (this.status == 'new') && (this.deadline).getDate() == calendarDate.getDate())
                    }
                }
            });

        }

        return tasks;
    }

});
