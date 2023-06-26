import fs from 'fs'

export default class ProductManager {
    constructor(path){
        this.path = path
    }

    async getProducts(){
        try {
            if(fs.existsSync(this.path)){
                const products = await fs.promises.readFile(this.path, 'utf-8')
                const productsJs = JSON.parse(products)
                return productsJs
            } else {
                return []
            }
        } catch (error) {
            console.log(error)
        }
    }

    async addProduct(obj){
        const product = {
            id: await this.#getID() + 1,
            ...obj,
            status: obj.status !== undefined ? obj.status : true
        }

        const prodExists = await this.#getProduct(product.code)

        try {
            if(!product.title || !product.description || !product.code || product.price == 0 || product.stock < 0 || !product.category || !product.thumbnails || !Array.isArray(product.thumbnails)){ 
                return console.log('Todos los campos son obligatorios')
            } else if (prodExists){
                return console.log('El codigo ya pertenece a otro producto')
            } else {
                const productsFile = await this.getProducts()

                productsFile.push(product)

                await fs.promises.writeFile(this.path, JSON.stringify(productsFile))

                console.log('Producto', product.title, 'Agregado con exito.')
            }
        } catch (error) {
            console.log(error)
        }
    }

    async #getID(){
        try{
            const productsFile = await this.getProducts()
            let maxId = 0;
            productsFile.map((product) => {
                if(product.id > maxId) maxId = product.id
            })
            return maxId
        } catch (error){
            console.log(error)
        }
    }


    async #getProduct(codeProd){
        try{
            const productsFile = await this.getProducts()
            return productsFile.find(prod => prod.code === codeProd)
        } catch (error){
            console.log(error)
        }
    }

    async getProductById(idProd){
        try{
            const productsFile = await this.getProducts()
            if(!productsFile.find(prod => prod.id === idProd)) {
                return 'Producto no encontrado';
            }
            return productsFile.filter(prod => prod.id === idProd)
        } catch (error) {
            console.log(error)
        }
    }

    async updateProduct(id, fieldsToUpdate) {
        try {
          const productsFile = await this.getProducts();
          const productIndex = productsFile.findIndex(prod => prod.id === id);
          
          if (productIndex === -1) {
            return console.log('Producto no encontrado');
          }
          
          const productToUpdate = productsFile[productIndex];

          const updatedProduct = { ...productToUpdate, ...fieldsToUpdate };
      
          productsFile[productIndex] = updatedProduct;
      
          await fs.promises.writeFile(this.path, JSON.stringify(productsFile));
      
          console.log('Producto actualizado con éxito: ', productsFile[productIndex]);
        } catch (error) {
          console.log(error);
        }
    }

    async deleteProduct(id) {
        try {
          const productsFile = await this.getProducts();

          const productIndex = productsFile.findIndex(prod => prod.id === id);
      
          if (productIndex === -1) {
            return console.log('Producto no encontrado');
          }
      
          productsFile.splice(productIndex, 1);
      
          await fs.promises.writeFile(this.path, JSON.stringify(productsFile));
      
          console.log('Producto eliminado con éxito.');

        } catch (error) {
          console.log(error);
        }
      }

}

// const productManager1 = new ProductManager('./products.json') //Instancio

// const test = async() => {
//     const getProducts = await productManager1.getProducts() 
//     console.log('Consulta 1', getProducts)

//     await productManager1.addProduct('Samsung', 'Celular samsung ...', 4000, 'https://...', 2023234, 200)

//     const getProducts2 = await productManager1.getProducts()
//     console.log('2da consulta: ', getProducts2)

//     const productById = await productManager1.getProductById(2)
//     console.log('Consulta Prod by id:2 ', productById)

//     const updateProduct1 = await productManager1.updateProduct(2, {
//         title: "Motorola",
//         description: "Celular motorola ...",
//         price: 60000
//     })

//     console.log(updateProduct1)

//     const deleteProduct1 = await productManager1.deleteProduct(2)
//     console.log(deleteProduct1)

// }

// test()






