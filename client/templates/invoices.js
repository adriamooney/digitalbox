Template.invoiceTable.helpers({
	
	services: function() {
		var services = Services.find({companyId: this._id});
		return services;

	},
	project: function() {
		var projects = Projects.find({companyId: this._id});
		return projects;
	},
	projectFee: function() {
		//console.log(this);
		var services = Services.find({companyId: this.companyId});
		var self = this;
		var projectSum = 0;

		services.forEach(function(service) {
			if(service.projects) {

				var projectVal = _.where(service.projects, {projectId: self._id});
				//console.log(projectVal);
	
				var percentage = projectVal[0].projectAllocation / 100;   //percentage

				var amt = service.fee * percentage;
				
				projectSum += amt;

			}
			
		});
		return projectSum;
	},
	total: function( )  {
		//monthly fee * total percentage
		var services = Services.find({companyId: this._id});
		var self = this;
		totalPercentage = 0;
		var totalFee = 0;

		services.forEach(function(service) {
			if(service.projects) {

				
				_.each(service.projects, function (project, idx) { 
					//console.log(project.projectAllocation);

					var percentage = project.projectAllocation / 100;

					totalPercentage += percentage;

					var total = totalPercentage * service.fee;
					totalFee = total;


				});

			}
			
			
		});
		return totalFee;

	}
});


