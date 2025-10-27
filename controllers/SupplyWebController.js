import SupplyService from '../services/SupplyService.js';


const showSupplyMenu = (req, res) => {
  try {
    res.render('supplyViews/supplyMenu', {
      title: 'Insumos',
      query: req.query
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const showAddSupplyForm = (req, res) => {
  try {
    res.render('supplyViews/addSupply', {
      title: 'Agregar Insumo',
      query: req.query
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const saveSupplyWeb = async (req, res) => {
    try {
        const newSupply = await SupplyService.saveSupply(req.body);
        
        const successMessage = `Insumo ${newSupply._id} guardado con éxito`;
        
        res.redirect(`/supplies?success=${encodeURIComponent(successMessage)}`);
    } catch (err) {
        const errorMessage = encodeURIComponent(err.message);
        res.redirect(`/supplies/add?error=${errorMessage}`);
    }
};

const listSuppliesWeb = async (req, res) => {
  try {
    let supplys = [];
    try {
      supplys = await SupplyService.findSupplies();
    } catch (findError) {
      if (!findError.message.includes('No hay insumos')) throw findError;
    }

    res.render('supplyViews/listSupplies', {
      title: 'Listado de Insumos',
      supplys,
      query: req.query
    });
  } catch (error) {
    console.error("Error al listar los insumos:", error);
    res.status(500).render('errorView', {
      title: "Error",
      message: "No se pudieron cargar los insumos: " + error.message,
      query: req.query
    });
  }
};

const showSupplyToEdit = async (req, res) => {
    const id = req.query.id;
    let supply = null;
    let error = null;
    try {
        supply = await SupplyService.findSupplyById(id);
    } catch (err) {
        error = err.message;
        }
    res.render('supplyViews/updateSupply', { id, supply, error });
};

//Actualiza para WEB
const updateSupplyWeb = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await SupplyService.updateSupply(id, req.body);

        if (result.error) {
            return res.render('supplyViews/updatedSupply', { 
                title: 'Editar Supply', 
                error: result.error,
                supply: { ...req.body, id }
            });
        }
        res.redirect(`/supplies?success=${encodeURIComponent(result.message)}`);
    } catch (error) {
        throw new Error(error.message);
    }     
};

const showSupplyToDelete = async (req, res) => {
  const idToFind = req.query.id;
  let supply = null;
  let error = null;

  try {
    if (!idToFind) return res.redirect('/supplies/list');

    supply = await SupplyService.findSupplyById(idToFind);
    if (!supply) error = `Insumo con ID ${idToFind} no encontrado.`;

    res.render('supplyViews/deleteSupply', {
      title: 'Eliminar Insumo',
      supply,
      error,
      query: req.query
    });
  } catch (err) {
    res.render('supplyViews/deleteSupply', {
      error: err.message,
      supply: null,
      query: req.query
    });
  }
};

const deleteSupplyWeb = async (req, res) => {
  try {
    const id = req.params.id;
    await SupplyService.deleteSupply(id);
    res.redirect('/supplies/list?success=eliminado');
  } catch (error) {
    const errorMessage = encodeURIComponent(error.message);
    res.redirect(`/supplies/delete?id=${req.params.id}&error=${errorMessage}`);
  }
};

const SupplyWebController = {
  showSupplyMenu,
  saveSupplyWeb,
  showSupplyToEdit,
  updateSupplyWeb,
  showAddSupplyForm,
  listSuppliesWeb,
  showSupplyToDelete,
  deleteSupplyWeb
};

export default SupplyWebController;