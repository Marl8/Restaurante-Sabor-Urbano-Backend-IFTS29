<h2 align="center"> 🍽️ Proyecto Restaurante Sabor Urbano 🍽️ </h2>

<br>

Proyecto realizado en el marco de la cursada de la materia Backend del 2º cuatrimiestre del segundo año de la carrera 
Tecnicatura Superior en Desarollo de Software impartida por el IFTS Nº 29.

El proyecto consiste en una aplicación web desarrollada en el entorno de ```Node.js``` con ```Express```, utilizando plantillas ```Pug``` y ```MongoDB Atlas``` como base de datos.

Además, la aplicación está diseñada para ser consumida como una API por servicios de terceros, a través de los endpoints correspondientes.

El proceso de autenticación y autorización se ha implementado utilizando ```Sessions``` para las plantillas Pug y ```JWT``` para la API REST.

### Requerimientos y análisis.

- **Tipo de empresa**: Restaurante con servicio de delivery.
- **Descripción del negocio**: Sabor Urbano es un restaurante de comida rápida y saludable
que, además de su local, ha visto un crecimiento significativo en sus pedidos a través de
plataformas de terceros (como Rappi o PedidosYa) y de su propio servicio de delivery.
- **Procesos de Negocio**: Incluyen la toma de pedidos presenciales y por delivery, la gestión
del inventario de insumos, la preparación de los platos y la coordinación con los repartidores.
- **Solución propuesta**: Un sistema integral de gestión de pedidos (POS - Point of Sale) que
unifique la adminstración de pedidos en una sola interfaz. Este sistema permitiría
automatizar la impresión de comandas, integrar el control de inventario para una
actualización en tiempo real del menú, y ofrecer un panel de control para seguir el estado de
cada pedido y el desempeño de los repartidores.

### Diagrama Relacional

<img width="810" height="752" alt="Restaurante Sabrores Urbanos" src="https://github.com/user-attachments/assets/85e49bb2-9a36-4fe3-9a15-0c4f4deee1bc" />

### ESTRUCTURA DEL PROYECTO

```text
├── controllers/
├── services/ 
├── routes/ 
├── data/ 
├── middlewares/
├── models/ 
├── tests/ 
├── views/ 
├── index.js 
└── README.md 
```

### INSTALACIÓN

**1.** Clonar el repositorio:
```shell
git clone
``` 
**2.** Instalar dependencias:
```shell
npm install
```
**3.** Crear un archivo .env con las siguientes variables de entorno:
- ````PORT````
- ````MONGO_URI````
- ````JWT_SECRET````
- ````SESSION_SECRET````

**4.** Ejecutar el servidor:
```shell
node index.js
```

### DEPENDENCIAS UTILIZADAS

```text
- Express
- Pug
- Mongoose
- Bcrypt
- Dotenv
- Jsonwebtoken
- Express-session
- Jest
```

### Deploy de la aplicación en Render

https://aplicacionsu.onrender.com/login
