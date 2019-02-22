/* global Cart */
'use strict';

// Create an event listener so that when the delete link is clicked, the removeItemFromCart method is invoked.
var table = document.getElementById('cart');
table.addEventListener('click', removeItemFromCart);
var cart;

function loadCart() {
  var cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  cart = new Cart(cartItems);
}

// Make magic happen --- re-pull the Cart, clear out the screen and re-draw it
function renderCart() {
  loadCart();
  clearCart();
  showCart();

  //create for process order
}

function clearCart() {
  var tbody = table.getElementsByTagName('tbody')[0];
  tbody.innerHTML = '';
}

function showCart() {

  var tbody = table.getElementsByTagName('tbody')[0];
  var tr_el, td_el, img_el, a_el, span_el;

  for (var i in cart.items) {
    tr_el = document.createElement('tr');

    td_el = document.createElement('td');

    a_el = document.createElement('a');
    a_el.href = '#';
    a_el.name = i;
    a_el.textContent = 'X';
    td_el.appendChild(a_el);
    tr_el.appendChild(td_el);

    td_el = document.createElement('td');
    td_el.textContent = cart.items[i].quantity;
    tr_el.appendChild(td_el);

    td_el = document.createElement('td');
    img_el = document.createElement('img');
    img_el.src = cart.items[i].product.filePath;
    td_el.appendChild(img_el);

    span_el = document.createElement('span');
    span_el.textContent = cart.items[i].product.name;
    td_el.appendChild(span_el);
    tr_el.appendChild(td_el);
    tbody.appendChild(tr_el);
  }
}

function removeItemFromCart(event) {

  if (event.target.tagName !== 'A') return;
  cart.removeItem(parseInt(event.target.name));
  cart.saveToLocalStorage();
  renderCart();

}

// This will initialize the page and draw the cart on screen
renderCart();
