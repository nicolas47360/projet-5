const url = "http://localhost:3000/api/products"

const params = new URLSearchParams(window.location.search);

let urlData  = params.get('id');

//instancition d'u  objet prennant plusieurs paramétres
class Product {
    constructor(id, color, title, price, description, quantity) {
        this.id = id;
        this.color = color;
        this.title = title;
        this.price = price;
        this.description = description;
        this.quantity = parseInt(quantity, 10);
    }
}

//récuperation de la data de l'api pour une id de produit avec injection dans le DOM
fetch  (url + "/" + urlData)
    .then((Response) => Response.json())
    .then ((data) => {
        const image = document.createElement("div");
        document.querySelector(".item__img").appendChild(image);
        const title = document.getElementById('title');
        const price = document.getElementById('price');
        const description = document.getElementById('description');       
        const colors = document.getElementById('colors');
        image.innerHTML = `<img src="${data.imageUrl}" alt="${data.altTxt}">`;                  
        title.innerHTML = `${data.name}`;
        price.innerHTML = `${data.price}`;         
        description.innerHTML =`${data.description}`;
        // 
        for (color in data.colors) {            
            colors[colors.options.length] = new Option(data.colors[color]);
        }        
    })

const addToCart = document.getElementById('addToCart');
const quantity = document.getElementById('quantity');
const colors = document.getElementById('colors');

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
        selectProducts = new Product(urlData, colors.value, title.textContent, price.textContent, description.textContent, quantity.value);
        addProductsInStorage(selectProducts);
    }

    // function qui ajoute un produit au local storage
    function addProductsInStorage(selectProducts)
    {
        productsSaveInStorage = []; // on instancie un tableau vide
        if (localStorage.getItem("products")) 
        { // si il y a un produit dans le local storage
            productsSaveInStorage = JSON.parse(localStorage.getItem("products"));
            if(checkDataStorage(productsSaveInStorage)) 
            { // on passe le tableau dans une fonction qui va boucler sur le tableau de products et += la quantité si il trouve un produit déjà existant
                localStorage.setItem("products", JSON.stringify(productsSaveInStorage));
                addmessage();
            } 
            else { // si ce produit n'existe pas nous le pushons à la fin du tableau.
                productsSaveInStorage.push(selectProducts);
                localStorage.setItem("products", JSON.stringify(productsSaveInStorage));
                addmessage();
            }
        } else { 
            // sinon on push à notre variable de type tableau le produit selectionné de type Product, 
            // travailler avec un tableau va nous permettre ensuite de pouvoir boucler dessus 
            // nous somme à présent sur un Array as JSON https://www.w3schools.com/js/js_json_parse.asp
            productsSaveInStorage.push(selectProducts);
            localStorage.setItem("products", JSON.stringify(productsSaveInStorage));
            addmessage();
        }
    }

    function checkDataStorage(productsSaveInStorage) {
        for(item of productsSaveInStorage)
         {
            if (item.color == selectProducts.color && item.id == selectProducts.id) {
                item.quantity += selectProducts.quantity;
                return true;
            }
        }
    }

    function addmessage(){
        window.alert(` Vous venez d'ajouter au panier ${selectProducts.quantity} camapé ${selectProducts.title} de la couleur ${selectProducts.color}`)
    }
});

