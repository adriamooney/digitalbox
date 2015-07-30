Meteor.publish('companies', function(){
    return Companies.find();
});

Meteor.publish('projects', function(){
    return Projects.find();
});

Meteor.publish('services', function(){
    return Services.find();
});

Meteor.publish("users", function () {
	return Meteor.users.find({}, {fields: {emails: 1, profile: 1, createdAt:1}});
});