const bookmarksSchema = mongoose.Schema(
  {
    userID: {
      // Change field name to ‘userID’
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




