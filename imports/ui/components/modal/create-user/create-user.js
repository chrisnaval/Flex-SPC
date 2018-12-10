import './create-user.html'

Template.Create_user.events({
    'click .close-usermodal'(event, temp){
        var modal = document.getElementById('userModal');
        modal.style.display = 'none';
    },
    
    'click .cancel-usermodal'(event, temp){
        var modal = document.getElementById('userModal');
        modal.style.display = 'none';
    },
});