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

