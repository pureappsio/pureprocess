Template.processDetails.onRendered(function() {

    $('#step-content').summernote({
        minHeight: 100 // set editor height
    });

    if (this.data) {
        $('#category').val(this.data.categoryId);

    }

    Meteor.call('getLessons', function(err, lessons) {

        $('#step-video').append($('<option>', {
            value: 'no',
            text: 'No video'
        }));

        for (i in lessons) {
            $('#step-video').append($('<option>', {
                value: lessons[i]._id,
                text: lessons[i].name
            }));
        }

    });

});

Template.processDetails.events({

    'click #switch-mode': function() {

        if (Session.get('editMode') == false) {
            Session.set('editMode', true);
            console.log(Session.get('editMode'));
            $('#switch-mode').text('Edit Mode')
        } else {
            Session.set('editMode', false);
            $('#switch-mode').text('View Mode')
        }

    },
    'click #category, change #category': function() {

        Meteor.call('changeCategory', $('#category :selected').val(), this._id);

    },
    'click #create-step': function() {

        var step = {
            name: $('#step-name').val(),
            content: $('#step-content').summernote('code'),
            userId: Meteor.user()._id,
            processId: this._id
        }

        // Video
        if ($('#step-video :selected').val() != 'no') {
            step.lessonId = $('#step-video :selected').val();
        }

        Meteor.call('createStep', step);
    }

});

Template.processDetails.helpers({

    categories: function() {
        return Categories.find({})
    },
    categoryName: function() {
        if (Categories.findOne(this.categoryId)) {
            return Categories.findOne(this.categoryId).name;
        }
    },

    steps: function() {
        return Steps.find({ processId: this._id });
    }

});
