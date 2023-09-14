const request = require("supertest");
const items = require("./fakeDb");
const app = require("./app");

const cherry = { name: "cherry", price: "1.00" };

beforeEach(function () {
  items.items.push(cherry);
});

afterEach(function () {
  items.items = [];
});

/** GET /items - returns {items: []}. */

describe("GET /items", function () {
  it("Returns list of shopping items", async function () {
    const resp = await request(app).get("/items");

    expect(resp.body).toEqual({ items: [{ name: "cherry", price: "1.00" }] });
  });
});

/** POST /items - returns {added: {}}. */

describe("POST /items", function () {
  it("Creates a new item", async function () {
    const resp = await request(app)
      .post("/items")
      .send({
        name: "banana",
        price: "3.00"
      });

    expect(resp.statusCode).toEqual(201);
    expect(resp.body).toEqual({ added: { name: "banana", price: "3.00" } });
  });
});

/** GET /items/:name - returns single item. */

describe("GET /items/:name", function () {
  it("Returns single item", async function () {
    const resp = await request(app).get("/items/cherry");

    expect(resp.body).toEqual({ name: "cherry", price: "1.00" });
  });

  it("Returns 404 error if item is not found", async function () {
    const resp = await request(app).get("/items/banana");
    expect(resp.statusCode).toEqual(404);
    expect(resp.body).toEqual({
      "error": {
        "message": "banana was not found",
        "status": 404
      }
    });
  });
});

/** PATCH /items/:name - modifies item. */
//TODO: test only updating one thing
describe("PATCH /items/:name", function () {
  it("Modifies an item", async function () {
    const resp = await request(app)
      .patch("/items/cherry")
      .send({
        name: "durian",
        price: "5.00"
      });

    expect(resp.statusCode).toEqual(200);
    expect(resp.body).toEqual({
      updated: {
        name: "durian",
        price: "5.00"
      }
    });
  });

  it("Returns 404 if item not found", async function () {
    const resp = await request(app)
      .patch("/items/eggplant")
      .send({
        name: "fig",
        price: "2.00"
      });

    expect(resp.statusCode).toEqual(404);
    expect(resp.body).toEqual({
      "error": {
        "message": "eggplant was not found",
        "status": 404
      }
    });

  });
});

/** DELETE /items/:name - deletes item. */

describe("DELETE /items/:name", function () {
  it("deletes an item", async function () {
    console.log("items array=", items.items)
    const resp = await request(app).delete("/items/cherry");

    // expect(resp.statusCode).toEqual(200);
    expect(resp.body).toEqual({ message: "Deleted" });
  });

  it("Returns 404 if item not found", async function () {
    const resp = await request(app)
      .delete("/items/grapefruit");

    expect(resp.statusCode).toEqual(404);
    expect(resp.body).toEqual({
      "error": {
        "message": "grapefruit was not found",
        "status": 404
      }
    });

  });
});