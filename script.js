// Import the menuArray from data.js
import { menuArray } from './data.js';
const menu = document.getElementById("menu");
const completeOrderBtn = document.getElementById('complete-order-btn');
const modal = document.getElementById('modal');
const closeBtn = document.querySelector('.close');
completeOrderBtn.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);


// Modal Section
function openModal() {
  modal.style.display = 'block';
}

function closeModal() {
  modal.style.display = 'none';
}

// This is pulling menu info from our data file and showing menu for app
function getMenuItems() {
    let menuFeed = '';
    menuArray.forEach(function (menuItem) {
        const emoji = menuItem.emoji;
        const encodedEmoji = emoji.codePointAt(0).toString(16).toUpperCase();
        const emojiHtml = `&#x${encodedEmoji};`;

        menuFeed += `
            <div class="menu">
                    <div class="menu-inner">
                    <div class="left-section">
                        <span class="emoji">${emojiHtml}</span>
                    </div>
                    <div class="right-section">
                        <div class="menu-details">
                        <p class="name">${menuItem.name}</p>
                        <p class="ingredients">${menuItem.ingredients.join(', ')}</p>
                        <p class="price">$${menuItem.price}</p>
                        </div>
                        <button class="add-to-order">+</button>
                    </div>
                    </div>
                    <div class="menu-line"></div>
            </div>
        `;
    });

    return menuFeed;
}

// This is rendering the menu 
function renderMenu() {
    const menuFeed = getMenuItems();
    menu.innerHTML = menuFeed;

    // Add event listener to the "add-to-order" buttons
    const addToOrderButtons = document.querySelectorAll('.add-to-order');
    addToOrderButtons.forEach(function (button) {
        button.addEventListener('click', addToOrder);
    });
}


// Define a global variable to keep track of the total price
let totalPrice = 0;

// Section allows us to add to our order
function addToOrder(event) {
    const menuItem = event.target.parentNode.querySelector('.menu-details');
    const itemName = menuItem.querySelector('.name').textContent;
    const itemPrice = parseFloat(menuItem.querySelector('.price').textContent.replace('$', ''));

    // Example code to update and display the order list
    const orderList = document.getElementById('order-list');
    const orderItem = document.createElement('li');
    orderItem.classList.add('order-item');

    const itemNameElement = document.createElement('span');
    itemNameElement.classList.add('item-name');
    itemNameElement.textContent = itemName;

    const itemPriceElement = document.createElement('span');
    itemPriceElement.classList.add('item-price');
    itemPriceElement.textContent = `$${itemPrice.toFixed(2)}`;

    const removeButton = document.createElement('button');
    removeButton.classList.add('remove-button');
    removeButton.textContent = 'Remove';
    removeButton.addEventListener('click', removeItem);

    orderItem.appendChild(itemNameElement);
    orderItem.appendChild(removeButton);
    orderItem.appendChild(itemPriceElement);

    orderList.appendChild(orderItem);

    // Update the total price
    totalPrice += itemPrice;
    const totalPriceElement = document.getElementById('total-price-amount');
    totalPriceElement.textContent = totalPrice.toFixed(2);

    // Show the "Your Order" section if it was previously hidden
    const yourOrderSection = document.getElementById('your-order');
    yourOrderSection.style.display = 'block';
}

// Remove an item from our order
function removeItem(event) {
    const orderItem = event.target.parentNode;
    const itemPrice = parseFloat(orderItem.querySelector('.item-price').textContent.replace('$', ''));
    
    // Update the total price
    totalPrice -= itemPrice;
    const totalPriceElement = document.getElementById('total-price-amount');
    totalPriceElement.textContent = totalPrice.toFixed(2);

    const orderList = orderItem.parentNode;
    orderList.removeChild(orderItem);

    // Hide the "Your Order" section if there are no items left
    if (orderList.children.length === 0) {
        const yourOrderSection = document.getElementById('your-order');
        yourOrderSection.style.display = 'none';
    }
}

// Modal styles for thank you message after payment is submitted 

document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("order-form");
    const modal = document.getElementById("modal");
    const modalContent = document.querySelector(".modal-content");
    const thankYouModal = document.getElementById("thank-you-modal");
    const thankYouMessage = document.getElementById("thank-you-message");
  
    form.addEventListener("submit", function(event) {
      event.preventDefault();
      const nameInput = document.getElementById("name");
      const name = nameInput.value;
  
      modal.style.display = "none";
      thankYouMessage.textContent = "Thank you for your order, " + name + "!";
      thankYouModal.style.display = "block";
  
      form.reset();
  
      setTimeout(function() {
        thankYouModal.style.display = "none";
        location.reload();
      }, 2000);
    });
  
    const closeBtns = document.querySelectorAll(".close");
    closeBtns.forEach(function(btn) {
      btn.addEventListener("click", function() {
        modal.style.display = "none";
        thankYouModal.style.display = "none";
      });
    });
  });
  
renderMenu();
