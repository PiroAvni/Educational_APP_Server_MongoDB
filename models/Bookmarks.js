<<<<<<< HEAD
const bookmarksSchema = mongoose.Schema(
  {
    userID: {
      // Change field name to ‘userID’
=======
const mongoose = require('mongoose')

const bookmarksSchema = mongoose.Schema(
  {
    userID: {
      // Change field name to 'userId'
>>>>>>> 708f1f1f913f45858510a6460f8ba01811c930ae
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
<<<<<<< HEAD


=======
>>>>>>> 708f1f1f913f45858510a6460f8ba01811c930ae


