// Import(s)
import './configurationTesting.html';

// Import(s)
import { Configurations } from '/imports/api/collections/configurations/configurations.js';
import { Products } from '/imports/api/collections/products/products.js';
import { Parameters } from '/imports/api/collections/parameters/parameters.js';
import { Testers } from '/imports/api/collections/testers/testers.js';

// Template Events
Template.Configuration_Testing.onCreated(function() {
    const handle1 = Meteor.subscribe('configurations.all');
    Tracker.autorun(() => {
        const isReady = handle1.ready();
        console.log(`Handle is ${isReady ? 'ready' : 'not ready'}`);
	});
	const handle2 = Meteor.subscribe('parametersData');
    Tracker.autorun(() => {
        const isReady = handle2.ready();
        console.log(`parametersData is ${isReady ? 'ready' : 'not ready'}`);
	});
	const handle3 = Meteor.subscribe('testersData');
    Tracker.autorun(() => {
        const isReady = handle3.ready();
        console.log(`testersData is ${isReady ? 'ready' : 'not ready'}`);
	});
	const handle4 = Meteor.subscribe('productsData');
    Tracker.autorun(() => {
        const isReady = handle4.ready();
        console.log(`productsData is ${isReady ? 'ready' : 'not ready'}`);
    });
});

Template.Configuration_Testing.helpers({
	configurations: function() {
		return Configurations.find({
		  deletedAt: {
			$eq: null
		  }
		});
	},
	products() {
		return Products.find({});
	},
	parameters() {
		return Parameters.find({});
	},
	testers() {
		return Testers.find({});
	},
});

Template.Configuration_Testing.events({
		'submit .insert-data'(event) {
		event.preventDefault();

		const target = event.target;
		var configData = {
			product: {
                _id: target._id.value,
        		name: target.name.value,
            },
            sampleSize: parseInt(target.sampleSize.value),
            tester: {
                _id: target._id.value,
        		name: target.name.value,
            },
            parameter: {
                _id: target._id.value,
        		name: target.name.value,
            },
            controlLimit: {
                upperControlLimit: parseInt(target.upperControlLimit.value),
                lowerControlLimit: parseInt(target.lowerControlLimit.value),
            },
            specLimit: {
                upperSpecLimit: parseInt(target.upperSpecLimit.value),
                lowerSpecLimit: parseInt(target.lowerSpecLimit.value),
            },
		};
		console.log(configData);
			// Meteor.call('configurations.insert', configData, function(error) {
			// 	if(error) {
			// 		document.getElementById('error-msg').innerHTML = error.reason;
			// 	}
			// });
	},
	'click #delete': function(){
		var configDataId = this._id;
		Meteor.call('configurations.remove', configDataId, function(error) {
		  if(error) {
			document.getElementById("error-msg").innerHTML = error.reason;
		  } else {
			
		  }
		});
	  }
});
