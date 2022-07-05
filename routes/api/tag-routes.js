const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagsData = await Tag.findAll({
      include: {
        model: Product,
        attributes: ["id", "product_name", "price", "stock", "category_id"],
      },
    });

    if (!tagsData) {
      return res.status(404).json({ message: "No tags found!" });
    }

    return res.json(tagsData);
  } catch (error) {
    return res.status(500).json({ error: "Failed to retrieve tags!" });
  }
});

router.get("/:id", async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagsData = await Tag.findByPk(req.params.id, {
      include: [
        {
          model: Product,
          attributes: ["id", "product_name", "price", "stock", "category_id"],
        },
      ],
    });

    if (!tagsData) {
      return res.status(404).json({ message: "No tags with this ID found!" });
    }

    return res.json(tagsData);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Failed to retrieve tags with this ID!" });
  }
});

router.post("/", async (req, res) => {
  // create a new tag
  try {
    const newTag = await Tag.create(req.body);
    return res.json(newTag);
  } catch (error) {
    return res.status(500).json({ error: "Failed to new create tag!" });
  }
});

router.put("/:id", async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tagsData = await Tag.findByPk(req.params.id);

    if (!tagsData) {
      return res.status(404).json({ message: "No tags found!" });
    }

    await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    return res.json({ message: "Tags successfully updated." });
  } catch (error) {
    return res.status(500).json({ error: "Failed to update tags!" });
  }
});

router.delete("/:id", async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tagsData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    return res.status(200).json(tagsData);
  } catch (error) {
    return res.status(500).json(error);
  }
});

module.exports = router;