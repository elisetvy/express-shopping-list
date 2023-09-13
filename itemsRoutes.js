const express = require("express");
const items = require("./fakeDb");
const router = new express.Router();

/** Return list of shopping items. */
router.get("/", function(req, res) {
  return res.json({items});
})

/** Accepts JSON body, adds item, and returns it. */
router.post("/", function(req, res) {
  const name = req.body.name;
  const price = req.body.price;
  return res.json({added: { name, price }});
})

/** Accepts JSON body, adds item, and returns it. */
router.get("/:name", function(req, res) {
  const itemName = req.params.name;

  for (const item of items) {
    if (item.name === itemName) {
      return res.json(item);
    }
  }
})