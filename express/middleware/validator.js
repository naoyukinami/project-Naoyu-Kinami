import validator from "validator";

function validateUser(req, res, next) {
    res.locals.errors = res.locals.errors || [];

    //user
    const emailValue = req.body.email;
    const validEmail = validator.normalizeEmail(emailValue);


    if (!validator.isEmail(validEmail || "")) {
        res.locals.errors.push({
            field: "email",
            message: "Invalid email format."
        });
    }

    next();
}

function validateFavorite(req, res, next) {
        //favorite
    const { user_id, neighbourhood_id } = req.body;

    if (!user_id || !neighbourhood_id) {
        res.status(400).json({ error: "both id required" });
        return;
    }

    next();
}


export { validateUser, validateFavorite };