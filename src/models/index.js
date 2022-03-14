//All the information of profile its going to be added in users
const rsprofiles = require("./profile.model") 
const users = require("./user.model")
const posts = require("./post.model")
const comment = require('./comment.model')
module.exports = { rsprofiles, users, posts, comment };
