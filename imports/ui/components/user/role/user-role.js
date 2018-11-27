import './user-role.html';
Template.User_role.events({
    'click .modal-toggle'(event, temp){
        var modal = document.getElementById('myModal');
        modal.style.display = "block";
    },
    'click .close-toggle'(event, temp){
        var modal = document.getElementById('myModal');
        modal.style.display = "none";
    },
    'click .cancel'(event, temp){
        var modal = document.getElementById('myModal');
        modal.style.display = "none";
    }
});