<<<<<<< HEAD
import './header.html';
import '../../../components/modals/modals.js';

Template.Admin_header.events({
    'click #fetch-profile': function() {
        event.preventDefault();

        var modal = document.getElementById('user-profile');
		modal.style.display = 'block';
    }
});
=======
import './header.html';
>>>>>>> fbee2071e5d1e03c73480ed01b385c3b8f39b66b
