import './dashboard.html';

// Component(s)
import '../../components/banner/banner.js';
import '../../components/graphs/candlestick/candlestick.js';
import '../../components/graphs/histograph/histograph.js';
import '../../components/graphs/pareto/pareto.js';
import '../../components/graphs/range/range.js';
import '../../components/graphs/xbar/xbar.js';
import '../../components/graphs/yield/yield.js';
import '../../components/modal/custom-dash/custom.js';

Template.Dashboard.events({
    'click .choose': function() {
        var modal = document.getElementById('formModal');
        modal.style.display = 'block';
    },
    'click .image-content': function(event) {
        var img = document.getElementsByClassName('image-content');
        
        for(var i = 0; i < img.length; i++) {
            img[i].classList.remove('selected');
        }

        const target = event.target.closest('.image-content');
        target.classList.add('selected');
    },
});