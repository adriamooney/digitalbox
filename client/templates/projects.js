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
				//add this project to all existing services
				Meteor.call('addProjectToServices', companyId, projectName, result);	
				Modal.hide();
			}
		});

	}
}); 

Template.projects.events({
	'click #add-project': function(event, template) {
		Modal.show('addProject');
	}

});


Template.projectsTable.helpers({
	projects: function() {
		var companyId = Meteor.user().profile.companyId;
		var projects = Projects.find({companyId: companyId});
		return projects;
	},
	activeCheckBox: function() {
		if(this.isActive) {
			return true;
		}
		else {
			return false;
		}
	},
	nameSelected: function() {
		var session = Session.get('editName');
		return this._id === session;
	},
	numberSelected: function() {
		var session = Session.get('editNumber');
		return this._id === session;
	},
	clientSelected: function() {
		var session = Session.get('editClient');
		return this._id === session;
	}

});

Template.projectsTable.events({
	'change .active-box': function(event, template) {
		//console.log(this._id);
		//console.log(event.target.checked);
		//projectName = this.projectName;
		var companyId = Meteor.user().profile.companyId;
		var self = this;


		var thisService = Services.find({companyId: companyId});

		thisService.forEach(function(service) {
			_.each(service.projects, function (project, idx) { 

				var obj = {};
				obj['projects.'+idx+'.isActive'] = event.target.checked;
	

				if(project.projectId == self._id) {
					//need to find index of object
					var p = 'projects[idx].isActive';
					//update active status of the project object within the service as well
					Meteor.call('updateServiceProject', service._id, obj);
				}

			});
		});

		Meteor.call('projectActiveStatus', this._id, event.target.checked);
	},
	'focusout .edit-view, keydown .edit-view': function(event, template) {
		if((event.type == 'keydown' && event.which == 13) || event.type == 'focusout') {

			//TODO:  change the info for the service as well, as in example above
			var val = $(event.currentTarget).find('input').val();

			var property = $(event.currentTarget).find('input').attr('class');

			Meteor.call('updateProject', this._id, property, val);

			Session.set('editNumber', '');
			Session.set('editClient', '');
			Session.set('editName', '');
		}
	},
	'click .edit-name': function() {
		Session.set('editName', this._id);
		Session.set('editClient', '');
		Session.set('editNumber', '');
	},
	'click .edit-number': function() {
		Session.set('editNumber', this._id);
		Session.set('editClient', '');
		Session.set('editName', '');
	},
	'click .edit-client': function() {
		Session.set('editClient', this._id);
		Session.set('editNumber', '');
		Session.set('editName', '');
	}

});
