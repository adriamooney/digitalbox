Template.addService.events({
	'submit form': function(event, template) {
		event.preventDefault();
		var data = {
			serviceName: template.find('#serviceName').value,
			logo: template.find('#logo').value,
			startDate: new Date(),
			fee: template.find('#fee').value,
			companyId: template.find('#companyId').value,
			ID: template.find('#ID').value,
			website: template.find('#website').value,
			username: template.find('#username').value
		}
		Meteor.call('addService', data);



		//TODO:  when service is added,  all existing projects need to be added to it as well
	}
});

Template.servicesTable.events({
	'blur .allocate-input': function(event, template) {  //todo:  make it so this works on enter key as well

		var el = event.currentTarget;
		var str = $(el).attr('id');
		var idParts = str.split('-');
		var projectId = idParts[1];
		var serviceId = idParts[2];


		var thisService = Services.findOne({_id: serviceId});

		_.each(thisService.projects, function (project, idx) { 
			console.log(idx);

			var obj = {};
			obj['projects.'+idx+'.projectAllocation'] = parseInt(event.currentTarget.value);
	


			if(project.projectId == idParts[1]) {
				//need to find index of object
				var p = 'projects[idx].projectAllocation'
				Services.update({_id: serviceId}, {$set:obj});
			}

		});
		//Session.set('allocateProject', thisOne);
		//Meteor.call('setProjectAllocation', id, allocation);

	},
	'click .project-allocation': function(event, template) {

		var el = event.currentTarget;
		var str = $(el).attr('id');

		//Session.set('allocateProject', str);

		$('.allocate-input').hide();

		$(el).find('.allocate-input').show();

		
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

			service.projects.forEach(function(project) {
				projectsArr.push(project.projectId);  //TODO, can we do this without pushing inside the double loop.  should only need to push once
			});

		});
		var uniqueArr = _.uniq(projectsArr);
		var projects = Projects.find({_id: {$in: uniqueArr}});
		return projects;

	},
	project: function() {
		var projects = [];
		this.projects.forEach(function(project) {
			
			projects.push(project);
		});

		return projects;
	},
	serviceAllocation: function() {
		var allocationSum = 0;
		this.projects.forEach(function(project) {
			//console.log(project.projectAllocation);
			allocationSum += project.projectAllocation;
		});
		return allocationSum+'%';
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