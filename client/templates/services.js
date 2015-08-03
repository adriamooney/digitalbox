Template.addService.events({
	'submit form': function(event, template) {
		event.preventDefault();
		var companyId = template.find('#companyId').value;
		var data = {
			serviceName: template.find('#serviceName').value,
			logo: template.find('#logo').value,
			startDate: new Date(),
			fee: Number(template.find('#fee').value),
			companyId: template.find('#companyId').value,
			ID: template.find('#ID').value,
			website: template.find('#website').value,
			username: template.find('#username').value
		}
		Meteor.call('addService', data, function(err, result) {
			//console.log(result);
			if(!err) {
				//add all existing projects to the service
				var project = Projects.find({companyId: companyId});
				if(project) {
					project.forEach(function(p) {
						//for each project, add it to this service
						Meteor.call('addProjectToService', result, p.projectName, p._id, p.isActive);
					});  
				}
			}
		});
	}
});


Template.servicesTable.events({
	'focusout .allocate-input, keydown .allocate-input': function(event, template) {  

		if((event.type == 'keydown' && event.which == 13) || event.type == 'focusout') {

			console.log(event.which);

			var el = event.currentTarget;
			var str = $(el).attr('id');
			var idParts = str.split('-');
			var projectId = idParts[1];
			var serviceId = idParts[2];


			var thisService = Services.findOne({_id: serviceId});

			_.each(thisService.projects, function (project, idx) { 
				//console.log(idx);

				var val = Number(event.currentTarget.value);
				

				var obj = {};
				obj['projects.'+idx+'.projectAllocation'] = val;

		

					if(project.projectId == idParts[1]) {

						Meteor.call('updateServiceProject', serviceId, obj);			

					}


			});
			
			$('.allocate-input').hide();
			$('.allocation').show();

		}

	}, 
	'click .project-allocation': function(event, template) {

		//console.log(this);

		var el = event.currentTarget;
		var str = $(el).attr('id');

		$('.allocate-input').hide();
		$('.allocation').show();

		$(el).find('.allocate-input').show();
		$(el).find('.allocation').hide();
		
	},
	'click .remove-service': function() {
		Meteor.call('removeService', this._id);
	}

});

Template.servicesTable.helpers({
	services: function() {
		var companyId = Meteor.user().profile.companyId;
		//todo: make it so super user can see
		////see this:  http://stackoverflow.com/questions/18035160/accessing-meteor-application-as-another-user  
		var services = Services.find({companyId: companyId});

		return services;
	},
	allServices: function() {
		Services.find({});
	},
	projects: function() {
		var companyId = Meteor.user().profile.companyId;
		var services = Services.find({companyId: companyId});
		var projectsArr = [];
		services.forEach(function(service) {

			if(service.projects) {
				service.projects.forEach(function(project) {
					
					projectsArr.push(project.projectId);  //TODO, can we do this without pushing inside the double loop.  should only need to push once
					
					
				});
			}

		});
		var uniqueArr = _.uniq(projectsArr);
		var projects = Projects.find({_id: {$in: uniqueArr}, isActive:true});
		return projects;

	},
	project: function() {
		var projects = [];
		if(this.projects) {
			this.projects.forEach(function(project) {

				if(project.isActive == true) {
					projects.push(project);
				}
				
			});

			return projects;
		}
	}, 
	serviceAllocation: function() {
		var allocationSum = 0;
		if(this.projects) {
			this.projects.forEach(function(project) {
				if (project.isActive == true) {
					allocationSum += project.projectAllocation;
				}
				
			});
			return allocationSum+'%';
		}
		
	},
	totalServices: function() {
		var companyId = Meteor.user().profile.companyId;
		var services = Services.find({companyId: companyId});
		var servicesSum = 0;
		services.forEach(function(service) {
			servicesSum += service.fee;
		});
		return servicesSum;
	},
	totalProject: function() {

		var services = Services.find({companyId: this.companyId});
		var self = this;
		var projectSum = 0;
		services.forEach(function(service) {
			if(service.projects) {

				var projectVal = _.where(service.projects, {projectId: self._id});
	
				var percentage = projectVal[0].projectAllocation / 100;   //percentage

				var amt = service.fee * percentage;
				
				projectSum += amt;
				
			}
			
		});
		return projectSum;
	}
});

Template.servicesTableDetails.helpers({
	services: function() {
		var companyId = Meteor.user().profile.companyId;  //or make this by company
		//todo: make it so super user can see
		var services = Services.find({companyId: companyId});

		return services;
	},
	startDate: function() {
		var startDate = moment(this.startDate).format('YYYY-MM-DD');
		return startDate;
	}
});

Template.services.helpers({
	companyName: function() {
		var companyName = Meteor.user().profile.company;
		return companyName;
	},
	companyId:  function() {
		var companyId = Meteor.user().profile.companyId;
		return companyId;
	}
});

Template.services.events({
	'click #add-service': function() {
		Modal.show('requestService');
	}
});