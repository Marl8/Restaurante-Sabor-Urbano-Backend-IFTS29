import express from 'express';
import dotenv from "dotenv";
import methodOverride from 'method-override';
import CustomerRoutes from './routes/CustomerRoutes.js';
import WebCustomerRoutes from './routes/WebCustomerRoutes.js';
import SupplyRoutes from './routes/SupplyRoutes.js';
import DeliveryOrderRoutes from './routes/DeliveryOrderRoutes.js';
import WebDeliveryRoutes from './routes/WebDeliveryRoutes.js';
import MenuItemRoutes from './routes/MenuItemRoutes.js';
import RiderRoutes from './routes/RiderRoutes.js';
import UserRoutes from './routes/UserRoutes.js';
import { connectDB } from './data/MongoConnection.js';
import WebRiderRoutes from './routes/WebRiderRoutes.js';
import WebSupplyRoutes from './routes/WebSupplyRoutes.js';
import WebMenuItemsRoutes from './routes/WebMenuItemsRoutes.js';
import UserWebRoutes from "./routes/WebUserRoutes.js";
import WebAdminUserRoutes from "./routes/WebAdminUserRoutes.js"
import session from "express-session";
//import MongoStore from "connect-mongo";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use(methodOverride('_method'));



app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

// Middleware para hacer disponible el usuario en las vistas PUG
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});

app.set('view engine', 'pug');
app.set('views', './views');

//Rutas API
app.use('/api/menu', MenuItemRoutes);
app.use('/api/customer', CustomerRoutes);
app.use('/api/delivery-orders', DeliveryOrderRoutes);
app.use('/api/supply', SupplyRoutes);
app.use('/api/rider', RiderRoutes);
app.use('/api/user', UserRoutes);

//Rutas Web

app.use('/', UserWebRoutes); 
app.use('/', WebCustomerRoutes); 
      
app.use('/delivery', WebDeliveryRoutes); 
app.use('/riders', WebRiderRoutes);
app.use('/supplies', WebSupplyRoutes);
app.use('/menuItems', WebMenuItemsRoutes);
app.use('/users', WebAdminUserRoutes);

app.listen(PORT, ()=>{
    connectDB();
    console.log(`servidor OK en el puerto ${PORT}`);
});