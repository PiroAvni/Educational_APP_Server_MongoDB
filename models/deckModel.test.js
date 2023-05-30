const mongoose = require('mongoose');
const Deck = require('../models/decks');

describe('Deck Model', () => {
  beforeAll(async () => {
    // Connect to a test database before running the tests
    await mongoose.connect('mongodb://localhost:27017/test', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    // Disconnect from the test database after running the tests
    await mongoose.disconnect();
  });

  beforeEach(async () => {
    // Clear the decks collection before each test
    await Deck.deleteMany({});
  });

  it('should create a new deck', async () => {
    const deckData = {
      userId: mongoose.Types.ObjectId(),
      categoryId: mongoose.Types.ObjectId(),
      title: 'My Deck',
      description: 'Deck description',
    };

    const deck = await Deck.create(deckData);

    expect(deck).toHaveProperty('_id');
    expect(deck.title).toBe(deckData.title);
    expect(deck.description).toBe(deckData.description);
  });

  it('should retrieve a deck by ID', async () => {
    const deckData = {
      userId: mongoose.Types.ObjectId(),
      categoryId: mongoose.Types.ObjectId(),
      title: 'My Deck',
      description: 'Deck description',
    };

    const createdDeck = await Deck.create(deckData);
    const retrievedDeck = await Deck.findById(createdDeck._id);

    expect(retrievedDeck).toHaveProperty('_id', createdDeck._id);
    expect(retrievedDeck.title).toBe(createdDeck.title);
    expect(retrievedDeck.description).toBe(createdDeck.description);
  });
});