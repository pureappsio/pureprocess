Template.domainIdeas.helpers({

    ideas: function() {
        return Content.find({ status: 'idea', domain: this._id }, { sort: { type: 1 } });
    },
    areIdeas: function() {
        var ideas = Content.find({ status: 'idea', domain: this._id }).count();

        if (ideas > 0) {
            return true;
        }
    },
    domainSelected: function() {

        var selection = Session.get('ideaDomain');

        if (selection == 'all') {
            return true;
        } else {
            if (selection == this._id) {
                return true;
            }
        }

    }

});
