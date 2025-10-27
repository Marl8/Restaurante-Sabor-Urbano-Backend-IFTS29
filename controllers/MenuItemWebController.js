import MenuItemService from "../services/MenuItemService.js";
import Supply from "../models/Supply.js";

const showMenu = (req, res) => {
  try {
    res.render("menuItemsViews/menuItemsMenu", {
      title: "Gestión de Menú",
      query: req.query,
    });
  } catch (error) {
    res.status(500).render("errorView", {
      title: "Error",
      message: error.message,
      query: req.query,
    });
  }
};

const listMenuItemsWeb = async (req, res) => {
  try {
    const { action } = req.query;
    const menuItems = await MenuItemService.findMenuItems();

    if (action === "edit") {
      return res.render("menuItemsViews/listMenuItems", {
        title: "Editar Ítem del Menú",
        menuItems,
        query: req.query,
        action: "edit"
      });
    }
    if (action === "delete") {
      return res.render("menuItemsViews/listMenuItems", {
        title: "Eliminar Ítem del Menú",
        menuItems,
        query: req.query,
        action: "delete"
      });
    }

    res.render("menuItemsViews/listMenuItems", {
      title: "Listado de Ítems del Menú",
      menuItems,
      query: req.query,
      action: null
    });

  } catch (error) {
    console.error("Error al listar ítems:", error);
    res.status(500).render("errorView", {
      title: "Error al listar ítems",
      message: error.message,
      query: req.query,
    });
  }
};

const showAddForm = async (req, res) => {
  try {
    const supplies = await Supply.find();
    res.render("menuItemsViews/addMenuItem", {
      title: "Agregar Ítem al Menú",
      supplies,
      error: null,
      oldData: {},
      query: req.query,
    });
  } catch (error) {
    res.render("menuItemsViews/addMenuItem", {
      title: "Agregar Ítem al Menú",
      supplies: [],
      error: error.message,
      oldData: {},
      query: req.query,
    });
  }
};

const saveMenuItemWeb = async (req, res) => {
  try {
    const { name, price, category, stock } = req.body;
    let supplies = req.body.supplies;
    if (!supplies) {
      supplies = [];
    } else if (!Array.isArray(supplies)) {
      supplies = [supplies];
    }

    await MenuItemService.saveMenuItem({
      name,
      price,
      category,
      stock,
      supplies,
    });

    res.redirect("/menuItems/list?success=Ítem agregado con éxito");
  } catch (error) {
    console.error("Error al guardar ítem:", error);
    const supplies = await Supply.find();
    res.render("menuItemsViews/addMenuItem", {
      title: "Agregar Ítem al Menú",
      supplies,
      error: error.message,
      oldData: req.body,
      query: req.query,
    });
  }
};

const showMenuItemToEdit = async (req, res) => {
  try {
    const id = req.query.id;
    const menuItem = await MenuItemService.findMenuItemById(id);
    const supplies = await Supply.find();

    res.render("menuItemsViews/updateMenuItem", {
      title: "Editar Ítem del Menú",
      menuItem,
      supplies,
      error: null,
      query: req.query,
    });
  } catch (error) {
    res.render("menuItemsViews/updateMenuItem", {
      title: "Editar Ítem del Menú",
      menuItem: null,
      supplies: [],
      error: error.message,
      query: req.query,
    });
  }
};

const updateMenuItemWeb = async (req, res) => {
  try {
    const { id } = req.params;
    let { name, price, category, stock, supplies } = req.body;

    if (!supplies) {
      supplies = [];
    } else if (!Array.isArray(supplies)) {
      supplies = [supplies]; 
    }
    const suppliesArray = supplies.filter(s => s && s.trim());
    const result = await MenuItemService.updateMenuItem(id, {
      name,
      price,
      category,
      stock,
      supplies: suppliesArray,
    });

    if (result.error) throw new Error(result.error);

    res.redirect("/menuItems/list?success=Ítem actualizado con éxito");
  } catch (error) {
    console.error("Error al actualizar ítem:", error);
    const supplies = await Supply.find();
    res.render("menuItemsViews/updateMenuItem", {
      title: "Editar Ítem del Menú",
      error: error.message,
      supplies,
      menuItem: req.body,
      query: req.query,
    });
  }
};

const showMenuItemToDelete = async (req, res) => {
  try {
    const id = req.query.id;
    const menuItem = await MenuItemService.findMenuItemById(id);

    res.render("menuItemsViews/deleteMenuItem", {
      title: "Eliminar Ítem del Menú",
      menuItem,
      error: null,
      query: req.query,
    });
  } catch (error) {
    res.render("menuItemsViews/deleteMenuItem", {
      title: "Eliminar Ítem del Menú",
      menuItem: null,
      error: error.message,
      query: req.query,
    });
  }
};

const deleteMenuItemWeb = async (req, res) => {
  try {
    await MenuItemService.deleteMenuItem(req.params.id);
    res.redirect("/menuItems/list?success=Ítem eliminado con éxito");
  } catch (error) {
    const errorMessage = encodeURIComponent(error.message);
    res.redirect(`/menuItems/delete?id=${req.params.id}&error=${errorMessage}`);
  }
};

const MenuItemWebController = {
  showMenu,
  listMenuItemsWeb,
  showAddForm,
  saveMenuItemWeb,
  showMenuItemToEdit,
  updateMenuItemWeb,
  showMenuItemToDelete,
  deleteMenuItemWeb,
};

export default MenuItemWebController;
