Meteor.methods({

    getIntegrations: function() {

        return Integrations.find({}).fetch();

    },
    addIntegration: function(data) {

        // Insert
        console.log(data);
        Integrations.insert(data);

    },
    removeIntegration: function(data) {

        // Insert
        Integrations.remove(data);

    },
    getLessons: function() {

        // Get integration
        if (Integrations.findOne({ type: 'purecourses' })) {

            var integration = Integrations.findOne({ type: 'purecourses' });

            // Get lists
            var url = "https://" + integration.url + "/api/lessons?key=" + integration.key;
            console.log(url);
            var answer = HTTP.get(url);
            return answer.data.lessons;

        } else {
            return [];
        }

    },
    getLesson: function(lessonId) {

        // Get integration
        if (Integrations.findOne({ type: 'purecourses' })) {

            var integration = Integrations.findOne({ type: 'purecourses' });

            // Get lists
            var url = "https://" + integration.url + "/api/lessons/" + lessonId + "?key=" + integration.key;
            var answer = HTTP.get(url);
            return answer.data;

        } else {
            return {};
        }

    }

});
