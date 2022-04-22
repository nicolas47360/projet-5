const productsStorage = getProducts()

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
    productsStorage = productsStorage.filter(p => p.id != product.id && p.color != product.color);    
    saveProducts(product);
}

function replaceQuantity(product, quantity)
{
    let productsStorage = getProducts();
    productsStorage = productsStorage.find(p => p.id == product.id && p.color == product.color);
    productsStorage.quantity += quantity;
    if (productsStorage.quantity <= 0){
        removeProducts(productsStorage);
    }
    else{
        saveProducts(product);
    }    
}

//fonction permettant d'obtenir et d'afficher la quantité totale de produit dans le localstorage
function getQuantityProduct()
{        
    let totalQuantity = 0;
    for (let product of productsStorage)
    {
        totalQuantity += product.quantity;
        const showQuantities = document.getElementById('totalQuantity');
        showQuantities.innerHTML = totalQuantity       
    }
}

//fonction permettant de calculer et d'afficher le prix total de l'ensemble des produits contenu dans le localstorage
function getTotalPrice(){       
    let totalPrice = 0;
    for (let product of productsStorage)
    {
        totalPrice += product.price * product.quantity;
        const showPrice = document.getElementById('totalPrice');
        showPrice.innerHTML = totalPrice;              
    }        
}

function showProducts(){
    for (let product of productsStorage){   
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
}


getTotalPrice();
getQuantityProduct()
showProducts();


const changeProduct = document.getElementsByClassName('deleteItem');
console.log(changeProduct)
