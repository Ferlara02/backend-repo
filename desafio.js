class ProductManager {
    constructor(){
        this.products = []
    }

    addProduct(title, description, price, thumbnail, code, stock){
        const  product = {
            id: this.#getID() + 1,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }
        const valuesProd = Object.values(product)
        if(valuesProd.includes(undefined)){
           return console.log('Todos los campos son obligatorios')
        }else if(this.#getProduct(code)){
           return console.log('El codigo ya pertenece a otro producto')
        }else{
            this.products.push(product)
        }
    }

    #getID(){
        let maxId = 0;
        this.products.map((product) => {
            if(product.id > maxId) maxId = product.id
        })
        return maxId
    }
    #getProduct(codeProd){
        return this.products.find(prod => prod.code === codeProd)
    }
    getProducts(){
        return this.products
    }
    getProductById(idProd){
        if(!this.products.find(prod => prod.id === idProd)){
            return 'Producto no encontrado';
        }
        return this.products.filter(prod => prod.id === idProd)
    }

}

const productManager1 = new ProductManager() //Instancio

console.log('Array vacio: ', productManager1.getProducts()) //Array vacio

productManager1.addProduct('Producto Prueba', 'This is a trial product', 200, 'Sin imagen', 25) //le falta un parametro, devuelve primer condicional

console.log('Producto prueba: ', productManager1.getProducts()) //Array vacío

productManager1.addProduct('Producto Prueba', 'This is a trial product', 200, 'Sin imagen', 25, 200) //Push

console.log('1 Producto: ', productManager1.getProducts()) //Devuelve prod de prueba.

productManager1.addProduct('Producto Prueba', 'This is a trial product', 200, 'Sin imagen', 25, 200) //Agrego prod con mismo code que el anterior, devuelve 2do condicional

productManager1.addProduct('Celular', 'Smartphone con 8gb RAM, 256gb ROM', 100000, 'https://etc', 26, 100)

console.log('Celular: ', productManager1.getProductById(2))







