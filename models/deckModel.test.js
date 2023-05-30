const mongoose = require('mongoose');
const Deck = require('../models/deckModel');


describe('Deck Model', () => {

  beforeAll(async() => {
    await mongoose.connect('mongodb://localhost:27017/testdb', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
  });

  beforeEach(async() => {
    await Deck.deleteMany({});
  });

  afterEach(() => {
    // Clean up any resources after each test if necessary
  });

  afterAll(async() => {
    await mongoose.connection.close();
  });

  it('should create a new deck', async () => {
    // Mock the database query method if needed

    const newDeck = await Deck.create(deck);
    expect(newDeck).toBeDefined();
    expect(newDeck.id).toBe(1);
  });

  it('should update an existing deck', async () => {
    // Mock the database query method if needed
    // For example:
    // db.query.mockResolvedValueOnce({ deck_id: 1, ... });

    const updatedDeck = await deck.update(1, deck);
    expect(updatedDeck).toBeDefined();
    // Add assertions to test the updated deck object
  });

  it('should delete a deck', async () => {

    const deletedDeck = await deck.destroy(1);
    expect(deletedDeck).toBeDefined();
  });

  it('should get all decks', async () => {


    const decks = await Deck.getAll();
    expect(decks).toBeDefined();
    expect(decks.length).toBeGreaterThan(0);
    // Add assertions to test the returned array of decks
  });

  
});