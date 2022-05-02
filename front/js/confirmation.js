const confirmation = document.getElementById('orderId');
const getOrderId = new URLSearchParams(window.location.search);
const productID = getOrderId.get("name")
confirmation.textContent = productID;