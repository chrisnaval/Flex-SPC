import './custom.html';
Template.Custom_dashboard_modal.events({
    'click .cancel': function(event, temp){
        var modal = document.getElementById('formModal');
        var tar = document.getElementsByTagName('tr');
        for (var i = 0; i < tar.length; i++) {
            tar[i].classList.remove('selected');
         }
        modal.style.display = 'none';
    },
    
    'click tr': function(event, temp){
        var tar = document.getElementsByTagName('tr');
        for (var i = 0; i < tar.length; i++) {
            tar[i].classList.remove('selected');
         }
        const target = event.target.closest('tr');
        target.classList.add('selected');
    },
});