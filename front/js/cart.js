function saveProducts(product)
{
    localStorage.setItem("products", JSON.stringify(product))
}

function getProducts()
{
    return JSON.parse(localStorage.getItem("products"));
}

function removeProducts (product)
{
    let productsStorage = getBasket();
    productsStorage = productsStorage.filter(p => p.id != product.id);    
    saveProducts(product);
}

function replaceQuantity(product, quantity)
{
    let productsStorage = getBasket();
    productsStorage = productsStorage.find(p => p.id == product.id);
    productsStorage.quantity += quantity;
    if (productsStorage.quantity <= 0){
        removeProducts(productsStorage);
    }
    else{
        saveProducts(product);
    }    
}

function getNumberProduct()
{
    let productsStorage = getBasket();
    let number = 0;
    for (let product in productsStorage)
    {
        number += product.quantity;
    }
    return number
}

function getTotalPrice(){
    let productsStorage = getBasket();
    let price = 0;
    for (let product in productsStorage)
    {
        number += product.price * product.quantity;
    }
    return price
}

let products = getProducts();
console.log(products)

for (product of products){
    console.log(product);
    let image = product.imageUrl;
    console.log(image)
    document.getElementById("cart__items");
    
    cart__items.innerHTML +=`
    <article class="cart__item" data-id=${product.id} data-color="${product.color}">
    <div class="cart__item__img">
    <img src="${product.imageUrl}" alt="${product.altTxt}">
    </div>
    <div class="cart__item__content">
    <div class="cart__item__content__description">
        <h2>${product.title}</h2>
        <p>${product.color}</p>
        <p>${product.price}</p>
    </div>
    <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
        <p>Qté : </p>
        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.quantity}">
        </div>
        <div class="cart__item__content__settings__delete">
        <p class="deleteItem">Supprimer</p>
        </div>
    </div>
    </div>
    </article>
    `
}




