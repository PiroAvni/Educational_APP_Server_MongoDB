const request = require('supertest')
const app = require('../app')
const Bookmarks = require('../models/Bookmarks')

describe('api for bookmarks', () => {
  it('should respond with 200 ', async () => {
    const response = await request(app)
      .get('/api/bookmarks')
      .expect(200)
      .expect('Content-Type', /json/)
  })

  it('should respond with 200 ', async () => {
    const bookmarks = await Bookmarks.create({
      userID: '647861ff3a6dfac87958e1fc',
      cardID: '64777a00add240e7f5e87824',
    })
    const response = await request(app)
      .get(`/api/bookmarks/${bookmarks._id}`)
      .expect(200)
      .expect('Content-Type', /json/)
  })

  it('should respond with 201 success', async () => {
    const add = {
      userID: '647861ff3a6dfac87958e1fc',
      cardID: '64777a00add240e7f5e87824',
    }
    const response = await request(app)
      .post('/api/bookmarks')
      .send(add)
      .expect('Content-Type', /json/)
      .expect(201)
  })

  //   it('should respond with 200 success', async () => {
  //     const bookmarks = await Bookmarks.create({ userID: '647861ff3a6dfac87958e1fc', cardID: '64777a00add240e7f5e87824' })

  //     const update = {
  //       userID: '647861ff3a6dfac87958e1gc', cardID: '64777a00add240e7f5e87834',
  //     }

  //     const response = await request(app)
  //       .patch(`/api/bookmarks/${bookmarks._id}`)
  //       .send(update)
  //       .expect('Content-Type', /json/)
  //       .expect(200)

  //     // verify that that the update has been sent
  //     const updatedBookmarks = await Bookmarks.findById(bookmarks._id)
  //     expect(updatedBookmarks).toBeTruthy()
  //   })

  it('should delete a bookmarks and respond with 204', async () => {
    // Create a new bookmarks in the database
    const bookmarks = await Bookmarks.create({
      userID: '647861ff3a6dfac87958e1fc',
      cardID: '64777a00add240e7f5e87824',
    })

    // Send a DELETE request to delete the bookmarks
    const response = await request(app)
      .delete(`/api/bookmarks/${bookmarks._id}`)
      .expect(204)

    // Verify that the bookmarks is deleted
    const deletedBookmarks = await Bookmarks.findById(bookmarks._id)
    expect(deletedBookmarks).toBeNull()
  })

  // fail

  // it('should respond fail with 500 when there are no bookmarks ', async () => {
  //   const response = await request(app)
  //     .get('/api/bookmarks')
  //     .expect(500)
  //     .expect('{"error":"No bookmarks have been found "}')
  // })

  it('responds to invalid get request with 400 if id is not found', async () => {
    const response = await request(app).get('/api/bookmarks/:id').expect(400)

    // Verify the error response
  })

  it('responds to invalid patch method request with 400', async () => {
    const response = await request(app).patch(`/api/bookmarks/:id`).expect(400)
  })

  it('responds to invalid delete method request with 400', async () => {
    const response = await request(app).delete(`/api/bookmarks/:id`).expect(400)
  })
})
