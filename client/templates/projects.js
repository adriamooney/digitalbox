Template.addProject.events({
	'submit form': function(event, template) {
		event.preventDefault();
		var companyId = Meteor.user().profile.companyId;  //TODO: make this work for super users.  
		//see this:  http://stackoverflow.com/questions/18035160/accessing-meteor-application-as-another-user  
		var projectName = template.find('#projectName').value;

		var data = {
			projectName: projectName,
			projectNumber: template.find('#projectNumber').value,
			client: template.find('#client').value,
			companyId: companyId
		}

		Meteor.call('addProject', data, function(err, result) {
			if(err) {
				AppMessages.throw(error.reason, 'danger');
			}
			else {
				Meteor.call('addProjectToServices', companyId, projectName, result);	
			}
		});

	}
});