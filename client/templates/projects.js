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
			companyId: companyId,
			isActive: true
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

Template.projects.events({
	'click #add-project': function() {
		Modal.show('addProject');
	}
});

Template.projectsTable.helpers({
	projects: function() {
		var companyId = Meteor.user().profile.companyId;
		var projects = Projects.find({companyId: companyId});
		console.log(projects.count());
		return projects;
	},
	activeCheckBox: function() {
		console.log(this);
		if(this.isActive) {
			return true;
		}
		else {
			return false;
		}
	}

})