Template.domainContent.helpers({

    content: function() {
        return Content.find({ domain: this._id , status: 'scheduled'}, { sort: { date: 1 } });
    },
    areContent: function() {
        
        var content = Content.find({ domain: this._id, status: 'scheduled' }).count();

        if (content > 0) {
            return true;
        }
    }

});
