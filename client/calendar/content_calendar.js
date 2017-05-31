Template.contentCalendar.helpers({

    icon: function() {

        if (this.type == 'video') {
            return 'video-camera';
        }
        if (this.type == 'article') {
            return 'file-text-o';
        }
        if (this.type == 'podcast') {
            return 'podcast';
        }

    },
    domainName: function() {
        return Domains.findOne(this.domain).name;
    },
    domainColor: function() {
        return Domains.findOne(this.domain).color;
    }
});

Template.contentCalendar.events({

    'click .calendar-content': function() {

        Router.go('/content/' + this._id);

    }

});
