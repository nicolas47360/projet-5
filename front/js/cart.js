const url = "http://localhost:3000/api/products/"
productsStorage = getProducts();

function API(id){
    fetch(url + id)
    .then((response) => response.json())
    .then((data) => {        
        return data
    })

}

for (product of productsStorage){
    fetch(url + product.id)
    .then((response) => response.json())
    .then((data) => {        
        console.log(data)
        console.log(data.price)
    })
}

// fonction permettant de sauvegarder les produits au format JSON dans le local storage
function saveProducts(product)
{

    localStorage.setItem("product", JSON.stringify(product));
}

// fonction permettant d'obtenir les produits contenus dans le local storage
function getProducts()
{    
    return JSON.parse(localStorage.getItem("product"));
}
//fonction permettant de calculer et d'afficher le prix total de l'ensemble des produits contenus dans le local storage
function getTotalPrice(){       
    let totalPrice = 0;
    for (let product of productsStorage)    
    {   
        fetch(url + product.id)
        .then((response) => response.json())
        .then((data) => {          
        totalPrice += data.price * product.quantity;
        const showPrice = document.getElementById('totalPrice');
        showPrice.innerHTML = totalPrice;              
    });
    }        
} 
// fonction permettant de supprimer un produit lors du click sur le bouton supprimer et suppression dans le local storage et rafraichisement de la page
function removeProducts ()
{   
    deleteProducts = document.getElementsByClassName('deleteItem');
    for ( let i = 0; i < deleteProducts.length; i++)
    {
        deleteProducts[i].addEventListener("click", (event) =>{
            event.preventDefault();            
            productsStorage.splice(i, 1);                     
            saveProducts(productsStorage);
            alert("le produit va être supprimé");
            window.location.reload();
        });      
    }   
}

//fonction permettant de modifier la quantité d'un produit lors du click et modification de la quantité dans le local storage et rafraichisement de la page
function replaceQuantity()
{
   let productsQuantity = document.getElementsByClassName('itemQuantity');
   for ( let q = 0; q < productsQuantity.length; q++)
       {            
        productsQuantity[q].addEventListener("change", (event) =>{
            event.preventDefault();
            console.log(productsQuantity.length);                      
            newproductsStorage = productsStorage.find(p => p.id == productsStorage[q].id && p.color == productsStorage[q].color);                        
            let newQuantity = parseInt(productsQuantity[q].value, 10);
            newproductsStorage.quantity = newQuantity;
            productsStorage[q] = newproductsStorage;
            saveProducts(productsStorage);
            window.location.reload();                                                               
            alert("la quantité va être modifié");            
              
        });      
    }    
}

//fonction permettant d'obtenir et d'afficher la quantité totale des produit contenus dans le local storage
function getQuantityProduct()
{        
    let totalQuantity = 0;
    for (let product of productsStorage)
    {
        totalQuantity += product.quantity;         
        const showQuantities = document.getElementById('totalQuantity');
        showQuantities.innerHTML = totalQuantity;             
    }
}

//fonction permettant l' affichage des données contenues dans le local storage
function showProducts(){    
    for (let product of productsStorage){ 
        fetch(url + product.id)
        .then((response) => response.json())
        .then((data) => {                                
        const cart= document.getElementById("cart__items");    
        cart__items.innerHTML +=`
        <article class="cart__item" data-id=${product.id} data-color="${product.color}">
        <div class="cart__item__img">
        <img src="${data.imageUrl}" alt="${data.altTxt}">
        </div>
        <div class="cart__item__content">
        <div class="cart__item__content__description">
            <h2>${data.name}</h2>
            <p>${product.color}</p>
            <p>${data.price + "€"}</p>
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
        getTotalPrice();
        getQuantityProduct();
        removeProducts();
        replaceQuantity();
        });
    }
}

showProducts();


//----------------------------FORMULAIRE----------------------------------------------------------

let validateName = /^[A-Za-z.-]{2,40}$/;
let validateEmail = /^[a-zA-Z0-9.-_+]+[@]{1}[a-zA-z0-9.-_]+[.]{1}[a-z]{2,10}$/;
let validateAddressCity = /^[A-Za-z-0-9éèê.,-\s]+$/;

const order = document.getElementById('order');
// évenement permettant l' envoi des produits, du formualire contact vers l'api au click du boutton avec gestion des erreurs de saisie du formulaire
order.addEventListener("click", (event) => {
    event.preventDefault();    
    const contact = {
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        address: document.getElementById("address").value,
        city: document.getElementById("city").value,
        email:document.getElementById("email").value,        
    };    
    //fonction permettant de gérer les erreurs de saisie du champ firstname 
    function regExpFirstName(){    
        const ValidfisrtName = contact.firstName;    
        const checkFirstName = document.getElementById('firstNameErrorMsg');    
        if ( validateName.test(ValidfisrtName))
        {
        
            return true
        }
        else{
            checkFirstName.innerHTML = "le Prénom n'est pas valide"
        }
    };
    //fonction permettant de gérer les erreurs de saisie du champ lastname 
    function regExpLastName(){    
        const ValidlastName = contact.lastName;    
        const checkLastName = document.getElementById('LastNameErrorMsg');    
        if ( validateName.test(ValidlastName))
        {
        
            return true
        }
        else{
            checkLastName.innerHTML = "le nom n'est pas valide"
        }
    };
    //fonction permettant de gérer les erreurs de saisie du champ address
    function regExpAddress(){    
        const adressValid = contact.address;    
        const checkadress = document.getElementById('addressErrorMsg');    
        if ( validateAddressCity.test(adressValid))
        {
        
            return true
        }
        else{
            checkadress.innerHTML = "l' adresse' n'est pas valide"
        }
    };
    //fonction permettant de gérer les erreurs de saisie du champ city
    function regExpCity(){    
        const cityValid = contact.city;    
        const checkcity = document.getElementById('cityErrorMsg');    
        if ( validateAddressCity.test(cityValid))
        {
        
            return true
        }
        else{
            checkcity.innerHTML = "le format du nom de la ville n'est pas valide"
        }
    };
    //fonction permettant de gérer les erreurs de saisie du champ email
    function regExpEmail(){    
        const emailValid = contact.email;    
        const checkemail = document.getElementById('emailErrorMsg');    
        if ( validateEmail.test(emailValid))
        {
        
            return true
        }
        else{
            checkemail.innerHTML = "l'adresse email n'est pas valide"
        }
    };
    //fonction permettant la validation des champs du formulaire avec un message en cas d'erreur de saisie
    function formCheck(){
        if( regExpFirstName() && regExpLastName() && regExpAddress() && regExpCity() && regExpEmail())
        {
            return true;
        }
        else{
            alert("Une erreue c'est produite, vos informations ne sont pas corectes,veuillez les vérifier ")
        }
            
    };    

    //fonction permettant de sauvegarder dans le local storage le contact et le id du produit
    function saveContactAndOrder(productOrder)
    {
        localStorage.setItem("productOrder", JSON.stringify(productOrder))
    };
    
    //fonction permettant de récupérer l'id des produits contenus dans le local storage
    function productId(){
        let products = [];    
        for( product of productsStorage){
            products.push(product.id);            
        }
        return products      
    }        
    const productOrder = {
        contact,
        products: productId(),
    }   
    saveContactAndOrder(productOrder);
    
    //fonction permettant d'envoyer les informations vers l'api si le formulaire est bien rempli
    function serverSend(){
        if(formCheck()){
            fetch("http://localhost:3000/api/products/order", {
                method: "POST",
                body : JSON.stringify(productOrder),
                headers: {            
                    "Content-Type": "application/json",
                }, 
                       
            })     
                .then((response) => response.json())
                .then((data) =>{
                    alert(`vous allez être rediriger vers la page de confiramtion`)
                    localStorage.clear();            
                    document.location.href = "confirmation.html"  + "?orderId=" + data.orderId; 
                });    
        }
    }
    serverSend()
    });    