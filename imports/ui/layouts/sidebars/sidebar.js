import './sidebar.html';

Template.Sidebar.helpers({
  currentRoute(route) {
    return Router.current().route.getName() === route;
  }
});