var subscriptions = new SubsManager();

Router.configure({
  layoutTemplate: 'layout',  //main layout (header, footer stuff that doesn't change). contains yield helper where dynamic content goes into based on route
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function() {
    return [subscriptions.subscribe('companies'), subscriptions.subscribe('services'), subscriptions.subscribe('users'), 
      subscriptions.subscribe('projects')];
  }
  //told the router to use the layout template layout.html as the default layout for all routes
});

Router.route('/', {
    name: 'home',
    onBeforeAction: function () {
      AccountsEntry.signInRequired(this);
    }
});

Router.route('/dashboard', {
    name: 'dashboard'
});

Router.route('/services', {
    name: 'services'
});

Router.route('/projects', {
    name: 'projects'
});

Router.route('/service/:_id', {
    name: 'service',
    data: function() {
        return Companies.findOne(this.params._id);
    }
});

Router.route('/account/:_id', {
    name: 'account',
    data: function() {
        return Companies.findOne(this.params._id);
    }
});


Router.route('/companies/', {
    name: 'companies',
    data: function() {
        return Companies.find({});
    }
});










