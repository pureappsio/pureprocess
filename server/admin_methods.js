// var colorList = [

//     '#ff9933',
//     '#0066ff',
//     '#009900',
//     '#6600cc',
//     '#cc0099',
//     '#ff0000',
//     '#663300',
//     '#ff9933',
//     '#0066ff',
//     '#009900',
//     '#6600cc',
//     '#cc0099',
//     '#ff0000',
//     '#663300'

// ];

var colorList = ["AliceBlue","AntiqueWhite","Aqua","Aquamarine","Azure","Beige","Bisque","Black","BlanchedAlmond","Blue","BlueViolet","Brown","BurlyWood","CadetBlue","Chartreuse","Chocolate","Coral","CornflowerBlue","Cornsilk","Crimson","Cyan","DarkBlue","DarkCyan","DarkGoldenRod","DarkGray","DarkGrey","DarkGreen","DarkKhaki","DarkMagenta","DarkOliveGreen","Darkorange","DarkOrchid","DarkRed","DarkSalmon","DarkSeaGreen","DarkSlateBlue","DarkSlateGray","DarkSlateGrey","DarkTurquoise","DarkViolet","DeepPink","DeepSkyBlue","DimGray","DimGrey","DodgerBlue","FireBrick","FloralWhite","ForestGreen","Fuchsia","Gainsboro","GhostWhite","Gold","GoldenRod","Gray","Grey","Green","GreenYellow","HoneyDew","HotPink","IndianRed","Indigo","Ivory","Khaki","Lavender","LavenderBlush","LawnGreen","LemonChiffon","LightBlue","LightCoral","LightCyan","LightGoldenRodYellow","LightGray","LightGrey","LightGreen","LightPink","LightSalmon","LightSeaGreen","LightSkyBlue","LightSlateGray","LightSlateGrey","LightSteelBlue","LightYellow","Lime","LimeGreen","Linen","Magenta","Maroon","MediumAquaMarine","MediumBlue","MediumOrchid","MediumPurple","MediumSeaGreen","MediumSlateBlue","MediumSpringGreen","MediumTurquoise","MediumVioletRed","MidnightBlue","MintCream","MistyRose","Moccasin","NavajoWhite","Navy","OldLace","Olive","OliveDrab","Orange","OrangeRed","Orchid","PaleGoldenRod","PaleGreen","PaleTurquoise","PaleVioletRed","PapayaWhip","PeachPuff","Peru","Pink","Plum","PowderBlue","Purple","Red","RosyBrown","RoyalBlue","SaddleBrown","Salmon","SandyBrown","SeaGreen","SeaShell","Sienna","Silver","SkyBlue","SlateBlue","SlateGray","SlateGrey","Snow","SpringGreen","SteelBlue","Tan","Teal","Thistle","Tomato","Turquoise","Violet","Wheat","White","WhiteSmoke","Yellow","YellowGreen"];

Meteor.methods({

    setColors: function() {

        var domains = Domains.find({}).fetch();

        for (i in domains) {

            var color = colorList[i];
            Domains.update(domains[i]._id, { $set: { color: color } });

        }

    },
    getRandomColor: function() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    },
    setUsername: function(userName, userId) {

        console.log(userName);
        console.log(userId);
        Meteor.users.update(userId, { $set: { userName: userName } });

    },
    setUserPicture: function(pictureId, userId) {

        console.log(pictureId);

        Meteor.users.update(userId, { $set: { pictureId: pictureId } });

    },
    createDomain: function(domain) {

        // Get color
        var length = Domains.find({}).count();
        domain.color = colorList[length];
        
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
