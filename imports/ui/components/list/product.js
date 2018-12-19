import './product.html'

//components from modal
import '../modals/modals.js'

//events
Template.Product_list.events({
    'click .remove-data'(event) {
		event.preventDefault();
		var modal = document.getElementById('deleteModal');
		modal.style.display = 'block';
		// document.getElementById('delete_id').value = this._id;
	},
});
