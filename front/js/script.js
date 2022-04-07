const url = "http://localhost:3000/api/products"


fetch(url)
    .then((Response) => Response.json())
    .then((data) => {
        for((product) of (data)){
            const items = document.getElementById('items');
            items.innerHTML +=` 
            <a href="./product.html?id=${product._id}">
            <article>
              <img src="${product.imageUrl}" alt="${product.altTxt}">
              <h3 class="productName">${product.name}</h3>
              <p class="productDescription">${product.description}</p>
            </article>
          </a>           `           
        };         
    }           
    
    )



