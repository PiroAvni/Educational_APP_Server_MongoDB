const Deck = require('../models/deckModel')
const controller = require('../controllers/decks')

// Mocking the response object
const res = {
  status: jest.fn(() => res),
  json: jest.fn(),
}

describe('Deck Controller', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return all decks', async () => {
    const mockDecks = [
      { id: 1, name: 'Deck 1' },
      { id: 2, name: 'Deck 2' },
    ]
    Deck.getAll = jest.fn(() => Promise.resolve(mockDecks))

    await controller.index({}, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith(mockDecks)
  })
})

it('should return a specific deck', async () => {
  const mockDeck = { id: 1, name: 'Deck 1' }
  Deck.getById = jest.fn((id) => Promise.resolve(mockDeck))

  await controller.show({ params: { id: 1 } }, res)

  expect(res.status).toHaveBeenCalledWith(200)
  expect(res.json).toHaveBeenCalledWith(mockDeck)
})
