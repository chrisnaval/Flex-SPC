import './delete.html';

Template.Delete_modal.events({
    'click .close-toggle'(event, temp){
        var modal = document.getElementById('myModal');
        modal.style.display = 'none';
    },
    
    'click .cancel'(event, temp){
        var modal = document.getElementById('myModal');
        modal.style.display = 'none';
    }
});