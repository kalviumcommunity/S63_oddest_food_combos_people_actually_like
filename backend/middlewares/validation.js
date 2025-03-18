const validateFoodCombo = (req, res, next) => {
    const { name, ingredients, description, image } = req.body;

    if (!name || typeof name !== "string" || name.trim().length < 3 || name.trim().length > 100) {
        return res.status(400).json({ message: "Name must be between 3 and 100 characters." });
    }

    if (!Array.isArray(ingredients) || ingredients.length < 2 || !ingredients.every(item => typeof item === "string" && item.trim().length > 0)) {
        return res.status(400).json({ message: "Ingredients must be an array with at least two non-empty strings." });
    }

    if (description && (typeof description !== "string" || description.trim().length < 10 || description.trim().length > 500)) {
        return res.status(400).json({ message: "Description must be between 10 and 500 characters." });
    }

    if (image && typeof image !== "string") {
        return res.status(400).json({ message: "Image must be a valid URL string." });
    }

    next();
};

module.exports = { validateFoodCombo };
