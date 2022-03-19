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
              name: expect.any(String),
              completed: expect.any(Boolean)
            })
          ])
        )
      })
  })

  it("GET /todos/:id -> todo by id", () => {
    const id = 1
    return request(app)
      .get(`/todos/${id}`)
      .expect('Content-Type', /json/)
      .expect(200)
      .then(response => {
        expect(response.body).toEqual(
          expect.objectContaining({
            id: id,
            name: expect.any(String),
            completed: expect.any(Boolean)
          })
        )
      })
  })

  it("GET /todos/:id -> 404 if not found", () => {
    const notExistingId = 12312342342
    return request(app)
      .get(`/todos/${notExistingId}`)
      .expect(404)
  })

  it("POST /todos -> created a todo", () => {
    const name = 'do coding'
    return request(app)
      .post("/todos")
      .send({
        name: name
      })
      .expect('Content-Type', /json/)
      .expect(201)
      .then(response => {
        expect(response.body).toEqual(
          expect.objectContaining({
            id: expect.any(Number),
            name: name,
            completed: false
          })
        )
      })
  })

  it("POST /todos -- validates request body", () => {
    const wrongTypedName = 34567
    return request(app)
      .post("/todos")
      .send({ name: wrongTypedName })
      .expect(400)
  })

})