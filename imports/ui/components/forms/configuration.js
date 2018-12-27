import './configuration.html';

// Components(s)
import '../../components/modals/modals.js';

// Events
Template.Configuration.events({
    //tester
    'click .chooseTester'(event) {
        event.preventDefault();
        var modal = document.getElementById('testerModal');
        modal.style.display = "block";
    },
    'click .select-tester'(event) {
        event.preventDefault();
        var data = document.getElementsByClassName('selected');
        var dataselected = data[0].getElementsByClassName('tester')[0].innerText;
        var dataid = data[0].getElementsByClassName('tester')[0].getAttribute('data-id');

        document.getElementById('tester').value = dataselected;
        document.getElementById('tester_id').value = dataid;

        var modal = document.getElementById('testerModal');
        modal.style.display = "none";
    },

    //parameter
    'click .chooseParameter'(event) {
        event.preventDefault();
        var modal = document.getElementById('parameterModal');
        modal.style.display = "block";
    },
    'click .select-params'(event) {
        event.preventDefault();
        var data = document.getElementsByClassName('selected');
        var dataselected = data[0].getElementsByClassName('parameter')[0].innerText;
        var dataid = data[0].getElementsByClassName('parameter')[0].getAttribute('data-id');

        document.getElementById('parameter').value = dataselected;
        document.getElementById('parameter_id').value = dataid;

        var modal = document.getElementById('parameterModal');
        modal.style.display = "none";
    },

    //product
    'click .chooseProduct'(event) {
        event.preventDefault();
        var modal = document.getElementById('productModal');
        modal.style.display = "block";
    },
    'click .select-product'(event) {
        event.preventDefault();
        var data = document.getElementsByClassName('selected');
        var dataselected = data[0].getElementsByClassName('product')[0].innerText;
        var dataid = data[0].getElementsByClassName('product')[0].getAttribute('data-id');

        document.getElementById('product').value = dataselected;
        document.getElementById('product_id').value = dataid;

        var modal = document.getElementById('productModal');
        modal.style.display = "none";
    },
    'click tr'(event) {
        event.preventDefault();
        var tr = document.getElementsByTagName('tr');

        for (var i = 0; i < tr.length; i++) {
            tr[i].classList.remove('selected');
         }

        const target = event.target.closest('tr');
        target.classList.add('selected');
    },
    'submit .configuration-form'(event) {
        event.preventDefault();
        const target = event.target;

        var productId = target.productId.value;
        var testerId = target.testerId.value;
        var parameter_id = target.parameterId.value
        var product = target.product.value;
        var sampleSize = target.sampleSize.value;
        var tester = target.tester.value;
        var parameter = target.parameter.value;
        var upperControlLimit = target.upperControlLimit.value;
        var lowerControlLimit = target.lowerControlLimit.value;
        var upperSpecLimit = target.upperSpecLimit.value;
        var lowerSpecLimit = target.lowerSpecLimit.value;

        var configData = {
            product: {
                _id: productId,
        		name: product,
            },
            sampleSize: parseInt(sampleSize),
            tester: {
                _id: testerId,
        		name: tester,
            },
            parameter: {
                _id: parameter_id,
        		name: parameter,
            },
            controlLimit: {
                upperControlLimit: parseInt(upperControlLimit),
                lowerControlLimit: parseInt(lowerControlLimit),
            },
            specLimit: {
                upperSpecLimit: parseInt(upperSpecLimit),
                lowerSpecLimit: parseInt(lowerSpecLimit),
            },
        }
        
        Meteor.call('configurations.insert', configData, function(error) {
            if(error) {
                document.getElementById('error-msg').innerHTML = error.reason;
            }
        });
        FlowRouter.go('/');
    }
});