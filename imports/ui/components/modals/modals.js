import './modals.html';

//custom dashboard
Template.Custom_dashboard.events({
    'click .cancel'(){
        var modal = document.getElementById('formModal');
        var tar = document.getElementsByTagName('tr');

        for (var i = 0; i < tar.length; i++) {
            tar[i].classList.remove('selected');
         }

        modal.style.display = 'none';
    },
    'click tr'(event){
        var tar = document.getElementsByTagName('tr');

        for (var i = 0; i < tar.length; i++) {
            tar[i].classList.remove('selected');
        }
         
        const target = event.target.closest('tr');
        target.classList.add('selected');
    },
});

//delete modal
Template.Delete_modal.events({
    'click .close-toggle'(){
        var modal = document.getElementById('myModal');
        modal.style.display = 'none';
    },
    'click .cancel'(){
        var modal = document.getElementById('myModal');
        modal.style.display = 'none';
    }
});