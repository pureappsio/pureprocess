Template.userDetails.helpers({

    email: function() {

        return this.emails[0].address;

    },
    userName: function() {
        if (this.userName) {
            return this.userName;

        }
    },
    userPic: function() {

        if (this.pictureId) {
            return Files.findOne(this.pictureId).link();
        }
    }

});
