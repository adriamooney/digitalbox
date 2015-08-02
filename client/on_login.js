Tracker.autorun(function(){
    if(!Meteor.userId()){
      // login handler
      Accounts.onLogin(function(options) {

            var user = Meteor.userId();               

            Router.go('/services/');  //does this cause the problem of redirecting on refresh?
            Meteor.call('lastLogin', user, function(err) {
                if(err) {
                    console.log(err);
                }
            });

        });
    }

  });


