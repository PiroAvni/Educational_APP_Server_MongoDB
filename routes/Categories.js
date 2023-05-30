const express = require ('express') ;
const router = express.Router();
const {  getCategories,
    getCategoriesById,
    createCategory,
    updateCategory,
    deleteCategory,} = require ('../controllers/Caterogries')

    // GET /categories
     router.get('/', getCategories);

     // GET /categories/:id
     router.get('/:id', getCategoriesById);

     // POST /categories
     router.post('/', createCategory);

     // PATCH /categories/:id
     router.patch('/:id', updateCategory);

     //DELETE /categories/:id
     router.delete('/:id', deleteCategory);
     
     module.exports = router