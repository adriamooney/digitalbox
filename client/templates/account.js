Template.accountsTable.helpers({
	accountUser: function() {
		console.log(this._id)
		return Meteor.users.find({'profile.companyId': this._id});
	},
	verified: function() {
		//console.log(this.emails[0].verified);
		if(this.emails) {
			if(this.emails[0].verified === true) {
				return 'true';
			}
			else {
				return 'false';
			}
		}
		
	},
	roleSelected: function() {
		var session = Session.get('editRole');
		return this._id === session;
	},
	lastLogin: function() {
		console.log(this.profile.lastActiveOn);
		if(this.profile.lastActiveOn) {
			var lastActive = moment(this.profile.lastActiveOn).format('DD/MM/YY h:mm a');
		}
		else {
			var lastActive = 'never';
		}
		

		return lastActive;
	}

});

Template.accountsTable.events({
	'change .role': function(event, template) {

			//TODO:  change the info for the service as well, as in example above
			var val = $(event.currentTarget).val();

			var property = $(event.currentTarget).attr('class');

			Meteor.call('updateUser', this._id, property, val);

			Session.set('editRole', '');

	},
	'click .edit-role': function(event, template) {
		Session.set('editRole', this._id);
	}
});



/*Template.addUser.helpers({
	companyId: function() {
		console.log(this._id);
		return this._id;
	}
});
*/

Template.addUser.events({
'submit form': function(event, template){
    event.preventDefault();
    var emailVar = template.find('#email').value;
    var firstName = template.find('#firstName').value;
    var lastName = template.find('#lastName').value;
    var role = template.find('#role').value;
    var companyId = this._id;
    var company = this.name;
    //TODO: NEEDS VALIDATION

    var profile = {
    	firstName: firstName,
    	lastName: lastName,
    	role: role,
    	companyId: companyId,
    	company: company
    }


      //createNewUser: function(email, password, firstName, lastName, role, companyId) {

        Meteor.call('addNewUser', emailVar, profile, function(error, result) {
              if (error) {
                // Inform the user that account creation failed
                AppMessages.throw(error.reason, 'danger');
              } else {
                
              	template.find('#firstName').value = '';
              	template.find('#lastName').value = '';
              	template.find('#email').value = '';


                AppMessages.throw('Account created. The new user will be emailed a link to set a password', 'success');
                //Router.go('/');
              }

        });

      //}

    }
}); 