Meteor.methods({
  addProject: function(data){
    return Projects.insert(data);
  },
  addProjectToServices: function(companyId, projectName, projectId) {
  	//TODO:  projectName is being saved as a key name rather than a variable
  	//http://stackoverflow.com/questions/14527980/can-you-specify-a-key-for-addtoset-in-mongo
  	Services.update({companyId: companyId}, {$push: {'projects': {projectName: projectName, projectId: projectId, projectAllocation: 0}}}, { multi: true });
  }
 });


 //{$push: {profile_set: {'name': 'nick', 'options': 2}}})

