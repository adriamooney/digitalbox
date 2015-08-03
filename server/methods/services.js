Meteor.methods({
  addService: function(data){
    return Services.insert(data);
  },
  updateServiceProject: function(id, obj) {
  	Services.update({_id: id}, {$set:obj});
  },
  removeService: function(id) {
  	Services.remove({_id: id});
  }
 });