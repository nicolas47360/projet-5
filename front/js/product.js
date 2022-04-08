const url = "http://localhost:3000/api/products"

const params = new URLSearchParams(window.location.search);

let urlData  = params.get('id');

console.log(urlData);

fetch  (url + "/" + urlData)
    .then((Response) => Response.json())
    .then ((data) => {
        const image = document.getElementsByClassName('item_img');
        const title = document.getElementById('title');
        const price = document.getElementById('price');
        const description = document.getElementById('description');       
        const colors = document.getElementById('colors');
        image.innerHtml = `<img src="${data.imageUrl}" alt="${data.altTxt}"`;        
        title.innerHTML = `${data.name}`;
        price.innerHTML = `${data.price}`;
        
        description.innerHTML =`${data.description}`;
        for (color in data.colors) {            
            colors[colors.options.length] = new Option(data.colors[color])
        }        
    })

const addToCart = document.getElementById('addToCart');
const quantity = document.getElementById('quantity')
const colors = document.getElementById('colors')

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
    

    let productsSaveInStorage = JSON.parse(localStorage.getItem("products"));

    if(productsSaveInStorage){

    }
    else{
        productsSaveInStorage = [];
        productsSaveInStorage.push(selectProducts);
        localStorage.setItem("products", JSON.stringify(productsSaveInStorage));
    }
})


