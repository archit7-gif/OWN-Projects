
let cartIcon = document.querySelector(".cart-icon img");
let body = document.querySelector('body');
let closecart = document.querySelector(".close");
let listProdctHTML = document.querySelector('.product-list');
let listCartHTML = document.querySelector('.cart-list');
let iconCartSpan = document.querySelector(".cart-icon .count");

let listProdct = [];
let carts = [];

cartIcon.addEventListener('click', () => {
    body.classList.toggle("showCart");
});


closecart.addEventListener('click', () => {
    body.classList.remove("showCart");
});




const addDataToHTML = () => {
    if (!listProdctHTML) return;
    listProdctHTML.innerHTML = "";

    listProdct.forEach(product => {
        let newProduct = document.createElement('div');
        newProduct.classList.add('items');
        newProduct.dataset.id = product.id;

        newProduct.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h2>${product.name}</h2>
            <div class="price">PRICE : ${product.price}$</div>
            <button class="addCart">ADD TO CART</button>
        `;

        listProdctHTML.appendChild(newProduct);
    });
};

listProdctHTML.addEventListener('click', (event) => {
    if (event.target.classList.contains('addCart')) {
        let product_id = event.target.parentElement.dataset.id;
        addToCart(product_id);
    }
});



const addToCart = (product_id) => {
    let position = carts.findIndex(item => item.product_id == product_id);

    if (position < 0) {
        carts.push({ product_id, quantity: 1 });
    } else {
        carts[position].quantity += 1;
    }

    updateCartUI();
};



const changeQuantity = (product_id, type) => {
    let index = carts.findIndex(item => item.product_id == product_id);
    if (index >= 0) {
        if (type === "plus") {
            carts[index].quantity += 1;
        } else {
            let newQty = carts[index].quantity - 1;
            if (newQty > 0) {
                carts[index].quantity = newQty;
            } else {
                carts.splice(index, 1);
            }
        }
    }

    updateCartUI();
};

const updateCartUI = () => {
    addCartToMemory();
    addCartToHTML();
};

const addCartToMemory = () => {
    localStorage.setItem('cart', JSON.stringify(carts));
};

const addCartToHTML = () => {
    listCartHTML.innerHTML = "";
    let totalQuantity = 0;

    carts.forEach(cart => {
        let product = listProdct.find(p => p.id == cart.product_id);
        if (!product) return;

        totalQuantity += cart.quantity;

        let newCart = document.createElement('div');
        newCart.classList.add('item');
        newCart.dataset.id = cart.product_id;

        newCart.innerHTML = `
            <div class="image">
                <img src="${product.image}" alt="">
            </div>
            <div class="name">${product.name}</div>
            <div class="totalprice">${product.price * cart.quantity}$</div>
            <div class="quantity">
                <span class="minus">-</span>
                <span>${cart.quantity}</span>
                <span class="plus">+</span>
            </div>
        `;

        listCartHTML.appendChild(newCart);
    });

    // Set icon count — hide if cart is empty
    iconCartSpan.textContent = totalQuantity > 0 ? totalQuantity : "";
};



listCartHTML.addEventListener('click', (event) => {
    let clicked = event.target;
    if (clicked.classList.contains('plus') || clicked.classList.contains('minus')) {
        let cartItem = clicked.closest('.item');
        if (!cartItem) return;

        let product_id = cartItem.dataset.id;
        let type = clicked.classList.contains('plus') ? 'plus' : 'minus';

        changeQuantity(product_id, type);
    }
});



const initApp = () => {
    fetch('products.json')
        .then(response => response.json())
        .then(data => {
            listProdct = data;
            addDataToHTML();

            if (localStorage.getItem('cart')) {
                carts = JSON.parse(localStorage.getItem('cart'));
                addCartToHTML();
            }
        });
};

initApp();
