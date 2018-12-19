import './configuration.html'

//component from modal
import '../../components/modals/modals.js'

//events
Template.Configuration.events({
    'click .choose'(event) {
        event.preventDefault();
        var modal = document.getElementById('parameterModal');
        modal.style.display = "block";
    },
    'click .select-data'(event) {
        event.preventDefault();
        var data = document.getElementsByClassName("selected");
        var test = data[0].getElementsByClassName("parameter")[0].innerText;

        document.getElementById("parameter").value = test;

        var modal = document.getElementById('parameterModal');
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

        var product = target.product.value;
        var sampleSize = target.sampleSize.value;
        var tester = target.tester.value;
        var parameter = target.parameter.value;
        var upperControlLimit = target.upperControlLimit.value;
        var upperSpecLimit = target.upperSpecLimit.value;
        var lowerSpecLimit = target.lowerSpecLimit.value;

        // Meteor.call('', userData, function(error) {
        //     if(error) {
        //         document.getElementById('error-msg').innerHTML = error.reason;
        //     }
        // });
        FlowRouter.go('/');
    }
});