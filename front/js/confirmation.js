const order = document.getElementById('orderId');
const params = new URLSearchParams(document.location.search);
console.log(params)
let url = params.get("orderId");
order.innerHTML = url;