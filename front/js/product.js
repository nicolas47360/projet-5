const url = "http://localhost:3000/api/products"
const params = new URLSearchParams(window.location.search);

let urlData  = params.get('id');

console.log(urlData);

fetch  (url + "/" + urlData)
    .then((Response) => Response.json())
    .then ((data) => {
        const image = document.getElementsByClassName('item_img');
        const title = document.getElementById('title');
        const price = document.getElementById('price');;
        const description = document.getElementById('description')       
        const colors = document.getElementById('colors');
        image.innerHtml = `<img src="${data.imageUrl}" alt="${data.altTxt}"`;        
        title.innerHTML = `${data.name}`;
        price.innerHTML = `${data.price}`;
        description.innerHTML =`${data.description}`;
        for (color in data.colors) {
            console.log(color)
            colors.options[colors.options.length] = new Option(data.colors[color])
        }
       
        
    })

