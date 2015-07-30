Meteor.methods({
  addService: function(data){
    return Services.insert(data);
  }
 });