// Import the menuArray from data.js
import { menuArray } from './data.js';
const menu = document.getElementById("menu");

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

renderMenu();
