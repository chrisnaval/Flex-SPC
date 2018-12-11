// Import(s)
import './sidebar.html';

Template.App_sidebar.helpers({
  currentRoute(route) {
    return Router.current().route.getName() === route;
  }
});

Template.App_sidebar.events({
  'click .list': function (event, template) {
    
  },
});