import './modals.html';

//custom dashboard
Template.Custom_dashboard.events({
    'click .cancel'() {
        var modal = document.getElementById('formModal');
        var tr = document.getElementsByTagName('tr');

        for(var i = 0; i < tr.length; i++) {
            tr[i].classList.remove('selected');
         }

        modal.style.display = 'none';
    },
    'click tr'(event) {
        var tar = document.getElementsByTagName('tr');

        for(var i = 0; i < tar.length; i++) {
            tar[i].classList.remove('selected');
        }
         
        const target = event.target.closest('tr');
        target.classList.add('selected');
    },
});

//delete modal
Template.Delete_modal.events({
    'click .close-toggle'() {
        var modal = document.getElementById('deleteModal');
        modal.style.display = 'none';
    },
    'click .cancel'() {
        var modal = document.getElementById('deleteModal');
        modal.style.display = 'none';
    }
});

//Parameter
Template.Parameter.events({
    'click .cancel'() {
        var modal = document.getElementById('parameterModal');
        var tr = document.getElementsByTagName('tr');

        for (var i = 0; i < tr.length; i++) {
            tr[i].classList.remove('selected');
         }

        modal.style.display = 'none';
    }
});