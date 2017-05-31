Meteor.publish("userProcedures", function() {
    return Procedures.find({});
});

Meteor.publish("userSteps", function() {
    return Steps.find({});
});

Meteor.publish("userTasks", function() {
    return Tasks.find({});
});

Meteor.publish("userCategories", function() {
    return Categories.find({});
});

Meteor.publish("userContent", function() {
    return Content.find({});
});

Meteor.publish("userDomains", function() {
    return Domains.find({});
});

Meteor.publish("allUsers", function() {
    return Meteor.users.find({});
});

Meteor.publish("userIntegrations", function() {
    return Integrations.find({});
});

Meteor.publish("userData", function() {
    return Meteor.users.find({ _id: this.userId }, { services: 1 });
});

Meteor.publish('allFiles', function() {
    return Files.find().cursor;
});
