// Tracker
Tracker.autorun(function() {
    Meteor.subscribe('userProcedures');
    Meteor.subscribe('userSteps');
    Meteor.subscribe('userTasks');
    Meteor.subscribe('userDefaultTasks');
    Meteor.subscribe('userCategories');
    Meteor.subscribe('userContent');
    Meteor.subscribe('userDomains');
    Meteor.subscribe('userPreferences');
    Meteor.subscribe('userNotes');
    Meteor.subscribe('userProjects');
    Meteor.subscribe('userData');
    Meteor.subscribe('allUsers');

    Meteor.subscribe('userSchedules');

    Meteor.subscribe('userReferences');

    Meteor.subscribe('userIntegrations');

    Meteor.subscribe('allFiles');
});
