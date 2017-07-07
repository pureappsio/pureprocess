Template.references.onRendered(function() {

    // Init
    CKEDITOR.replace('reference-content', {
        height: '200px',
        extraPlugins: 'autolink'
    });

});

Template.references.helpers({

    references: function() {
        return References.find({});
    }

});

Template.references.events({

    'click #add-reference': function() {

        var reference = {
            title: $('#reference-name').val(),
            content: CKEDITOR.instances['reference-content'].getData()
        }

        Meteor.call('addReference', reference);

    }

});
