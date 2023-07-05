const socket = io();

const listContainer = document.getElementById('containerList')

listContainer.innerHTML = "<p>Hola</p>"

const productCard = (prod) => {
    `<ul class="productoContainer">
        <li class="title">${prod.title}</li>
        <li>$${prod.price}</li>
        <li>Stock: ${prod.stock}</li>
    </ul>`
}
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

socket.on('product:added', ({products, newProduct}) => {
    listContainer.innerHTML = products.map((prod) => {
        return `<ul class="productoContainer">
                    <li class="title">${prod.title}</li>
                    <li>$${prod.price}</li>
                    <li>Stock: ${prod.stock}</li>
                </ul>`
    }).join(' ');
    console.log(`Producto ${newProduct.title} agregado con éxito`)
})
socket.on('product:deleted', ({products, prodExists}) => {
    listContainer.innerHTML = products.map((prod) => {
        return `<ul class="productoContainer">
                    <li class="title">${prod.title}</li>
                    <li>$${prod.price}</li>
                    <li>Stock: ${prod.stock}</li>
                </ul>`
    }).join(' ');
    console.log(`Producto ${prodExists.title} eliminado con éxito`)
})