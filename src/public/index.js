const socket = io();

const listContainer = document.getElementById('containerList')

listContainer.innerHTML = "<p>Hola</p>"

socket.on('products', (productsList) => {
    const productsRender = productsList.map((prod) => {
        return `<ul class="productoContainer">
                    <li class="title">${prod.title}</li>
                    <li>$${prod.price}</li>
                    <li>Stock: ${prod.stock}</li>
                </ul>`
    }).join(' ');
    listContainer.innerHTML = productsRender
})