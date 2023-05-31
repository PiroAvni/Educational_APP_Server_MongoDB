const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const User = require('../models/userModels')

describe('User Model', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/testdb', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
  })

  afterAll(async () => {
    await mongoose.connection.close()
  })

  beforeEach(async () => {
    // Remove all users from the test database
    await User.deleteMany({})
  })

  describe('userSchema', () => {
    it('should require name, email, and password fields', async () => {
      const user = new User()

      let validationError

      try {
        await user.validate()
      } catch (error) {
        validationError = error
      }

      expect(validationError.errors.name).toBeDefined()
      expect(validationError.errors.email).toBeDefined()
      expect(validationError.errors.password).toBeDefined()
    })

    it('should require email field to be unique', async () => {
      const existingUser = new User({
        name: 'Existing User',
        email: 'existing@example.com',
        password: 'password',
      })

      await existingUser.save()

      const user = new User({
        name: 'New User',
        email: 'existing@example.com', // Same email as existingUser
        password: 'password',
      })

      let validationError

      try {
        await user.validate()
      } catch (error) {
        validationError = error
      }

      expect(validationError.errors.email).toBeDefined()
    })
  })

  describe('User model methods', () => {
    it('should correctly compare passwords using matchPassword method', async () => {
      const password = 'password'
      const hashedPassword = await bcrypt.hash(password, 10)

      const user = new User({
        name: 'Test User',
        email: 'test@example.com',
        password: hashedPassword,
      })

      expect(await user.matchPassword('password')).toBe(true)
      expect(await user.matchPassword('wrongpassword')).toBe(false)
    })

    it('should hash password before saving using pre-save hook', async () => {
      const password = 'password'

      const user = new User({
        name: 'Test User',
        email: 'test@example.com',
        password: password,
      })

      await user.save()

      const savedUser = await User.findOne({ email: 'test@example.com' })

      expect(savedUser.password).not.toBe(password)
      expect(await bcrypt.compare(password, savedUser.password)).toBe(true)
    })
  })
})
