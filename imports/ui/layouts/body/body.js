// Import(s)
import './body.html';

Template.App_body.events({
    'click .toggle'(event, temp) {
        temp.$('.page-sidebar').toggleClass('thin');
        temp.$('.page-content').toggleClass('padding-left');
        temp.$('.page-navbar').toggleClass('padding-left');
        temp.$('.menus').toggleClass('displaynone');
        temp.$('.navbar-logo').toggleClass('displaynone');
        temp.$('.thin-menu').toggleClass('displayblock');
    }
});