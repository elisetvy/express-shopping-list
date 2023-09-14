const express = require("express");
const items = require("./fakeDb");
const { NotFoundError } = require("./expressError")
const router = new express.Router();

/** Return list of shopping items. */
router.get("/", function (req, res) {
  return res.json(items);
});

/** Accepts JSON body, adds item, and returns it. */
router.post("/", function (req, res) {
  const name = req.body.name;
  const price = req.body.price;
  const newItem = { name, price };
  items.items.push(newItem);
  return res.status(201).json({ added: newItem });
});

/** Returns single item. */
router.get("/:name", function (req, res) {
  const itemName = req.params.name;

  for (const item of items.items) {
    if (item.name === itemName) {
      return res.json(item);
    }
  }

  throw new NotFoundError(`${itemName} was not found`)
});

/** Accepts JSON body, modifies item, and returns it. */
router.patch("/:name", function (req, res) {
  const itemName = req.params.name;

  const newName = req.body.name;
  const newPrice = req.body.price;

  for (const item of items.items) {
    if (item.name === itemName) {
      item.name = newName;
      item.price = newPrice;
      return res.json({updated: item});
    }
  }

  throw new NotFoundError(`${itemName} was not found`)
});

/** Deletes items, returns JSON confirming deletion */
router.delete("/:name", function (req, res) {
  const itemName = req.params.name;

  for (let i=0; i<items.items.length; i++) {
    if (items.items[i].name === itemName) {
      items.items.splice(i, 1)

      return res.json({message: "Deleted"});
    }
  }

  throw new NotFoundError(`${itemName} was not found`)
});

module.exports = router;