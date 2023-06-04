const mongoose = require('mongoose')
const slugify = require('slugify');

const categorySchema = mongoose.Schema({
  // _id: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   required: true,
  // },
  name: {
    type: String,
    required: true,
  },
})

// categorySchema.pre('validate', function (next) {
//   if (this.isNew || this.isModified('name')) {
//     this._id = slugify(this.name, { lower: true });
//   }
//   next();
// });

const Category = mongoose.model('Category', categorySchema)

module.exports = Category
