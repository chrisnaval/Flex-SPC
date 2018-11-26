import './user-permission.html';

Template.User_permission.events({
    'click .select_all'(event, temp){   
        var roles =  document.getElementsByTagName('input');
        for(var i in roles) {
            roles[i].checked = 'false';
            roles[i].setAttribute('checked', status);

        }
    },
    'click .unselect'(event, temp){
        var roles =  document.getElementsByTagName('input');
        for(var x in roles) {
            roles[x].checked = ''
            roles[x].removeAttribute('checked');
        }
     },
     'click .submit'(event, temp){
        var s = document.querySelector('.togBtn:checked').value

        console.log(s);
     }
     
});
