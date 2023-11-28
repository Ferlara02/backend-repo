# backend-repo
API eCommerce genérico w/Express.

### Configuración
- Setear variables de entorno siguiendo el .envExample
- User con rol admin hardcodeado:
    - email: admin@coder.com
    - pass: admin1234

## Rutas
- #### Documentación:
    - /docs
- #### Vistas:
    - /products
    - /register
    - /login
    - /cart/:id
- #### Users:
    - **GET:**  /users/logout
        - Destruye la session.
    - **GET**  /users 
        - Devuelve array de users. 
    - **POST:**  /users/register 
        - Body: {
            first_name: string
            last_name: string
            email: string
            age: number
            password: string,
        }
    - **POST:**  /users/login
        - Body: {
            email: string,
            password: string
        }
    - **POST:**  /users/change-role/:id
        - Cambia el rol del usuario mandado por params a premium. Es necesario hacerlo estando logueado con un usuario admin.
    - **POST:**  /users/add/:idProd/quantity/:quantity
        - Agrega un producto específico, con una cantidad especificada por params, al carrito del usuario logueado.
    - **POST:**  /users/reset-pass
        - Se le envía un mail al usuario logueado con una redireccion para restablecer su contraseña.
    - **DELETE**  /users
        - Se eliminan todos los usuarios inactivos por más de dos días.
- #### Ticket checkout:
    - **POST:** /api/ticket
        - Se genera un ticket de compra en caso de que el carrito del usuario logueado tenga productos añadidos.
- #### Para ver las rutas de Products y Cart, ir a /docs
