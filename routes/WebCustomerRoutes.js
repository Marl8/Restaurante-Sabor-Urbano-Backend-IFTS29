import express from 'express';
import { requireLogin, requireRole } from "../middlewares/AuthWeb.js";
const router = express.Router();

import { findData } from '../data/db.js';
import CustomerWebController from '../controllers/CustomerWebController.js';


// Proteger TODAS las rutas de customers (no es ia):
router.use(requireLogin);
router.use(requireRole("Admin", "Employee"));


router.get('/', (req, res) => {
    res.render('index', {title: 'Sabor Urbano'});
});
router.get('/customers', (req, res) => {
    const db = findData();
    res.render('customersViews/customers', { title: 'Clientes', customers: db.customer, query: req.query });
});
// ---  req.query al render ---
router.get('/customers/add', (req, res) => res.render('customersViews/addCustomer', {
    title: 'Agregar Cliente',
    query: req.query 
}));
router.get('/customers/list', CustomerWebController.listCustomersWeb);
router.get('/customers/update', CustomerWebController.showCustomerToEdit);
router.get('/customers/delete', CustomerWebController.showCustomerToDelete);

router.post('/customers/save', CustomerWebController.saveCustomerWeb);
router.post('/customers/update/:id', CustomerWebController.updateCustomerWeb);

router.delete('/customers/delete/:id', CustomerWebController.deleteCustomerWeb);


export default router;