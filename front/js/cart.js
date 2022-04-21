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
    let productsStorage = getProducts();
    productsStorage = productsStorage.filter(p => p.id != product.id);    
    saveProducts(product);
}

function replaceQuantity(product, quantity)
{
    let productsStorage = getProducts();
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
    let productsStorage = getProducts();    
    let totalQuantity = 0;
    for (let product of productsStorage)
    {
       totalQuantity += product.quantity;
       console.log(totalQuantity)
    }
    return totalQuantity
}

function getTotalPrice(){
    let productsStorage = getProducts();    
    let totalPrice = 0;
    for (let product of productsStorage)
    {
        totalPrice += product.price * product.quantity;
        console.log(totalPrice);       
    }
    return totalPrice    
}

let products = getProducts();


for (let product of products){   
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
        <p>${product.price + "€"}</p>
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

let totalPrice = getTotalPrice()  
const showPrice = document.getElementById('totalPrice');
showPrice.innerHTML = totalPrice;

let quantitys = getNumberProduct();
console.log(quantitys)
const showQuantitys = document.getElementById('totalQuantity');
showQuantitys.innerHTML = quantitys;



