Meteor.methods({
    lastLogin: function(id) {
        var now = new Date().getTime();
        Meteor.users.update({ _id: id }, {
            $set: { 'profile.lastActiveOn': new Date(now - 7 * 3600 * 1000) }
          }); 
    },
    sendInitialEmail: function(result) {
        return Accounts.sendEnrollmentEmail(result);
    },
   /* createNewUser: function(email, password, username, firstName, lastName, role, companyId) {
        //check(doc, Schema.User);
       Accounts.createUser({email: email, password : password, profile: {firstName: firstName, lastName: lastName, role: role, companyId: companyId, isActive:true}});
    },  */
    addNewUser: function(email, profile) {
        var userId = Accounts.createUser({email: email, password: 'asdfasdf1', profile: profile});
        Accounts.sendEnrollmentEmail(userId);
    },
    updateUser: function(id, property, val) {
        var obj = {};
        obj['profile.'+property] = val;

        console.log(obj);
        Meteor.users.update({_id: id}, {$set: obj});
    },
    sendEmail: function (to, from, subject, html, text) {
    check([to, from, subject, html], [String]);

    // Let other method calls from the same client start running,
    // without waiting for the email sending to complete.
    this.unblock();
    return Meteor.Mandrill.send({
        to: to,
        from: from,
        subject: subject,
        html: html,
        text: text
    });
  }
 });