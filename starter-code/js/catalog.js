/* global Product, Cart */

'use strict';

// Set up an empty cart for use on this page.
var cart = new Cart([]);

// On screen load, we call this method to put all of the busmall options
// (the things in the Product.allProducts array) into the drop down list.
function populateForm() {

  var selectElement = document.getElementById('items');
  var option_el;
  for (var i in Product.allProducts) {
    option_el = document.createElement('option');
    option_el.textContent = Product.allProducts[i].name;
    option_el.setAttribute ('value', Product.allProducts[i].name);
    selectElement.appendChild(option_el);
  }
  var target = document.getElementById('quantity');
  target.setAttribute('min', '1');
}

// When someone submits the form, we need to add the selected item to the cart
// object, save the whole thing back to local storage and update the screen
// so that it shows the # of items in the cart and a quick preview of the cart itself.
function handleSubmit(event) {
  event.preventDefault();
  if(!event.target[2].value === '') {
    return;
  }
debugger
  // Do all the things ...
  addSelectedItemToCart(event);
  cart.saveToLocalStorage();
  updateCounter();
  updateCartPreview(event);

}

function addSelectedItemToCart(event) {
  var current = event.target[1].value;
  var qty = parseInt(event.target[2].value);
  for (var i in Product.allProducts){
    if (current === Product.allProducts[i].name) {
      cart.addItem(Product.allProducts[i], qty);
    }
  }
}

function updateCounter() {
  var target = document.getElementById('itemCount');
  target.textContent = cart.items.length;
}

function updateCartPreview(event) {
  // TOD: Add a new element to the cartContents div with that information
  var target = document.getElementById('cartContents');
  var current = event.target[1].value;
  var qty = event.target[2].value;
  var div_el = document.createElement('div');
  div_el.textContent = `${current} - ${qty}`;
  target.appendChild(div_el);

}

// Set up the "submit" event listener on the form.
// This is the trigger for the app. When a user "submits" the form, it will
// Call that handleSubmit method above and kick off the whole process
var catalogForm = document.getElementById('catalog');
catalogForm.addEventListener('submit', handleSubmit);

// Before anything else of value can happen, we need to fill in the select
// drop down list in the form.
populateForm();
