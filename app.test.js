const request = require("supertest")
const app = require("./app")

describe("Todos API tests", () => {
  
  it('GET /todos -> array of todos', () => {
    return request(app)
      .get("/todos")
      .expect('Content-Type', /json/)
      .expect(200)
      .then(response => {
        expect(response.body).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              id: expect.any(Number),
              name: expect.any(String), completed: expect.any(Boolean)
            })
          ])
        )
      })
  })

  it("GET /todos/:id -> todo by id", () => {
    return request(app)
      .get("/todos/1")
      .expect('Content-Type', /json/)
      .expect(200)
      .then(response => {
        expect(response.body).toEqual(
          expect.objectContaining({
            id: expect.any(Number),
            name: expect.any(String), completed: expect.any(Boolean)
          })
        )
      })
  })

  it("GET /todos/:id -> 404 if not found", () => {
    return request(app)
      .get("/todos/12312342342")
      .expect(404)
  })

  it("POST /todos -> created a todo", () => {
    return request(app)
      .post("/todos")
      .send({
        name: 'do coding'
      })
      .expect('Content-Type', /json/)
      .expect(201)
      .then(response => {
        expect(response.body).toEqual(
          expect.objectContaining({
            name: 'do coding',
            completed: false
          })
        )
      })
  })

  it("POST /todos -- validates request body", () => {
    return request(app)
      .post("/todos")
      .send({ name: 34567 })
      .expect(400)
  })

})