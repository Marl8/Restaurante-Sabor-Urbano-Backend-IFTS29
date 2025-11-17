import UserService from "../services/UserService.js";

const showLoginForm = (req, res) => {
    res.render("loginView/login");
};

const loginWeb = async (req, res) => {
    try {
        const { username, password } = req.body;

        const result = await UserService.loginUserWEB({ username, password });

        if (result.islogin) {
            req.session.user = result.user; // GUARDAMOS LA SESIÓN
            return res.redirect("/");
        }

    } catch (error) {
        res.render("loginView/login", { error: error.message });
    }
};

const logoutWeb = (req, res) => {
    req.session.destroy(() => {
        res.redirect("/login");
    });
};

export default {
    showLoginForm,
    loginWeb,
    logoutWeb
};
