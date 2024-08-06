const prices = {
    apple: 3.5,
    banana: 2.0,
    orange: 3.0,
    tomato: 2.5,
    potato: 1.8,
    carrot: 2.2,
    milk: 1.5,
    cheese: 5.0,
    butter: 4.0,
    chicken: 7.0,
    fish: 10.0,
    flour: 1.2,
    sugar: 0.8,
    salt: 0.5
};

function addItemToOrder(itemId, quantity) {
    const tableBody = document.querySelector('#order-table tbody');
    let existingRow = null;

    Array.from(tableBody.rows).forEach(row => {
        if (row.cells[0].textContent === itemId) {
            existingRow = row;
        }
    });

    if (existingRow) {
        const newQuantity = parseFloat(existingRow.cells[1].textContent) + parseFloat(quantity);
        existingRow.cells[1].textContent = newQuantity;
        existingRow.cells[2].textContent = (newQuantity * prices[itemId]).toFixed(2);
    } else {
        const row = tableBody.insertRow();
        row.insertCell(0).textContent = itemId;
        row.insertCell(1).textContent = quantity;
        row.insertCell(2).textContent = (quantity * prices[itemId]).toFixed(2);
    }

    updateTotalPrice();
}

function updateTotalPrice() {
    const tableBody = document.querySelector('#order-table tbody');
    let totalPrice = 0;

    Array.from(tableBody.rows).forEach(row => {
        totalPrice += parseFloat(row.cells[2].textContent);
    });

    document.getElementById('total-price').textContent = totalPrice.toFixed(2);
}

document.querySelectorAll('.add-button').forEach(button => {
    button.addEventListener('click', () => {
        const itemId = button.getAttribute('data-item');
        const quantity = document.getElementById(itemId).value;
        if (quantity > 0) {
            addItemToOrder(itemId, quantity);
        }
    });
});

document.getElementById('add-to-favourites').addEventListener('click', () => {
    const formData = new FormData(document.getElementById('grocery-form'));
    const favouriteItems = {};

    formData.forEach((value, key) => {
        if (value > 0) {
            favouriteItems[key] = value;
        }
    });

    localStorage.setItem('favouriteOrder', JSON.stringify(favouriteItems));
});

document.getElementById('apply-favourites').addEventListener('click', () => {
    const favouriteItems = JSON.parse(localStorage.getItem('favouriteOrder'));

    if (favouriteItems) {
        for (const [key, value] of Object.entries(favouriteItems)) {
            document.getElementById(key).value = value;
            addItemToOrder(key, value);
        }
    }
});

document.getElementById('clear-favourites').addEventListener('click', () => {
    localStorage.removeItem('favouriteOrder');
    alert('Favourite order cleared!');
});

document.getElementById('buy-now').addEventListener('click', () => {
    const tableBody = document.querySelector('#order-table tbody');
    if (tableBody.rows.length > 0) {
        const orderItems = [];

        Array.from(tableBody.rows).forEach(row => {
            orderItems.push({
                item: row.cells[0].textContent,
                quantity: row.cells[1].textContent,
                price: row.cells[2].textContent
            });
        });

        localStorage.setItem('orderItems', JSON.stringify(orderItems));
        window.location.href = 'order-summary.html';
    } else {
        alert('Please add items to your order before proceeding.');
    }
});









document.getElementById('buy-now').addEventListener('click', () => {
    const tableBody = document.querySelector('#order-table tbody');
    if (tableBody.rows.length > 0) {
        const orderItems = [];

        Array.from(tableBody.rows).forEach(row => {
            orderItems.push({
                item: row.cells[0].textContent,
                quantity: row.cells[1].textContent,
                price: row.cells[2].textContent
            });
        });

        localStorage.setItem('orderItems', JSON.stringify(orderItems));
        window.location.href = 'summary.html';
    } else {
        alert('Please add items to your order before proceeding.');
    }
});
