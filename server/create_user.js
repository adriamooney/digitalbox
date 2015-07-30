Accounts.onCreateUser(function(options, user) {

    if(!options.profile) {
      options.profile = {};
    }

    options.profile.isActive = true;

    Companies.insert({companyId: user._id, name: options.profile.company}, function(err, doc) {
        console.log(doc);
        //options.profile.companyId = doc;
        Meteor.users.update({_id: user._id}, {$set: {'profile.companyId': doc}});
    });

    

    if (options.profile) {
        user.profile = options.profile;
    }



  return user;
});

// (server-side) called whenever a login is attempted
/*Accounts.validateLoginAttempt(function(attempt){
  if (attempt.user && attempt.user.emails && !attempt.user.emails[0].verified ) {
    return false; // the login is aborted
  }
  return true;
}); 


Accounts.config({sendVerificationEmail: true});
 */

