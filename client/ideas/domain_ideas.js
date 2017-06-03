Template.domainIdeas.helpers({

    ideas: function() {
        return Content.find({ status: 'idea', domain: this._id });
    },
    areIdeas: function(){
        var ideas = Content.find({ status: 'idea', domain: this._id }).count();

        if (ideas > 0 ) {
            return true;
        }
    }

});
