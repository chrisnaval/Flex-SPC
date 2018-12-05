import './item-forms.html';
import { ReactiveDict } from 'meteor/reactive-dict';

Template.Item_forms.onCreated(function() {
    this.showDictionary = new ReactiveDict();
    this.showDictionary.set('showItemFields', false);
    this.showDictionary.set('showProductFields', false);
    this.showDictionary.set('showParameterFields', false);
});

Template.Item_forms.helpers({
    showItemFields() {
        return Template.instance().showDictionary.get('showItemFields');
    },
    showProductFields() {
        return Template.instance().showDictionary.get('showProductFields');
    },
    showParameterFields() {
        return Template.instance().showDictionary.get('showParameterFields');
    }
});
Template.Item_forms.events({
    // 'click .item': function(event, template) {
    //     event.preventDefault();
    //     template.showDictionary.set('showItemFields', true);
    //     template.showDictionary.set('showProductFields', false);
    //     template.showDictionary.set('showParameterFields', false);
    // },
    // 'click .product': function(event, template) {
    //     event.preventDefault();
    //     template.showDictionary.set('showProductFields', true);
    //     template.showDictionary.set('showItemFields', false);
    //     template.showDictionary.set('showParameterFields', false);
    // },
    // 'click .parameter': function(event, template) {
    //     event.preventDefault();
    //     template.showDictionary.set('showParameterFields', true);
    //     template.showDictionary.set('showProductFields', false);
    //     template.showDictionary.set('showItemFields', false);
    // },
    'submit .insert-item': function(event, template) {
        event.preventDefault();
        const target = event.target;
        var test = target.item_name.value;
        var parameter = { 
            test: target.item_name.value
        }
        console.log(parameter);
    },
    'click tr': function(event, temp){
        var tar = document.getElementsByTagName('tr');
        for (var i = 0; i < tar.length; i++) {
            tar[i].classList.remove('selected');
         }
        const target = event.target.closest('tr');
        target.classList.add('selected');
    },
    'click .select-data': function(event, temp){
        var data = document.getElementsByClassName("selected");
        var test = data[0].getElementsByClassName("firstname")[0].innerText;
        document.getElementById("item_name").value = test;
        var modal = document.getElementById('formModal');
        modal.style.display = "none";
    },
    'click .choose': function(event, temp){
        var modal = document.getElementById('formModal');
        modal.style.display = "block";
    },
    'click .close-toggle': function(event, temp){
        var modal = document.getElementById('formModal');
        modal.style.display = "none";
    },
    'click .cancel': function(event, temp){
        var modal = document.getElementById('formModal');
        modal.style.display = "none";
    },
});