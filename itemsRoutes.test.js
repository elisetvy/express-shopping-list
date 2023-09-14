const request = require("supertest");
const items = require("./fakeDb");
const app = require("./app");

let cherry = {name: "cherry", price: "1.00"}

beforeEach(function() {
  items.items.push(cherry);
})

afterEach(function() {
  items.items = [];
})

/** GET /items - returns {items: []}. */

describe("GET /items", function() {
  it("Returns list of shopping items", async function() {
    const resp = await request(app).get("/items");

    expect(resp.body).toEqual({items:[{name: "cherry", price: "1.00"}]});
  });
});

/** POST /items - returns {added: {}}. */

describe("POST /items", function() {
  it("Creates a new item", async function() {
    const resp = await request(app)
    .post("/items")
    .send({
      name: "banana",
      price: "3.00"
    });

    expect(resp.statusCode).toEqual(201);
    expect(resp.body).toEqual({added:{name: "banana", price: "3.00"}});
  });
});

/** GET /items/:name - returns single item. */

describe("GET /items/:name", function() {
  it("Returns single item", async function() {
    const resp = await request(app).get("/items/cherry");

    expect(resp.body).toEqual({name: "cherry", price: "1.00"});
  });

  it("Returns 404 error if item is not found", async function() {
    const resp = await request(app).get("/items/banana");
    expect(resp.statusCode).toEqual(404);
    expect(resp.body).toEqual({
      "error": {
        "message": "banana was not found",
        "status": 404
      }
    })
  });
});