Meteor.methods({
    lastLogin: function(id) {
        var now = new Date().getTime();
        Meteor.users.update({ _id: id }, {
            $set: { 'profile.lastActiveOn': new Date(now - 7 * 3600 * 1000) }
          }); 
    }
 });