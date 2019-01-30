import './configurations.html';
import '../../modals/modals.js';

// Mongo Collection(s)
import { Configurations } from '/imports/api/collections/configurations/configurations.js';

Template.Configurations_list.onCreated(function() {
	Meteor.subscribe('configurations.all');
});

Template.Configurations_list.helpers({
	config() {
		return Configurations.find({
			deletedAt: null,
			'configuredBy.emailAddress': Meteor.user().emails[0].address,
		});
	},
});

Template.Configurations_list.events({
    'click .remove-data': function(event) {
		event.preventDefault();

		var modal = document.getElementById('deleteModal');
		modal.style.display = 'block';
		document.getElementById('delete_id').value = this._id;
	},
	'click .remove': function(event) {
		event.preventDefault();
		
		var _id = document.getElementById('delete_id').value;
		document.getElementById('delete_id').value = '';
		var configData = _id;

		Meteor.call('configurations.remove', configData, function(error) {
            if(error) {
                document.getElementById('error-msg').innerHTML = error.reason;
            }
		});
		
		var modal = document.getElementById('deleteModal');
		modal.style.display = 'none';
	},
});