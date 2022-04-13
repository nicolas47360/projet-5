const url = "http://localhost:3000/api/products"

const params = new URLSearchParams(window.location.search);

let urlData  = params.get('id');

//trécuperation de la data de l'api pour une id de produit avec injection dans le DOM
fetch  (url + "/" + urlData)
    .then((Response) => Response.json())
    .then ((data) => {
        const image = document.createElement("div")
        document.querySelector(".item__img").appendChild(image)
        const title = document.getElementById('title');
        const price = document.getElementById('price');
        const description = document.getElementById('description');       
        const colors = document.getElementById('colors');
        image.innerHTML = `<img src="${data.imageUrl}" alt="${data.altTxt}">`                    
        title.innerHTML = `${data.name}`;
        price.innerHTML = `${data.price}`;         
        description.innerHTML =`${data.description}`;
        // 
        for (color in data.colors) {            
            colors[colors.options.length] = new Option(data.colors[color])
        }        
    })

const addToCart = document.getElementById('addToCart');
const quantity = document.getElementById('quantity')
const colors = document.getElementById('colors')

// évenement permettant l'ajout des produits au click du boutton avec gestion ds quantités et des couleurs
addToCart.addEventListener("click", (event) => {
    event.preventDefault();
    if (
        quantity.value <= 0 || quantity.value > 100
    ){
        alert("La quantité selectionnée n'est pas valide")
    }

    if( colors.value == "")
    {
        alert("Veuillez séléctionnée une couleur")
    }
    const selectProducts = {
        id : urlData,
        color : colors.value,
        title : title.textContent,
        price : price.textContent,
        descritpion : description.textContent,
        quantity : quantity.value,
    }

    // local storage
    let productsSaveInStorage = JSON.parse(localStorage.getItem("products"));
    if ( productsSaveInStorage == null)
    {
        productsSaveInStorage = [];
        productsSaveInStorage.push(selectProducts);
        localStorage.setItem("products", JSON.stringify(productsSaveInStorage));
    } 
    
    else {
        for (i=0; i < productsSaveInStorage.length; i++)
        {
            if(productsSaveInStorage[i]._id == selectProducts._id && productsSaveInStorage[i].colors == colors.value)
            {
                 productsSaveInStorage.quantity++;
                 localStorage.setItem("products", JSON.stringify(productsSaveInStorage));
            }
            
            //else (productsSaveInStorage[i]._id != selectProducts._id && productsSaveInStorage[i]._id != selectProducts.color)
            //{
            //    productsSaveInStorage.push(selectProducts.color);
              //  localStorage.setItem("products", JSON.stringify(productsSaveInStorage));
            //}
        }

    }


    
})


