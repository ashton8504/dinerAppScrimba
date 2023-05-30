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

// Function to handle the click event on the "add-to-order" button
function addToOrder(event) {
    const menuItem = event.target.parentNode.querySelector('.menu-details').innerHTML;

    // Example code to update and display the order list
    const orderList = document.getElementById('order-list');
    const orderItem = document.createElement('li');
    orderItem.innerHTML = menuItem;
    orderList.appendChild(orderItem);

    // Show the "Your Order" section if it was previously hidden
    const yourOrderSection = document.getElementById('your-order');
    yourOrderSection.style.display = 'block';
}

renderMenu();
