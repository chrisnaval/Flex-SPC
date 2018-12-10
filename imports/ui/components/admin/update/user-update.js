import './user-update.html';

Template.User_update.onCreated(function () {
  Meteor.subscribe('users.all');
});

Template.User_update.helpers({
  update_user() {
    var user_id = FlowRouter.getParam('_id');
    return Meteor.users.findOne({
      _id: user_id, 
    });
  },
});

Template.User_update.events({
  'submit .user-update'(event){
    console.log('nice');
    event.preventDefault();
    const target = event.target;
    // var profile = {
    var  firstName = target.firstname.value;
    var  lastName = target.lastname.value;
     var gender = target.gender.value;
     var userName = target.username.value;
    // }
    var _id = FlowRouter.getParam('_id');
    console.log( _id, firstName, lastName, gender, userName);
    Meteor.call('userProfile.update', _id, firstName, lastName, gender, userName, function(error) {
      if(error) {
        document.getElementById('error-msg').innerHTML = error.reason;
      }
    });
    FlowRouter.go('/admin/user');
  }
});