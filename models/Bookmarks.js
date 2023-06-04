const mongoose = require('mongoose')

const bookmarksSchema = mongoose.Schema(
  {
    userId: {
      // Change field name to 'userId'
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    cardId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Cards',
    },
  },
  {
    timestamps: true,
  }
)

const Bookmarks = mongoose.model('Bookmarks', bookmarksSchema)
module.exports = Bookmarks
