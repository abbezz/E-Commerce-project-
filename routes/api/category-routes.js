
const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoriesData = await Category.findAll({
      include: {
        model: Product,
      },
    });

    if (!categoriesData) {
      return res.status(404).json({ message: "No categories found!" });
    }

    return res.json(categoriesData);
  } catch (error) {
    return res.status(500).json({ error: "Failed to retrieve categories!" });
  }
});

router.get("/:id", async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoriesData = await Category.findByPk(req.params.id, {
      include: [
        {
          model: Product,
          attributes: ["id", "product_name", "price", "stock", "category_id"],
        },
      ],
    });

    if (!categoriesData) {
      return res
        .status(404)
        .json({ message: "No category with that ID found!" });
    }

    return res.json(categoriesData);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Failed to retrieve category with this ID!" });
  }
});

router.post("/", async (req, res) => {
  // create a new category
  try {
    const newCategory = await Category.create(req.body);
    return res.json(newCategory);
  } catch (error) {
    return res.status(500).json({ error: "Failed to create category!" });
  }
});

router.put("/:id", async (req, res) => {
  // update a category by its `id` value
  try {
    const updateCategory = await Category.findByPk(req.params.id);

    if (!updateCategory) {
      res.status(404).json({ message: "No category with this ID found!" });
    }
    await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    return res.json({ message: "Category has been successfully updated!" });
  } catch (error) {
    return res.status(500).json({ error: "Failed to update category!" });
  }
});

router.delete("/:id", async (req, res) => {
  // delete a category by its `id` value
  try {
    const category = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    return res.status(200).json(category);
  } catch (error) {
    return res.status(500).json(error);
  }
});

module.exports = router;