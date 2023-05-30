const db = require("../config/db-setup.js")

class Deck {
  constructor (deck_id, title, description, visibility, date) {
    this.id = deck_id;
    this.title = title;
    this.description = description;
    this.visibility = visibility;
    this.date = date;  
  }

     static async getAll() {
        try {
            const decks = await db.query("SELECT * FROM decks");
            return decks;
        } catch (err) {
            return err.message;
        }
    }

    static async getOne(id) {
        try {
            const deck = await db.query("SELECT * FROM decks WHERE deck_id = $1", [id]);
            return deck;
        } catch (err) {
            return err.message;
        }
    }

    static async create(deck) {
        try {
            const newDeck = await db.query("INSERT INTO decks (title, description, visibility, date) VALUES ($1, $2, $3, $4) RETURNING *", [workshop.title, workshop.description, workshop.visibility, workshop.date]);
            return newDeck;
        } catch (err) {
            return err.message;
        }
    }

    async update(id, deck) {
        try {
            const updatedDeck = await db.query("UPDATE decks SET title = $1, description = $2, visibility = $3, date = $4 WHERE Deck_id = $5 RETURNING *", [deck.title, deck.description, deck.visibility, deck.date, id]);
            return updatedDeck;
        } catch (err) {
            return err.message;
        }
    }

    async destroy(id) {
        try {
            const deletedDeck = await db.query("DELETE FROM decks WHERE deck_id = $1", [id]);
            return deletedDeck;
        } catch (err) {
            return err.message;
        }
    }
}

module.exports = Deck;