const User = require('../models/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const sendMail = require('./sent.controller')

const { CLIENT_URL } = process.env

const controllerUser = {

  login: async (req, res) => {
    try {
      
      const { email, password } = req.body
      const user = await User.findOne({ email })
      
      const isMatch =
        /* user === null ? false : password === user.passwordHash */
        user === null ? false : await bcrypt.compare(password, user.passwordHash)
        /* user === null ? false : true */
      if (!isMatch) {
        return res.status(401).json({
          error: 'Invalid password or user'
        })
      }

      const refresh_token = createRefreshToken({ id: user._id })

      res.send({
        email: user.email,
        id: user._id,
        refresh_token,
        msg: "Login success!"

      })

    } catch (err) {
      return res.status(500).json({ msg: err.message })
      
    }
  },
  getAccessToken: (req, res) => {
    try {
      console.log(req.body.refreshtoken)
      const rf_token = req.body.refreshtoken
      if (!rf_token) return res.status(400).json({ msg: "Please login now!" })

      jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(400).json({ msg: "Please login now!" })

        const access_token = createAccessToken({ id: user.id })
        res.json({ access_token })
      })

    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
  forgotPassword: async (req, res) => {
    try {
      const { email } = req.body
      const user = await User.findOne({ email })
      if (!user) return res.status(400).json({ msg: "This email does not exist." })

      const access_token = createAccessToken({ id: user._id })
      const url = `${CLIENT_URL}/user/reset/${access_token}`

      sendMail(email, url, "Reset your password")
      res.json({ msg: "Re-send the password, please check your email." })
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
  resetPassword: async (req, res) => {
    try {
      const { password } = req.body
      const passwordHash = await bcrypt.hash(password, 12)

      await User.findOneAndUpdate({ _id: req.user.id }, {
        passwordHash: passwordHash
      })

      res.json({ msg: "Password successfully changed!" })
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
  getUserInfor: async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select('-password')

      res.json(user)
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
  getUsersAllInfor: async (req, res) => {
    try {
      const users = await User.find().select('-password')

      res.json(users)
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },

  updateUsersRole: async (req, res) => {
    try {
      const { role } = req.body

      await User.findOneAndUpdate({ _id: req.params.id }, {
        role
      })

      res.json({ msg: "Update Success!" })
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
  logout: async (req, res) => {
    try {
      res.clearCookie('refreshtoken', { path: 'api/refresh_token' })
      return res.json({ msg: "Logget out" })
    } catch (error) {
      return res.status(500).json({ msg: error.message })

    }
  }

}

const validateEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(email)
}

const createActivationToken = (payload) => {
  return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, { expiresIn: '5m' })
}

const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' })
}

const createRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' })
}

module.exports = controllerUser