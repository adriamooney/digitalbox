Meteor.methods({
  addService: function(data){
    Services.insert(data);
  }
 });