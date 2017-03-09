Meteor.methods({

    setUsername: function(userName, userId) {

        console.log(userName);
        console.log(userId);
        Meteor.users.update(userId, { $set: { userName: userName } });


    },
    createDomain: function(domain) {

        console.log(domain);

        Domains.insert(domain);

    },
    deleteDomain: function(domainId) {
        Domains.remove(domainId);
    },
    addCategory: function(category) {

        console.log(category);
        Categories.insert(category);

    },
    setOperator: function(userId) {

        Meteor.users.update(userId, { $set: { role: 'operator' } });

    },
    validateApiKey: function(user, key) {

        if (user.apiKey == key) {
            return true;
        } else {
            return false;
        }

    },
    generateApiKey: function() {

        // Check if key exist
        if (!Meteor.user().apiKey) {

            // Generate key
            var key = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

            for (var i = 0; i < 16; i++) {
                key += possible.charAt(Math.floor(Math.random() * possible.length));
            }
            console.log(key);

            // Update user
            Meteor.users.update(Meteor.user()._id, { $set: { apiKey: key } });
        }

    },

    setUserRole: function(userId, userRole) {

        // Update user
        Meteor.users.update(userId, { $set: { role: userRole } });

    },
    createUsers: function() {

        // Create admin user
        var adminUser = {
            email: Meteor.settings.adminUser.email,
            password: Meteor.settings.adminUser.password,
            role: 'admin'
        }
        Meteor.call('createNewUser', adminUser);

    },
    createNewUser: function(data) {

        // Check if exist
        if (Meteor.users.findOne({ "emails.0.address": data.email })) {

            console.log('User already created');

            // Change role
            Meteor.users.update({ "emails.0.address": data.email }, { $set: { role: data.role } });

        } else {

            console.log('Creating new user');

            // Create
            var userId = Accounts.createUser(data);

            // Change role
            Meteor.users.update(userId, { $set: { role: data.role } });
            console.log(Meteor.users.findOne(userId));

        }

    }

});
