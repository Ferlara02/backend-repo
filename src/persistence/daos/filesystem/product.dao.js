import fs from 'fs'

export default class ProductManager {
    constructor(path){
        this.path = path
    }

    async getAll(){
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

    async create(obj){
        try {
            const product = {
                id: await this.#getID() + 1,
                ...obj,
                status: obj.status !== undefined ? obj.status : true
            }
            const prodExists = await this.#getProduct(product.code)
    
            if(!product.title || !product.description || !product.code || product.price == 0 || product.stock < 0 || !product.category || !Array.isArray(product.thumbnails)){ 
                return console.log('Todos los campos son obligatorios')
            } else if (prodExists){
                return console.log('El codigo ya pertenece a otro producto')
            } else {
                const productsFile = await this.getAll()

                productsFile.push(product)

                await fs.promises.writeFile(this.path, JSON.stringify(productsFile))

                return console.log('Producto', product.title, 'Agregado con exito.')
            }
        } catch (error) {
            console.log(error)
        }
    }

    async #getID(){
        try{
            const productsFile = await this.getAll()
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
            const productsFile = await this.getAll()
            return productsFile.find(prod => prod.code === codeProd)
        } catch (error){
            console.log(error)
        }
    }

    async getById(idProd){
        try{
            const productsFile = await this.getAll()
            if(!productsFile.find(prod => prod.id === idProd)) {
                return 'Producto no encontrado';
            }
            return productsFile.find(prod => prod.id === idProd)
        } catch (error) {
            console.log(error)
        }
    }

    async update(id, fieldsToUpdate) {
        try {
          const productsFile = await this.getAll();
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

    async delete(id) {
        try {
          const productsFile = await this.getAll();
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






