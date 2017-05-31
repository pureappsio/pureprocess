// Tracker
Tracker.autorun(function() {
    Meteor.subscribe('userProcedures');
    Meteor.subscribe('userSteps');
    Meteor.subscribe('userTasks');
    Meteor.subscribe('userCategories');
    Meteor.subscribe('userContent');
    Meteor.subscribe('userDomains');

    Meteor.subscribe('userData');
    Meteor.subscribe('allUsers');

    Meteor.subscribe('userIntegrations');

    Meteor.subscribe('allFiles');
});
