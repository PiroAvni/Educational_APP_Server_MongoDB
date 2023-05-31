const request = require('supertest')
const app = require('../app')
const Category = require('../models/categoryModel')

describe('api for category', () => {
  // success

  it('should respond with 200 ', async () => {
    const response = await request(app)
      .get('/api/category')
      .expect(200)
      .expect('Content-Type', /json/)
  })

  it('should respond with 200 ', async () => {
    const category = await Category.create({ name: 'Test Category' })
    const response = await request(app)
      .get(`/api/category/${category._id}`)
      .expect(200)
      .expect('Content-Type', /json/)
  })

  it('should respond with 201 success', async () => {
    const add = {
      name: 'Math',
    }
    const response = await request(app)
      .post('/api/category')
      .send(add)
      .expect('Content-Type', /json/)
      .expect(201)
  })

  it('should respond with 200 success', async () => {
    const category = await Category.create({ name: 'Test Category' })

    const update = {
      name: 'Math',
    }

    const response = await request(app)
      .patch(`/api/category/${category._id}`)
      .send(update)
      .expect('Content-Type', /json/)
      .expect(200)

    // verify that that the update has been sent
    const updatedCategory = await Category.findById(category._id)
    expect(updatedCategory).toBeTruthy()
  })

  it('should delete a category and respond with 204', async () => {
    // Create a new category in the database
    const category = await Category.create({ name: 'Test Category' })

    // Send a DELETE request to delete the category
    const response = await request(app)
      .delete(`/api/category/${category._id}`)
      .expect(204)

    // Verify that the category is deleted
    const deletedCategory = await Category.findById(category._id)
    expect(deletedCategory).toBeNull()
  })

  // fail

  // it('should respond fail with 500 when there are no categories ', async () => {
  //   const response = await request(app)
  //     .get('/api/category')
  //     .expect(500)
  //     .expect('{"error":"No categories have been found "}')
  // })

  it('responds to invalid get request with 400 if id is not found', async () => {
    const response = await request(app).get('/api/category/:id').expect(400)

    // Verify the error response
  })

  it('responds to invalid post method request with 400', async () => {
    const response = await request(app).post('/api/category').expect(400)
  })

  it('responds to invalid patch method request with 400', async () => {
    const response = await request(app).patch(`/api/category/:id`).expect(400)
  })

  it('responds to invalid delete method request with 400', async () => {
    const response = await request(app).delete(`/api/category/:id`).expect(400)
  })
})
