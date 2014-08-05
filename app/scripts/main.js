'use strict';
var breeze = document.querySelector('#breeze');
var breezeText = document.querySelector('#breeze-text');

breeze.addEventListener('click', function () {
    breezeText.speak();
});
