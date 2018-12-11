import './sidebar.html';

Template.Admin_sidebar.helpers({
  currentRoute(route) {
    return Router.current().route.getName() === route;
  }
});