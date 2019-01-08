// Client entry point, imports all client code

import '/imports/startup/client';

// Custom Helpers
// Date Format
Template.registerHelper('formatDate', function(date) {
	return moment(date).format('MMMM D, YYYY h:mm A');
});
// Capitalize the first letter of the word
Template.registerHelper('ucFirst', function(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
});