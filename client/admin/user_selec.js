Template.userSelect.helpers({

    email: function() {

        if (this.userName) {
            return this.userName;

        } else {
            return this.emails[0].address;
        }
    }

});
