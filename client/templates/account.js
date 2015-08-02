Template.account.helpers({
	accountUser: function() {
		console.log(this._id)
		return Meteor.users.find({'profile.companyId': this._id});
	},
	verified: function() {
		console.log(this.emails[0].verified);
		if(this.emails[0].verified === true) {
			return 'true';
		}
		else {
			return 'false';
		}
	}

});