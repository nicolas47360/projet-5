const url = "http://localhost:3000/api/products"

const params = new URLSearchParams(window.location.search);

let urlData  = params.get('id');

var imageUrl = ""
var quantityproduct = ""

//instancition d'u  objet prennant plusieurs paramétres
class Product {
    constructor(id, color, title, price, description, quantity, imageUrl, texte) {
        this.id = id;
        this.color = color;
        this.title = title;
        this.price = parseInt(price, 10);
        this.description = description;
        this.quantity = parseInt(quantity, 10);
        this.imageUrl = imageUrl;
        this.alttexte = texte;        
    }
}

//récuperation de la data de l'api pour une id de produit avec injection dans le DOM
fetch  (url + "/" + urlData)
    .then((response) => response.json())
    .then ((data) => {
        const image = document.createElement("div");               
        document.querySelector(".item__img").appendChild(image);        
        const title = document.getElementById('title');
        const price = document.getElementById('price');
        const description = document.getElementById('description');       
        const colors = document.getElementById('colors');
        image.innerHTML = `<img id="item__img__url" src="${data.imageUrl}" alt="${data.altTxt}">`;
        imageUrl = document.getElementById('item__img__url');                        
        title.innerHTML = `${data.name}`;
        price.innerHTML = `${data.price}`;         
        description.innerHTML =`${data.description}`;         
        for (color in data.colors) {            
            colors[colors.options.length] = new Option(data.colors[color]);
        }        
    })

const addToCart = document.getElementById('addToCart');
const quantity = document.getElementById('quantity');

// évenement permettant l'ajout des produits au click du boutton avec gestion ds quantités et des couleurs
addToCart.addEventListener("click", (event) => {
    event.preventDefault();
    if (quantity.value <= 0 || quantity.value > 100)
    {
        alert("La quantité selectionnée n'est pas valide")
    }
     else if( colors.value == "")
    {
        alert("Veuillez séléctionnée une couleur")
    } 
    else { //si tout est ok on instancie la classe Product
        selectProducts = new Product(urlData, colors.value, title.textContent, price.textContent, description.textContent, quantity.value, imageUrl.src, imageUrl.alt);
        addProductsInStorage(selectProducts);
    }
});

// fonction permettant d'ajouter un produit au local storage
function addProductsInStorage(selectProducts)
{
        // on instancie un tableau vide
    productsSaveInStorage = [];
    if (localStorage.getItem("product")) 
    { // si il y a un produit dans le local storage
        productsSaveInStorage = JSON.parse(localStorage.getItem("product"));
        if(checkDataStorage(productsSaveInStorage)) 
        { // on passe le tableau dans une fonction qui va boucler sur le tableau de products et += la quantité si il trouve un produit déjà existant
            localStorage.setItem("product", JSON.stringify(productsSaveInStorage));
            addmessage();
        } 
        else { // si ce produit n'existe pas nous le pushons à la fin du tableau.
            productsSaveInStorage.push(selectProducts);
            localStorage.setItem("product", JSON.stringify(productsSaveInStorage));
            addmessage();
        }
    } else { 
        // sinon on push à notre variable de type tableau le produit selectionné de type Product            
        productsSaveInStorage.push(selectProducts);
        localStorage.setItem("product", JSON.stringify(productsSaveInStorage));
        addmessage();
    }
}

// fonction permettant de vérifier si un produit de la même id et couleur est présent de le localstorage 
function checkDataStorage(productsSaveInStorage) {
    for(item of productsSaveInStorage)
        {
        if (item.color == selectProducts.color && item.id == selectProducts.id) {
            item.quantity += selectProducts.quantity;
            return true;
        }
    }
}

//fonction renvoyant un message lors de l'ajout d'un produit au panier au panier
function addmessage(){
    alert(` Vous venez d'ajouter au panier ${selectProducts.quantity} camapé ${selectProducts.title} de la couleur ${selectProducts.color}`)
}

function quantityproductbasket(){
    let productsSave = JSON.parse(localStorage.getItem("product"));
    console.log(productsSave)
    productsq = []
    for (let product of productsSave){
        productq = product.quantity;        
        productsq.push(productq)
    }
    return productsq
}

function showQuantityBasket(){
    const ba = document.createElement("span");
    const basket = document.querySelector("li").appendChild(ba);
    const q = basket.insertBefore(ba, basket)
    q.innerHTML = quantityproductbasket();
}

showQuantityBasket();