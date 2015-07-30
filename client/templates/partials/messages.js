AppMessages = {
  // Local (client-only) collection
  collection: new Mongo.Collection(null),

  throw: function(message, messageType) {
    AppMessages.collection.insert({message: message, messageType: messageType, seen: false})
  }
};

Template.appMessages.helpers({
  appMessages: function() {
    return AppMessages.collection.find();
  }
});

Template.appMessage.rendered = function() {
  var message = this.data;
  Meteor.setTimeout(function () {
    AppMessages.collection.remove(message._id);
  }, 3000);
};