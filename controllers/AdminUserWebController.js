import UserService from "../services/UserService.js";

const showUserMenu = (req, res) => {
  try {
    res.render("userViews/userMenu", {
      title: "Gestión de Usuarios",
      query: req.query || {},
      sessionUser: req.session.user, 
    });
  } catch (error) {
    res.status(500).render("errorView", {
      title: "Error",
      message: error.message,
      query: req.query || {},
    });
  }
};

const showAddUserForm = (req, res) => {
  try {
    res.render("userViews/addUser", {
      title: "Agregar Usuario",
      query: req.query || {},
      sessionUser: req.session.user,
    });
  } catch (error) {
    res.status(500).render("errorView", {
      title: "Error",
      message: error.message,
      query: req.query || {},
    });
  }
};

const saveUserWeb = async (req, res) => {
  try {
    await UserService.saveUser(req.body);
    res.redirect("/users/list");
  } catch (error) {
    const msg = encodeURIComponent(error.message);
    res.redirect(`/users/add?error=${msg}`);
  }
};

const listUsersWeb = async (req, res) => {
  try {
    let users = [];
    try {
      users = await UserService.findAllUsers();
    } catch (findError) {
      if (!findError.message.includes("No hay usuarios")) {
        throw findError;
      }
    }

    res.render("userViews/listUsers", {
      title: "Listado de Usuarios",
      users,
      query: req.query || {},
      sessionUser: req.session.user,
    });
  } catch (error) {
    console.error("Error al listar usuarios:", error);
    res.status(500).render("errorView", {
      title: "Error",
      message: "No se pudieron cargar los usuarios: " + error.message,
      query: req.query || {},
    });
  }
};

const showUserToEdit = async (req, res) => {
  const id = req.params.id;
  let user = null;
  let error = null;

  try {
    if (id) {
      user = await UserService.findUserById(id);
    }
  } catch (err) {
    error = err.message;
  }

  res.render("userViews/updateUser", {
    title: "Editar Usuario",
    id: id,
    user: user,      
    error: error,
    query: req.query || {},
    sessionUser: req.session.user,
  });
};

const updateUserWeb = async (req, res) => {
  try {
    const id = req.params.id;

    await UserService.updateUser(id, req.body);
    res.redirect("/users/list");
  } catch (error) {
    res.render("userViews/updateUser", {
      title: "Editar Usuario",
      error: error.message,
      user: { ...req.body, _id: req.params.id }, 
      query: req.query || {},
      sessionUser: req.session.user,
    });
  }
};

const showUserToDelete = async (req, res) => {
  const idToFind = req.params.id;
  let user = null;
  let error = null;

  try {
    if (!idToFind) {
      return res.redirect("/users");
    }

    user = await UserService.findUserById(idToFind);

    if (!user) {
      error = `Usuario con ID ${idToFind} no encontrado.`;
    }

    res.render("userViews/deleteUser", {
      title: "Eliminar Usuario",
      user: user,       
      error: error,
      query: req.query || {},
      sessionUser: req.session.user,
    });
  } catch (err) {
    res.render("userViews/deleteUser", {
      title: "Eliminar Usuario",
      error: err.message,
      user: null,
      query: req.query || {},
      sessionUser: req.session.user,
    });
  }
};

const deleteUserWeb = async (req, res) => {
  try {
    const id = req.params.id;
    await UserService.deleteUser(id);
    res.redirect("/users/list?success=eliminado");
  } catch (error) {
    const errorMessage = encodeURIComponent(error.message);
    res.redirect(`/users/delete?id=${req.params.id}&error=${errorMessage}`);
  }
};

const WebAdminUserController = {
  showUserMenu,
  showAddUserForm,
  listUsersWeb,
  saveUserWeb,
  showUserToEdit,
  updateUserWeb,
  showUserToDelete,
  deleteUserWeb,
};

export default WebAdminUserController;

