const mongoose = require('mongoose')

const bookmarksSchema = mongoose.Schema(
  {
    userID: {
      // Change field name to 'userId'
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    cardID: {
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
