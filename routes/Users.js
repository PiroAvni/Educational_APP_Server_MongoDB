const express = require('express')
const {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
<<<<<<< HEAD:routes/Users.js
} = require ('../controllers/Users.js') ;
const { protect } = require ('../middleware/authMiddleware.js') ;
=======
} = require('../controllers/userControllers.js')
const { protect } = require('../middleware/authMiddleware.js')
>>>>>>> staging:routes/userRoutes.js

const router = express.Router()

router.post('/', registerUser)
router.post('/auth', authUser)
router.post('/logout', logoutUser)
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)

module.exports = router
