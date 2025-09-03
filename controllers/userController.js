const asyncHandler = require("express-async-handler");
const db = require("../db/queries");
const ClientSideError = require("../errors/ClientSideError");

// GET - Render the new user registration form
exports.getNewUserForm = (req, res) => {
    res.render("users/new"); // This will render views/users/new.ejs
};

// POST - Create a new user
exports.createUser = asyncHandler(async (req, res) => {
    const { roll_number, name, email } = req.body;

    if (!roll_number || !name || !email) {
        throw new ClientSideError("All fields are required");
    }

    await db.insertUser({ roll_number, name, email });
    res.redirect("/"); // or redirect to a user list page
});

