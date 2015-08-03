Template.registerHelper('isAdmin', function() {   
	var role = Meteor.user().profile.role;
	if(role === 'admin' || role === 'super-admin') {
		return true;
	}
	else {
		return false;
	}
});

Template.registerHelper('isSuperAdmin', function() {   
	var role = Meteor.user().profile.role;
	return role === 'super-admin';
});